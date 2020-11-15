mod utils;

use nalgebra::*;
use rand::seq::SliceRandom;
use rand_distr::StandardNormal;
use serde::{Deserialize, Serialize};
use utils::set_panic_hook;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct Network {
    weights: Vec<DMatrix<f64>>,
    biases: Vec<DMatrix<f64>>,
    sizes: Vec<usize>,
}

#[wasm_bindgen]
impl Network {
    pub fn train(
        &mut self,
        data_js: JsValue,
        iterations: usize,
        batch_size: usize,
        learn_rate: f64,
        test_data_js: JsValue,
    ) -> Result<(), JsValue> {
        // Convert from JS array to vec of Matrices
        let data_vec: Vec<(Vec<f64>, Vec<f64>)> = data_js.into_serde().unwrap();
        let mut data: Vec<(DMatrix<f64>, DMatrix<f64>)> = data_vec
            .iter()
            .map(|(input, answer)| {
                (
                    DMatrix::from_vec(input.len(), 1, input.clone()),
                    DMatrix::from_vec(answer.len(), 1, answer.clone()),
                )
            })
            .collect();
        let mut test_data: Option<Vec<(DMatrix<f64>, DMatrix<f64>)>> = None;
        if let Some(test_data_vec) = test_data_js
            .into_serde::<Option<Vec<(Vec<f64>, Vec<f64>)>>>()
            .unwrap()
        {
            // let test_data_vec: Vec<(Vec<f64>, Vec<f64>)> = data_js.into_serde().unwrap();
            test_data = Some(
                test_data_vec
                    .iter()
                    .map(|(input, answer)| {
                        (
                            DMatrix::from_vec(input.len(), 1, input.clone()),
                            DMatrix::from_vec(answer.len(), 1, answer.clone()),
                        )
                    })
                    .collect(),
            );
        }

        // Ensure matching input dimensions
        for data in data.iter() {
            if data.0.len() != self.sizes[0] {
                return Err(JsValue::from_str(
                    "Input data must have same length as first layer of network",
                ));
            }
        }

        // Run training multiple times
        for i in 1..=iterations {
            web_sys::console::log_1(&format!("Iteration {}", i).into());
            // Shuffle inputs/answers each time
            data.shuffle(&mut rand::thread_rng());

            for k in (0..data.len()).step_by(batch_size) {
                // These start at 0, and match the shape of biases/weights
                // Used to accumulate changes, then are applied all at once
                let mut bias_errors: Vec<DMatrix<f64>> = self
                    .biases
                    .iter()
                    .map(|b| DMatrix::zeros(b.shape().0, b.shape().1))
                    .collect();
                let mut weight_errors: Vec<DMatrix<f64>> = self
                    .weights
                    .iter()
                    .map(|w| DMatrix::zeros(w.shape().0, w.shape().1))
                    .collect();

                // Make sure the last batch only goes to end of input
                let mut end_index = k + batch_size;
                if end_index > data.len() {
                    end_index = data.len();
                }

                // Train for each input
                for (input, answer) in data[k..end_index].to_vec().iter() {
                    // Get bias/weight errors for individual training example
                    let (delta_bias_errors, delta_weight_errors) = self.backprop(input, answer);

                    // Add error to error pool
                    bias_errors = bias_errors
                        .iter()
                        .zip(&delta_bias_errors)
                        .map(|(b, d)| b + d)
                        .collect();
                    weight_errors = weight_errors
                        .iter()
                        .zip(&delta_weight_errors)
                        .map(|(w, d)| w + d)
                        .collect();
                }

                // Apply adjustments by subtracting error of weight/bias * learn_rate from current weight/bias
                self.weights = self
                    .weights
                    .iter()
                    .zip(&weight_errors)
                    .map(|(w, we)| w - &(learn_rate * we))
                    .collect();
                self.biases = self
                    .biases
                    .iter()
                    .zip(&bias_errors)
                    .map(|(b, be)| b - &(learn_rate * be))
                    .collect();
            }

            // Evaluate model at each iteration if test data is provided
            if let Some(ref test_data) = test_data {
                let mut correct = 0;
                for (input, answer) in test_data.iter() {
                    let prediction = self.feedforward(input);
                    let answer_vec: Vec<f64> = answer.iter().map(|a| *a).collect();
                    let mut ans = 0;
                    for (i, pred) in prediction.iter().enumerate() {
                        if pred > &prediction[(ans, 0)] {
                            ans = i
                        }
                    }
                    if ans == answer_vec.iter().position(|n| n == &1.0).unwrap() {
                        correct += 1
                    }
                }
                web_sys::console::log_1(
                    &format!("Iteration {} scored {} / {}", i, correct, test_data.len()).into(),
                );
            }
        }
        Ok(())
    }

    fn backprop(
        &mut self,
        input: &DMatrix<f64>,
        answer: &DMatrix<f64>,
    ) -> (Vec<DMatrix<f64>>, Vec<DMatrix<f64>>) {
        // These match the shape of biases/weights
        // Used to store errors
        let mut bias_errors: Vec<DMatrix<f64>> = self
            .biases
            .iter()
            .map(|b| DMatrix::zeros(b.shape().0, b.shape().1))
            .collect();
        let mut weight_errors: Vec<DMatrix<f64>> = self
            .weights
            .iter()
            .map(|w| DMatrix::zeros(w.shape().0, w.shape().1))
            .collect();

        // Propagate through the network
        // Save the activations and zs of each layer
        // zs are the activations before going through the sigmoid function
        let mut activation = input.clone();
        let mut activations = vec![activation.clone()];
        let mut zs: Vec<DMatrix<f64>> = vec![];
        for (b, w) in self.biases.iter().zip(&self.weights) {
            let z = w * activation + b;
            activation = z.map(|a| sigmoid(a));
            zs.push(z);
            activations.push(activation.clone());
        }

        // Calculate the error of the output layer by subtracting the correct answer for the activation and then multiplying by sigmoid_prime
        let mut delta =
            (activation - answer).component_mul(&zs.last().unwrap().map(|z| sigmoid_prime(z)));

        // Bias error is just the error of the neuron in the layer
        *bias_errors.last_mut().unwrap() = delta.clone();

        // Weight error is neuron error * activation of the connected neuron in the layer before
        *weight_errors.last_mut().unwrap() =
            &delta * activations[activations.len() - 2].transpose();

        // Work backwards through 2nd-last layer, ignoring first (input) layer
        for layer in (0..(self.sizes.len() - 2)).rev() {
            // Each neuron's delta is the sum of the next layer's activations multiplied be the weight connecting the neurons
            // and by sigmoid_prime to account for sigmoid activation
            delta = (self.weights[layer + 1].transpose() * &delta)
                .component_mul(&zs[layer].map(|z| sigmoid_prime(z)));

            bias_errors[layer] = delta.clone();
            // weights[layer] connects activations[layer] to activations[layer+1]
            // so activations[layer] is really the previous layer's activations
            // This is because input layer doesn't have weights, and its length is 1 more than weights/biases
            weight_errors[layer] = &delta * &activations[layer].transpose();
        }
        (bias_errors, weight_errors)
    }

    fn feedforward(&mut self, input: &DMatrix<f64>) -> DMatrix<f64> {
        let mut activation = input.clone();
        // New activation = weights (dot) old activation + bias
        // Then run sigmoid on each activation
        for (b, w) in self.biases.iter().zip(&self.weights) {
            activation = (w * activation + b).map(|a| sigmoid(a));
        }
        activation
    }

    pub fn predict(&mut self, inputs_js: JsValue) -> Result<JsValue, JsValue> {
        // Convert from JS value to Rust vec
        let inputs: Vec<Vec<f64>> = inputs_js.into_serde().unwrap();
        let mut predictions: Vec<Vec<f64>> = vec![];

        // Predict for each input
        for input in inputs {
            if input.len() != self.sizes[0] {
                return Err(JsValue::from_str(
                    "Input data must have same length as first layer of network",
                ));
            }
            let output = self.feedforward(&DMatrix::from_vec(input.len(), 1, input));
            predictions.push(output.iter().map(|a| *a).collect());
        }
        Ok(JsValue::from_serde(&predictions).unwrap())
    }

    pub fn new(sizes: Vec<usize>) -> Network {
        set_panic_hook();
        let mut rng = rand::thread_rng();
        // Biases is a vec of Nx1 matrices, where N is the size of the layer
        let mut biases = vec![];
        // Weights is a vec of NxM matrices, where N is the size of the layer and M is the size of the previous layer
        // Bias N connects layer N - 1 to layer N
        let mut weights = vec![];
        // Since the input layer doesn't have weights or biases, these vecs are shorter than the number of layers in the network
        // and the index of each layer's weight/biases is actually 1 less than the layer index, because these vecs don't contain anything for the first layer

        // Fill biases and weights with the properly shaped vecs of random numbers
        for (prev_i, size) in sizes[1..].iter().enumerate() {
            biases.push(DMatrix::<f64>::from_distribution(
                *size,
                1,
                &StandardNormal,
                &mut rng,
            ));
            weights.push(DMatrix::<f64>::from_distribution(
                *size,
                sizes[prev_i],
                &StandardNormal,
                &mut rng,
            ));
        }

        Network {
            weights,
            biases,
            sizes,
        }
    }

    pub fn export_model(&mut self) -> JsValue {
        // Export weights and biases as a JSON object
        JsValue::from_serde(self).unwrap()
    }

    pub fn from_model(model: String) -> Network {
        // Import weights and biases from a JSON object
        serde_json::from_str(&model).unwrap()
    }
}

fn sigmoid(n: f64) -> f64 {
    let e = std::f64::consts::E;
    let ex = e.powf(n);
    ex / (ex + 1.0)
}

fn sigmoid_prime(n: f64) -> f64 {
    sigmoid(n) * (1.0 - sigmoid(n))
}

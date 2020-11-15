import wasm from 'rust-neural-network'
const { Network } = wasm
import fs from 'fs'

console.log('Reading Data')
const train = fs
  .readFileSync('./mnist_train.csv', 'utf-8')
  .split('\n')
  .slice(1)
  .map((line) => {
    let [label, ...input] = line.split(',').map((n) => parseInt(n))
    const output = new Array(10).fill(0)
    output[label] = 1
    input = input.map((v) => v / 255)
    return [input, output]
  })
const test = fs
  .readFileSync('./mnist_test.csv', 'utf-8')
  .split('\n')
  .slice(1)
  .map((line) => {
    let [label, ...input] = line.split(',').map((n) => parseInt(n))
    const output = new Array(10).fill(0)
    output[label] = 1
    input = input.map((v) => v / 255)
    return [input, output]
  })

const network = Network.new([784, 100, 50, 10])
console.log('Training Network')
network.train(train, 20, 10, 0.3, test)

console.log('Making Predictions')
const predictions = network.predict(test.map(([input]) => input))
let correct = 0
let incorrect = 0
predictions.forEach((prediction, i) => {
  let ans = 0
  prediction.forEach((p, i) => {
    if (p > prediction[ans]) {
      ans = i
    }
  })

  if (ans === test[i][1].indexOf(1)) {
    correct++
  } else {
    incorrect++
  }
})

console.log('Correct:', correct)
console.log('Incorrect:', incorrect)

console.log('Saving to model.json')
const model = network.export_model()
fs.writeFileSync('model.json', JSON.stringify(model))

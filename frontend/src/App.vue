<template>
  <div>
    Draw below: <br />
    <canvas v-canvas ref="canvas" style="border: 2px solid black"></canvas
    ><br />
    <button @click="loadModel" style="margin-right: 5px">Load Model</button>
    <button
      :disabled="!modelLoaded"
      @click="makePrediction"
      style="margin-right: 5px"
    >
      Guess
    </button>
    <button @click="clear">Clear</button>
    Guess is {{ guess }}, confidence is {{ confidence }}
    <br />
    <br />
    <br />
    <a href="https://github.com/nklayman/digit-recognition">Source on GitHub</a>
  </div>
</template>

<script lang="ts">
import { Network } from 'rust-neural-network'
import { defineComponent, onMounted, ref } from 'vue'
import canvas from './canvas.directive'

export default defineComponent({
  name: 'App',
  directives: {
    canvas
  },
  setup () {
    const canvas = ref<HTMLCanvasElement>()
    // Used to scale down input
    const canvas2 = document.createElement('canvas')
    const ctx2 = canvas2.getContext('2d')

    /**
     * Scales down image drawn on canvas, returns the red pixel values
     * This will be a 784 long array of floats between 0-1
     */
    const getData = () => {
      ctx2?.clearRect(0, 0, canvas2.width, canvas2.height)
      ctx2?.drawImage(canvas.value as HTMLCanvasElement, 0, 0, 28, 28)
      const redValues: number[] = []
      ctx2?.getImageData(0, 0, 28, 28).data.forEach((val, i) => {
        if (i % 4 === 3) {
          redValues.push(val / 255)
        }
      })
      return redValues
    }

    const modelLoaded = ref(false)
    let net: Network
    /**
     * Loads the wasm code and the weights/biases
     * The weights/biases are prelearned and loaded from the model.json in the public folder
     */
    const loadModel = async () => {
      const { Network } = await import('rust-neural-network')
      const model = await (await fetch('./model.json')).text()
      net = Network.from_model(model)
      modelLoaded.value = true
    }

    const guess = ref()
    const confidence = ref()
    /**
     * Makes a prediction of what the user drew
     */
    const makePrediction = () => {
      const input = getData()
      const predictions = net.predict([input])[0]
      let ans = 0
      predictions.forEach((p: number, i: number) => {
        if (p >= predictions[ans]) {
          ans = i
          confidence.value = p
        }
      })
      guess.value = ans
    }

    /**
     * Clears the canvas and guess/confidence
     */
    const clear = () => {
      canvas.value
        ?.getContext('2d')
        ?.clearRect(0, 0, canvas.value.width, canvas.value.height)
      guess.value = undefined
      confidence.value = undefined
    }

    return {
      makePrediction,
      clear,
      canvas,
      loadModel,
      modelLoaded,
      guess,
      confidence
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

// From https://pusher.com/tutorials/collaborative-painting-vuejs
// with the networking removed and touch support added

const mounted = (el: HTMLCanvasElement) => {
  const canvas = el
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('no canvas ctx')
  }

  // This will be scaled down when data is extracted
  canvas.width = 280
  canvas.height = 280

  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.lineWidth = 15

  let prevPos = { offsetX: 0, offsetY: 0 }
  let line: any = []
  let isPainting = false
  const USER_STROKE = 'red'

  const paint = (
    prevPosition: any,
    currPosition: any,
    strokeStyle: CanvasFillStrokeStyles['strokeStyle']
  ) => {
    if (ctx) {
      const { offsetX, offsetY } = currPosition
      const { offsetX: x, offsetY: y } = prevPosition
      ctx.beginPath()
      ctx.strokeStyle = strokeStyle
      ctx.moveTo(x, y)
      ctx.lineTo(offsetX, offsetY)
      ctx.stroke()
      prevPos = { offsetX, offsetY }
    }
  }
  const handleMouseDown = (e: MouseEvent) => {
    const { offsetX, offsetY } = e
    isPainting = true
    prevPos = { offsetX, offsetY }
  }
  const endPaintEvent = () => {
    if (isPainting) {
      isPainting = false
    }
  }
  const handleMouseMove = (e: MouseEvent) => {
    if (isPainting) {
      const { offsetX, offsetY } = e
      const offSetData = { offsetX, offsetY }
      const positionInfo = {
        start: { ...prevPos },
        stop: { ...offSetData }
      }
      line = line.concat(positionInfo)
      paint(prevPos, offSetData, USER_STROKE)
    }
  }
  canvas.addEventListener('mousedown', handleMouseDown)
  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mouseup', endPaintEvent)
  canvas.addEventListener('mouseleave', endPaintEvent)
  canvas.addEventListener('touchstart', e => {
    e.preventDefault()
    const touch = e.touches[0]
    const clientX = touch.clientX + canvas.offsetLeft * 2
    const clientY = touch.clientY + canvas.offsetTop * 2
    const mouseEvent = new MouseEvent('mousedown', {
      clientX,
      clientY
    })
    canvas.dispatchEvent(mouseEvent)
  })
  canvas.addEventListener(
    'touchmove',
    e => {
      const touch = e.touches[0]
      const clientX = touch.clientX + canvas.offsetLeft * 2
      const clientY = touch.clientY + canvas.offsetTop * 2
      const mouseEvent = new MouseEvent('mousemove', {
        clientX,
        clientY
      })
      canvas.dispatchEvent(mouseEvent)
    },
    false
  )
  canvas.addEventListener('touchend', endPaintEvent)
  canvas.addEventListener('touchcancel', endPaintEvent)
}

export default {
  mounted
}

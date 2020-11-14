/**
 * Get bounding box of content in canvas
 */
const getBoundingBox = (canvas: HTMLCanvasElement) => {
  const h = canvas.height
  const w = canvas.width
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Could not get canvas ctx')
  }
  const idata = ctx.getImageData(0, 0, w, h) // get image data for canvas
  const buffer = idata.data // get buffer (unnes. step)
  const buffer32 = new Uint32Array(buffer.buffer) // get a 32-bit representation
  let x
  let y // iterators
  let x1 = w
  let y1 = h
  let x2 = 0
  let y2 = 0
  // get left edge
  for (y = 0; y < h; y++) {
    // line by line
    for (x = 0; x < w; x++) {
      // 0 to width
      if (buffer32[x + y * w] > 0) {
        // non-transparent pixel?
        if (x < x1) x1 = x // if less than current min update
      }
    }
  }
  // get right edge
  for (y = 0; y < h; y++) {
    // line by line
    for (x = w; x >= 0; x--) {
      // from width to 0
      if (buffer32[x + y * w] > 0) {
        if (x > x2) x2 = x
      }
    }
  }
  // get top edge
  for (x = 0; x < w; x++) {
    for (y = 0; y < h; y++) {
      if (buffer32[x + y * w] > 0) {
        if (y < y1) y1 = y
      }
    }
  }

  // get bottom edge
  for (x = 0; x < w; x++) {
    for (y = h; y >= 0; y--) {
      if (buffer32[x + y * w] > 0) {
        if (y > y2) y2 = y
      }
    }
  }

  return {
    left: x1 - 50,
    top: y1 - 50,
    width: x2 - x1 + 100,
    height: y2 - y1 + 100
  }
}

export default getBoundingBox

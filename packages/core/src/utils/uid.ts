const size = 256
let index = size
let buffer: string

export function uid(length = 11) {
  if (!buffer || index + length > size * 2) {
    buffer = ''
    index = 0
    for (let i = 0; i < size; i++) {
      buffer += ((256 + Math.random() * 256) | 0).toString(16).substring(1)
    }
  }
  return buffer.substring(index, index++ + length)
}

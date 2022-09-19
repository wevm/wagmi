export function debounce(fn: (...args: any) => void, waitTime = 0) {
  let timeout: NodeJS.Timeout | null
  return function (...args: any) {
    if (!waitTime) return fn(...args)

    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(function () {
      timeout = null
      fn(...args)
    }, waitTime)
  }
}

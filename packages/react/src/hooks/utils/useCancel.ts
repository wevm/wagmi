import * as React from 'react'

type Callback = () => void

export const useCancel = () => {
  const cancelCallback = React.useRef<Callback | null>(null)

  React.useEffect(() => {
    return () => cancelCallback.current?.()
  }, [])

  const cancel = React.useCallback((callback?: Callback) => {
    cancelCallback.current?.()
    if (callback) cancelCallback.current = callback
  }, [])

  return cancel
}

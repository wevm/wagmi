import * as React from 'react'

export function useCancel() {
  const cancelCb = React.useRef<null | (() => void)>(null)

  React.useEffect(() => {
    return () => cancelCb.current?.()
  }, [])

  const cancel = React.useCallback((cb?: () => void) => {
    cancelCb.current?.()
    if (cb) cancelCb.current = cb
  }, [])

  return cancel
}

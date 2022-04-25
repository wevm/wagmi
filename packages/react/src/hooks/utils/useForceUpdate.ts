import * as React from 'react'

export function useForceUpdate() {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0)
  return forceUpdate
}

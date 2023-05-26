import { getConnections, watchConnections } from '@wagmi/core'
import * as React from 'react'

import { useConfig } from './useConfig.js'

export function useConnections() {
  const config = useConfig()
  return React.useSyncExternalStore(
    (onChange) => watchConnections(config, { onChange }),
    () => getConnections(config),
  )
}

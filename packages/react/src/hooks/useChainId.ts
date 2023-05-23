import { getChainId, watchChainId } from '@wagmi/core'
import * as React from 'react'

import { useConfig } from './useConfig.js'

export function useChainId() {
  const config = useConfig()
  return React.useSyncExternalStore(
    (onChange) => watchChainId(config, { onChange }),
    () => getChainId(config),
  )
}

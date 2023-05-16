import { getChainId, watchChainId } from '@wagmi/core'
import { useSyncExternalStore } from 'react'

import { useConfig } from './useConfig.js'

export function useChainId() {
  const config = useConfig()
  return useSyncExternalStore(
    (onChange) => watchChainId(config, { onChange }),
    () => getChainId(config),
  )
}

import {
  type GetChainIdReturnType,
  getChainId,
  watchChainId,
} from '@wagmi/core'
import * as React from 'react'

import { useConfig } from './useConfig.js'

export type UseChainIdReturnType = GetChainIdReturnType

/** https://wagmi.sh/react/hooks/useChainId */
export function useChainId(): UseChainIdReturnType {
  const config = useConfig()
  return React.useSyncExternalStore(
    (onChange) => watchChainId(config, { onChange }),
    () => getChainId(config),
  )
}

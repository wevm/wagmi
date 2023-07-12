import {
  type GetChainIdReturnType,
  type ResolvedRegister,
  getChainId,
  watchChainId,
} from '@wagmi/core'
import { useSyncExternalStore } from 'react'

import { useConfig } from './useConfig.js'

export type UseChainIdReturnType = GetChainIdReturnType<
  ResolvedRegister['config']
>

/** https://wagmi.sh/react/hooks/useChainId */
export function useChainId(): UseChainIdReturnType {
  const config = useConfig()
  return useSyncExternalStore(
    (onChange) => watchChainId(config, { onChange }),
    () => getChainId(config),
  )
}

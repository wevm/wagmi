import { type ResolvedRegister } from '@wagmi/core'
import { useContext } from 'react'

import { WagmiContext } from '../context.js'
import { WagmiConfigNotFoundError } from '../errors/context.js'

export type UseConfigReturnType = ResolvedRegister['config']

/** https://wagmi.sh/react/hooks/useConfig */
export function useConfig(): UseConfigReturnType {
  const config = useContext(WagmiContext)
  if (!config) throw new WagmiConfigNotFoundError()
  return config
}

import type { Config } from '@wagmi/core'
import * as React from 'react'

import { WagmiContext } from '../context.js'
import { WagmiConfigNotFoundError } from '../errors/context.js'

export type UseConfigReturnType = Config

/** https://wagmi.sh/react/hooks/useConfig */
export function useConfig(): UseConfigReturnType {
  const config = React.useContext(WagmiContext)
  if (!config) throw new WagmiConfigNotFoundError()
  return config
}

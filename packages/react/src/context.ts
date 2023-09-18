'use client'

import { type ResolvedRegister, reconnect } from '@wagmi/core'
import { createContext, createElement, useEffect } from 'react'

export const WagmiContext = createContext<
  ResolvedRegister['config'] | undefined
>(undefined)

export type WagmiProviderProps = {
  config: ResolvedRegister['config']
  reconnectOnMount?: boolean | undefined
}

export function WagmiProvider(
  parameters: React.PropsWithChildren<WagmiProviderProps>,
) {
  const { children, config, reconnectOnMount = true } = parameters

  // biome-ignore lint/nursery/useExhaustiveDependencies: only run on mount
  useEffect(() => {
    if (reconnectOnMount) reconnect(config)
  }, [])

  const props = { value: config }
  return createElement(WagmiContext.Provider, props, children)
}

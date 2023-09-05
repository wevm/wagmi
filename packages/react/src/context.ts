'use client'

import { type ResolvedRegister, reconnect } from '@wagmi/core'
import { type OneOf } from '@wagmi/core/internal'
import { createContext, createElement, useEffect } from 'react'

export const WagmiContext = createContext<
  ResolvedRegister['config'] | undefined
>(undefined)

export type WagmiProviderProps = OneOf<
  { config: ResolvedRegister['config'] } | { value: ResolvedRegister['config'] }
>

export function WagmiProvider(
  parameters: React.PropsWithChildren<WagmiProviderProps>,
) {
  const { children, value = parameters.config! } = parameters
  // rome-ignore lint/nursery/useExhaustiveDependencies: only run on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && value._internal.reconnectOnMount)
      reconnect(value)
  }, [])

  const props = { value }
  return createElement(WagmiContext.Provider, props, children)
}

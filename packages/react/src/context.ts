import { type ResolvedRegister, reconnect } from '@wagmi/core'
import { type OneOf } from '@wagmi/core/internal'
import { createContext, createElement, useEffect } from 'react'

export const WagmiContext = createContext<
  ResolvedRegister['config'] | undefined
>(undefined)

export type WagmiConfigProps = OneOf<
  | {
      /** @deprecated Use `value` instead */
      config: ResolvedRegister['config']
    }
  | { value: ResolvedRegister['config'] }
>

// TODO: Rename Provider
export function WagmiConfig(
  parameters: React.PropsWithChildren<WagmiConfigProps>,
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

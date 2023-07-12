import { type Config, type ResolvedRegister, reconnect } from '@wagmi/core'
import { type OneOf } from '@wagmi/core/internal'
import { createContext, createElement, useEffect } from 'react'

export const WagmiContext = createContext<
  ResolvedRegister['config'] | undefined
>(undefined)

export type WagmiConfigProps = OneOf<
  | {
      /** @deprecated Use `value` instead */
      config: Config
    }
  | { value: Config }
>

export function WagmiConfig({
  children,
  ...props
}: React.PropsWithChildren<WagmiConfigProps>) {
  const value = props.config ?? props.value
  // rome-ignore lint/nursery/useExhaustiveDependencies: only run on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && value._internal.reconnectOnMount)
      reconnect(value)
  }, [])

  return createElement(WagmiContext.Provider, { value }, children)
}

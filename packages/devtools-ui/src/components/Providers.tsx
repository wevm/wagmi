import { QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'
import type { ParentProps } from 'solid-js'

import { useDevtoolsContext } from '../context.js'

export function Providers(props: Providers.Props) {
  const value = useDevtoolsContext()
  return (
    <WagmiProvider config={value.config}>
      <QueryClientProvider client={value.queryClient}>
        {props.children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export declare namespace Providers {
  export type Props = ParentProps
}

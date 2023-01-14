import { renderHook as defaultRenderHook } from '@solidjs/testing-library'
import { QueryClient } from '@tanstack/solid-query'
import type { Client } from '@wagmi/core'
import type { JSX } from 'solid-js/jsx-runtime'

import { WagmiProvider } from '../src'
import { setupClient } from './'

export const queryClient = new QueryClient()

type Props = { client?: Client } & {
  children?: JSX.Element
}

const wrapper = (props: Props) => {
  return (
    <WagmiProvider client={setupClient({ queryClient }) as any} {...props} />
  )
}

export function renderHook<TResult, TProps>(hook: (props: TProps) => TResult) {
  const utils = defaultRenderHook(hook, {
    wrapper,
  })

  queryClient.clear()

  return { ...utils }
}

export * from './utils'
export {
  getCrowdfundArgs,
  getProvider,
  getSigners,
  getRandomTokenId,
  getWebSocketProvider,
  mirrorCrowdfundContractConfig,
  mlootContractConfig,
  wagmiContractConfig,
  wagmigotchiContractConfig,
} from '../../core/test'

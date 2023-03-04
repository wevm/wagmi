import { renderHook as defaultRenderHook } from '@solidjs/testing-library'
import { QueryClient } from '@tanstack/solid-query'
import type { Client } from '@wagmi/core'
import type { JSX } from 'solid-js/jsx-runtime'

import { WagmiConfig } from '../src'
import { setupClient } from './'

export const queryClient = new QueryClient()

export type Props = { client?: Client } & {
  children?: JSX.Element
}

export function renderHook<TProps extends any[], TResult>(
  hook: (...args: TProps) => TResult,
) {
  const wrapper = (props: Props) => {
    return (
      <WagmiConfig client={setupClient({ queryClient }) as any} {...props} />
    )
  }

  const utils = defaultRenderHook<TProps, TResult>(hook, {
    wrapper,
  })

  queryClient.clear()

  return utils
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

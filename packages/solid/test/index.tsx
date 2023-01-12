import { QueryClient } from '@tanstack/solid-query'
import type { Client } from '@wagmi/core'
import type { Owner } from 'solid-js'
import { createRoot, createSignal, getOwner, runWithOwner } from 'solid-js'
import { renderHook as defaultRenderHook } from 'solid-testing-library'

import { WagmiProvider } from '../src'
import { setupClient } from './'

export const queryClient = new QueryClient()

type Props = { client?: Client } & {
  children?: any
}

export function renderHook(
  hook: (props: any) => any,
  { wrapper: wrapper_, ...options_ }: any = {},
) {
  const [result, setResult] = createSignal<any>()

  const TestComponent = () => {
    setResult(hook(options_))
    return null
  }

  const testHarness = () => {
    const component = (
      <WagmiProvider client={setupClient({ queryClient }) as any}>
        <TestComponent />
      </WagmiProvider>
    )

    return component
  }

  // TODO: make this options work

  // const options: any = {
  //   ...(wrapper_
  //     ? { wrapper: wrapper_ }
  //     : {
  //         wrapper: (props: any) =>
  //           wrapper({ ...props, ...options_?.initialProps }),
  //       }),
  //   ...options_,
  // }
  // const utils = defaultRenderHook(hook, options as any)

  queryClient.clear()

  //const utils = defaultRenderHook(testHarness)
  testHarness()

  return { result }
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

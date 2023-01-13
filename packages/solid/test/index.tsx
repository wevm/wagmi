import { QueryClient } from '@tanstack/solid-query'
import type { Client } from '@wagmi/core'
import { renderHook as defaultRenderHook } from 'solid-testing-library'

import { WagmiProvider } from '../src'
import { setupClient } from './'

export const queryClient = new QueryClient()

type Props = { client?: Client } & {
  children?: any
}

const wrapper = ({
  client = setupClient({ queryClient }),
  ...rest
}: Props = {}) => {
  return <WagmiProvider client={client as any} {...rest} />
}

export function renderHook(
  hook: (props: any) => any,
  { wrapper: wrapper_, ...options_ }: any = {},
) {
  // const options: any = {
  //   ...(wrapper_
  //     ? { wrapper: wrapper_ }
  //     : {
  //         wrapper: (props: any) =>
  //           wrapper({ ...props, ...options_?.initialProps }),
  //       }),
  //   ...options_,
  // }

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

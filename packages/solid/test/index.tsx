import { QueryClient } from '@tanstack/solid-query'
import type { Client } from '@wagmi/core'
import { renderHook as defaultRenderHook, render } from 'solid-testing-library'

import { WagmiProvider } from '../src'
import { setupClient } from './'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevent Jest from garbage collecting cache
      cacheTime: Infinity,
      // Turn off retries to prevent timeouts
      retry: false,
    },
  },
  logger: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error: () => {},
    log: console.log,
    warn: console.warn,
  },
})

type Props = { client?: Client } & {
  children?: any
}

const Wrapper = ({
  client = setupClient({ queryClient }),
  ...rest
}: Props = {}) => {
  console.log('gerou client? ', client.provider)
  return <WagmiProvider client={client as any} />
}

export function renderHook(hook: (props: any) => any) {
  queryClient.clear()

  const options = {
    wrapper: <Wrapper />,
  }

  const utils = defaultRenderHook(hook, options as any)
  console.log('passou do utils')
  return {
    ...utils,
  }
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

import {
  Connector,
  Provider,
  WebSocketProvider,
  defaultChains,
} from '@wagmi/core'
import { MockConnector } from '@wagmi/core/connectors/mock'
// import { expect } from 'vitest'

import { createApp } from 'vue-demi'

import { getProvider, getSigners } from '../../core/test/utils'
import { CreateClientConfig, createClient } from '../src'
import {
  UseAccountConfig,
  useAccount as useAccount_,
} from '../src/hooks/accounts/useAccount'

// import { useNetwork as useNetwork_ } from '../src/hooks/accounts/useNetwork'

type Config = Partial<CreateClientConfig>

// interface TestApp extends App {
//   onUnmount: Function
//   _unmount: Function
//   _mixin: ComponentOptions
//   _provided: Record<string, any>
//   $root: TestApp
// }

export function setupClient(config: Config = {}) {
  const app = createApp({})
  return createClient<Provider, WebSocketProvider>({
    vueApp: app,
    connectors: [
      new MockConnector({
        options: {
          signer: getSigners()[0]!,
        },
      }),
    ],
    provider: ({ chainId }) => getProvider({ chainId, chains: defaultChains }),
    ...config,
  })
}

export async function actConnect(config: {
  chainId?: number
  connector?: Connector
}) {
  const connector = config.connector
  console.log(connector)
}

export async function actDisconnect(config = {}) {
  console.log(config)
}

export async function actSwitchNetwork(config: { chainId: number }) {
  const chainId = config.chainId
  console.log(chainId)
}

/**
 * `renderHook` in `@testing-library/react` doesn't play well
 * with tracked values, so we need to use custom hooks.
 */

export function useAccount(config: UseAccountConfig = {}) {
  const { ...values } = useAccount_(config)
  return values
}

// export function useNetwork() {
//   const { ...values } = useNetwork_()
//   return values
// }

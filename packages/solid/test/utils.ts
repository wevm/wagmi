import { waitFor } from '@solidjs/testing-library'
import { createClient, goerli, mainnet } from '@wagmi/core'
import type { Provider, WebSocketProvider } from '@wagmi/core'

import type { Accessor } from 'solid-js'
import { expect } from 'vitest'

import type { renderHook } from '.'
import { MockConnector } from '../../core/connectors/mock'
import { getProvider, getSigners } from '../../core/test'

import type { CreateClientConfig } from '../src'

type Config = Partial<CreateClientConfig>

export function setupClient(config: Config = {}) {
  return createClient<Provider, WebSocketProvider>({
    connectors: [
      new MockConnector({
        options: {
          signer: getSigners()[0]!,
        },
      }),
    ],
    provider: ({ chainId }) =>
      getProvider({ chainId, chains: [mainnet, goerli] }),
    ...config,
  })
}

export async function switchNetwork(config: {
  chainId: Accessor<number>
  utils: ReturnType<typeof renderHook>
}) {
  const chainId = config.chainId
  const getNetwork = (utils: ReturnType<typeof renderHook>) =>
    (utils.result as any)?.switchNetwork || utils.result
  const utils = config.utils

  await getNetwork(utils).switchNetworkAsync(chainId)

  await waitFor(() => expect(getNetwork(utils).isIdle).toBeTruthy())
}

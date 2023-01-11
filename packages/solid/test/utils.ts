// import type { renderHook } from '@solidjs/testing-library'
import { createClient, goerli, mainnet } from '@wagmi/core'
import type { Provider, WebSocketProvider } from '@wagmi/core'

import { MockConnector } from '@wagmi/core/connectors/mock'
import { getProvider, getSigners } from '@wagmi/core/test/utils'

// import { expect } from 'vitest'

import type { CreateClientConfig } from '../src'
// import { useAccount as useAccount_ } from '../src/hooks/accounts/useAccount'
// import { useNetwork as useNetwork_ } from '../src/hooks/accounts/useNetwork'

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

// export async function actConnect(config: {
//   chainId?: number
//   connector?: Connector
//   utils: ReturnType<typeof renderHook>
// }) {
//   const connector = config.connector
//   const getConnect = (utils: ReturnType<typeof renderHook>) =>
//     (utils.result.current as any)?.connect || utils.result.current
//   const utils = config.utils

//   const connect = getConnect(utils)
//   await connect.connectAsync?.({
//     chainId: config.chainId,
//     connector: connector ?? connect.connectors?.[0],
//   })

//   // according to solid-testing-library docs, we don't need waitFor
//   // const { waitFor } = utils
//   expect(getConnect(utils).isSuccess).toBeTruthy()
// }

// export async function actSwitchNetwork(config: {
//   chainId: number
//   utils: ReturnType<typeof renderHook>
// }) {
//   const chainId = config.chainId
//   const getNetwork = (utils: ReturnType<typeof renderHook>) =>
//     (utils.result.current as any)?.switchNetwork || utils.result.current
//   const utils = config.utils

//   await getNetwork(utils).switchNetwork(chainId)

//   expect(getNetwork(utils).isSuccess).toBeTruthy()
// }

/**
 * `renderHook` in `@testing-library/react` doesn't play well
 * with tracked values, so we need to use custom hooks.
 */
// export function useAccount() {
//   const { ...values } = useAccount_()
//   return values
// }

// export function useNetwork() {
//   const { ...values } = useNetwork_()
//   return values
// }

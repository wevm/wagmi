import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { FixedArray } from '@wagmi/core/internal'
import { Mnemonic } from 'ox'
import * as React from 'react'
import { defineChain, http } from 'viem'
import * as chains from 'viem/chains'
import { Account as tempo_Account } from 'viem/tempo'
import {
  type RenderHookOptions,
  type RenderHookResult,
  renderHook as vbr_renderHook,
} from 'vitest-browser-react'
import { createConfig, WagmiProvider } from 'wagmi'
import { dangerous_secp256k1 } from '../src/Connectors.js'

export const addresses = {
  alphaUsd: '0x20c0000000000000000000000000000000000001',
} as const

export const accounts = Array.from({ length: 20 }, (_, i) => {
  const privateKey = Mnemonic.toPrivateKey(
    'test test test test test test test test test test test junk',
    { as: 'Hex', path: Mnemonic.path({ account: i }) },
  )
  return tempo_Account.fromSecp256k1(privateKey)
}) as unknown as FixedArray<tempo_Account.RootAccount, 20>

const id =
  (typeof process !== 'undefined' &&
    Number(process.env.VITEST_POOL_ID ?? 1) +
      Math.floor(Math.random() * 10_000)) ||
  1 + Math.floor(Math.random() * 10_000)
export const rpcUrl = `http://localhost:${import.meta.env.RPC_PORT ?? '8545'}/${id}`

export const tempoLocal = defineChain({
  ...chains.tempoLocalnet,
  rpcUrls: { default: { http: [rpcUrl] } },
}).extend({ feeToken: 1n })

export const config = createConfig({
  chains: [tempoLocal],
  connectors: [
    dangerous_secp256k1({ account: accounts.at(0) }),
    dangerous_secp256k1({ account: accounts.at(1) }),
  ],
  pollingInterval: 100,
  storage: null,
  transports: {
    [tempoLocal.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const queryClient = new QueryClient()

export function createWrapper<component extends React.FunctionComponent<any>>(
  Wrapper: component,
  props: Parameters<component>[0],
) {
  type Props = { children?: React.ReactNode | undefined }
  return function CreatedWrapper({ children }: Props) {
    return React.createElement(
      Wrapper,
      props,
      React.createElement(
        QueryClientProvider,
        { client: queryClient },
        children,
      ),
    )
  }
}

export function renderHook<result, props>(
  renderCallback: (initialProps?: props) => result,
  options?: RenderHookOptions<props>,
): Promise<RenderHookResult<result, props>> {
  queryClient.clear()
  return vbr_renderHook(renderCallback, {
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: false }),
    ...options,
  })
}

// export async function setupToken() {
//   if (getAccount(config).status === 'disconnected')
//     await connect(config, {
//       connector: config.connectors[0]!,
//     })
//   const client = await getConnectorClient(config)
//   return viem_setupToken(client as never)
// }
//
// export async function setupPoolWithLiquidity() {
//   if (getAccount(config).status === 'disconnected')
//     await connect(config, {
//       connector: config.connectors[0]!,
//     })
//   const client = await getConnectorClient(config)
//   return viem_setupPoolWithLiquidity(client as never)
// }
//
// export async function setupTokenPair() {
//   if (getAccount(config).status === 'disconnected')
//     await connect(config, {
//       connector: config.connectors[0]!,
//     })
//   const client = await getConnectorClient(config)
//   return viem_setupTokenPair(client as never)
// }
//
// export async function setupOrders() {
//   if (getAccount(config).status === 'disconnected')
//     await connect(config, {
//       connector: config.connectors[0]!,
//     })
//   const client = await getConnectorClient(config)
//   return viem_setupOrders(client as never)
// }

// // Export types required for inference.
// export {
//   /** @deprecated */
//   KeyAuthorization as z_KeyAuthorization,
//   /** @deprecated */
//   SignatureEnvelope as z_SignatureEnvelope,
//   /** @deprecated */
//   TokenId as z_TokenId,
//   /** @deprecated */
//   TxEnvelopeTempo as z_TxEnvelopeTempo,
// } from 'ox/tempo'

import { QueryClient } from '@tanstack/react-query'
import {
  type CreateConfigParameters,
  connect,
  createConfig,
  getConnection,
  getConnectorClient,
} from '@wagmi/core'
import { tempoLocalnet } from '@wagmi/core/chains'
import { dangerous_secp256k1 } from '@wagmi/core/tempo'
import { type Address, defineChain, parseUnits, webSocket } from 'viem'
import { Actions, Addresses, Storage } from 'viem/tempo'
import { zone, http as zoneHttp } from 'viem/tempo/zones'
import { inject } from 'vitest'
import { accounts, createRenderHook, privateKeys } from './config.js'

export type TempoZoneContext = {
  chainId: number
  factoryAddress: Address
  l1RpcUrl: string
  portalAddress: Address
  privateRpcUrl: string
  publicRpcUrl: string
  zoneId: number
}

declare module 'vitest' {
  export interface ProvidedContext {
    tempoZone: TempoZoneContext
  }
}

export const context = inject('tempoZone')
export const portalAddress = context.portalAddress
export const zoneId = context.zoneId
export const zoneStorage = Storage.memory()

export const parentChain = defineChain({
  ...tempoLocalnet,
  contracts: {
    ...tempoLocalnet.contracts,
    zonePortal: {
      [zoneId]: { address: portalAddress },
    },
  },
  rpcUrls: { default: { http: [], webSocket: [context.l1RpcUrl] } },
}).extend({ feeToken: 1n })

export const zoneChain = defineChain({
  ...zone(zoneId),
  id: context.chainId,
  rpcUrls: { default: { http: [context.privateRpcUrl] } },
  sourceId: parentChain.id,
})

export const config = createConfig({
  chains: [parentChain, zoneChain],
  connectors: [
    dangerous_secp256k1({
      privateKey: privateKeys[0],
    }),
  ],
  pollingInterval: 100,
  storage: null,
  transports: {
    [parentChain.id]: webSocket(context.l1RpcUrl),
    [zoneChain.id]: zoneHttp(context.privateRpcUrl, { storage: zoneStorage }),
  },
} as const satisfies CreateConfigParameters)

export const queryClient = new QueryClient()

export async function authorize() {
  if (getConnection(config).status === 'disconnected')
    await connect(config, { connector: config.connectors[0]! })
  const client = await getConnectorClient(config, {
    assertChainId: false,
    chainId: zoneChain.id,
  })
  return Actions.zone.signAuthorizationToken(client, {
    account: accounts[0],
    storage: zoneStorage,
    zoneId,
  })
}

export async function depositAndWait(amount: bigint) {
  await authorize()
  const client = await getConnectorClient(config, { chainId: parentChain.id })
  const { receipt } = await Actions.zone.depositSync(client, {
    amount,
    portalAddress,
    token: Addresses.pathUsd,
    zoneId,
  })
  const zoneClient = config.getClient({ chainId: zoneChain.id })
  const info = await Actions.zone.waitForTempoBlock(zoneClient, {
    pollingInterval: 100,
    tempoBlockNumber: receipt.blockNumber,
    timeout: 30_000,
  })
  return { info, receipt }
}

export async function setupZoneBalance(amount: bigint) {
  await authorize()
  const client = config.getClient({ chainId: zoneChain.id })
  const info = await Actions.zone.getZoneInfo(client)
  const token = info.zoneTokens[0]!
  const balance = await Actions.token.getBalance(client, {
    account: accounts[0].address,
    token,
  })
  const minimumBalance = amount + parseUnits('1', 6)
  if (balance.amount < minimumBalance)
    await depositAndWait(minimumBalance - balance.amount)
  return token
}

export const renderHook = createRenderHook(config, queryClient)

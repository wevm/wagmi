import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  connect,
  createConnector,
  getConnection,
  getConnectorClient,
} from '@wagmi/core'
import * as chains from '@wagmi/core/chains'
import type { FixedArray } from '@wagmi/core/internal'
import { dangerous_secp256k1 } from '@wagmi/core/tempo'
import { Mnemonic } from 'ox'
import * as React from 'react'
import {
  type Account,
  type Address,
  type Chain,
  type Client,
  defineChain,
  type Hex,
  http,
  numberToHex,
  parseUnits,
  type Transport,
} from 'viem'
import { sendTransactionSync } from 'viem/actions'
import { Actions, Addresses, Tick, Account as tempo_Account } from 'viem/tempo'
import { http as zoneHttp } from 'viem/tempo/zones'
import { vi } from 'vitest'
import {
  type RenderHookOptions,
  type RenderHookResult,
  renderHook as vbr_renderHook,
} from 'vitest-browser-react'
import { createConfig, WagmiProvider } from 'wagmi'
import {
  zoneId,
  zoneLocal,
  zonePortalAddress,
  zonePortalEncryptionKey,
  zonePortalEncryptionKeyCount,
  zoneRpcUrl,
  zoneStorage,
} from './zone.js'

export const port = Number(import.meta.env.RPC_PORT ?? 4000)

export const rpcUrl = (() => {
  const id =
    (typeof process !== 'undefined' &&
      Number(process.env.VITEST_POOL_ID ?? 1) +
        Math.floor(Math.random() * 10_000)) ||
    1 + Math.floor(Math.random() * 10_000)
  return `http://localhost:${port}/${id}`
})()

export const addresses = {
  alphaUsd: '0x20c0000000000000000000000000000000000001',
} as const

export const privateKeys = Array.from({ length: 20 }, (_, i) =>
  Mnemonic.toPrivateKey(
    'test test test test test test test test test test test junk',
    { as: 'Hex', path: Mnemonic.path({ account: i }) },
  ),
) as unknown as FixedArray<Hex, 20>

export const accounts = privateKeys.map((privateKey) =>
  tempo_Account.fromSecp256k1(privateKey),
) as unknown as FixedArray<tempo_Account.RootAccount, 20>

export const tempoLocal = defineChain({
  ...chains.tempoLocalnet,
  contracts: {
    zonePortal: {
      [zoneId]: {
        address: zonePortalAddress,
        encryptionKeyCount: zonePortalEncryptionKeyCount,
        sequencerEncryptionKey: zonePortalEncryptionKey,
      },
    },
  },
  rpcUrls: { default: { http: [rpcUrl] } },
}).extend({ feeToken: 1n })

export const config = createConfig({
  chains: [tempoLocal, zoneLocal],
  connectors: [
    dangerous_secp256k1({
      privateKey: privateKeys[0],
      storage: createMemoryStorage(),
    }),
    dangerous_secp256k1({
      privateKey: privateKeys[1],
      storage: createMemoryStorage(),
    }),
    mockWallet({ accounts: [accounts[0].address, accounts[1].address] }),
  ],
  pollingInterval: 25,
  storage: null,
  transports: {
    [tempoLocal.id]: http(),
    [zoneLocal.id]: zoneHttp(zoneRpcUrl, { storage: zoneStorage }),
  },
})

/**
 * Mock connector for testing tempo wallet flow methods
 * (`wallet_transfer`, `wallet_swap`, `wallet_deposit`).
 *
 * Returns canned receipts for wallet flow methods so tests can verify the
 * action wiring without needing a real wallet.
 */
function mockWallet(parameters: {
  accounts: readonly [Address, ...Address[]]
}) {
  let connected = false
  let connectedChainId: number = tempoLocal.id

  const receipt = {
    blockHash:
      '0x0000000000000000000000000000000000000000000000000000000000000001',
    blockNumber: 1n,
    contractAddress: null,
    cumulativeGasUsed: 1n,
    effectiveGasPrice: 1n,
    from: '0x0000000000000000000000000000000000000001',
    gasUsed: 1n,
    logs: [],
    logsBloom: '0x0',
    status: 'success',
    to: null,
    transactionHash:
      '0x0000000000000000000000000000000000000000000000000000000000000002',
    transactionIndex: 0,
    type: 'tempo',
  } as const

  return createConnector((config) => ({
    id: 'mock-wallet',
    name: 'Mock Wallet Connector',
    type: 'mockWallet' as const,
    async setup() {
      connectedChainId = config.chains[0].id
    },
    async connect({ chainId } = {}) {
      connected = true
      const currentChainId = chainId ?? (await this.getChainId())
      connectedChainId = currentChainId
      return {
        accounts: parameters.accounts as readonly Address[],
        chainId: currentChainId,
      } as never
    },
    async disconnect() {
      connected = false
    },
    async getAccounts() {
      return parameters.accounts
    },
    async getChainId() {
      return connectedChainId
    },
    async isAuthorized() {
      return connected
    },
    onAccountsChanged(accounts) {
      config.emitter.emit('change', {
        accounts: accounts as readonly Address[],
      })
    },
    onChainChanged(chain) {
      config.emitter.emit('change', { chainId: Number(chain) })
    },
    async onDisconnect() {
      connected = false
      config.emitter.emit('disconnect')
    },
    async getProvider() {
      return {
        on() {},
        removeListener() {},
        async request({ method }: { method: string }) {
          if (method === 'eth_chainId') return numberToHex(connectedChainId)
          if (method === 'eth_accounts' || method === 'eth_requestAccounts')
            return parameters.accounts
          if (method === 'wallet_transfer')
            return { chainId: connectedChainId, receipt }
          if (method === 'wallet_swap') return { receipt }
          if (method === 'wallet_deposit') return { receipts: [receipt] }
          return null
        },
      }
    },
  }))
}

function createMemoryStorage() {
  const map = new Map<string, unknown>()
  return {
    getItem: (key: string) => (map.get(key) ?? null) as never,
    setItem: (key: string, value: unknown) => {
      map.set(key, value)
    },
    removeItem: (key: string) => {
      map.delete(key)
    },
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

export async function restart() {
  await fetch(`${rpcUrl}/restart`)

  // Re-setup liquidity for fee tokens after restart
  if (getConnection(config).status === 'disconnected')
    await connect(config, {
      connector: config.connectors[0]!,
    })
  const client = config.getClient()

  // Temporarily restore real Date.now so viem calculates a valid validBefore timestamp.
  if ((Date.now as any).mockRestore) (Date.now as any).mockRestore()
  await Promise.all(
    [1n, 2n, 3n].map((id) =>
      Actions.amm.mintSync(client, {
        account: accounts[0],
        feeToken: Addresses.pathUsd,
        nonceKey: 'expiring',
        userTokenAddress: id,
        validatorTokenAddress: Addresses.pathUsd,
        validatorTokenAmount: parseUnits('1000', 6),
        to: accounts[0].address,
      }),
    ),
  )
  vi.spyOn(Date, 'now').mockReturnValue(
    new Date(Date.UTC(2023, 1, 1)).valueOf(),
  )
}

export async function destroy() {
  await fetch(`${rpcUrl}/destroy`)
}

export async function setupToken() {
  if (getConnection(config).status === 'disconnected')
    await connect(config, {
      connector: config.connectors[0]!,
    })
  const client = await getConnectorClient(config)
  return viem_setupToken(client as never)
}

export async function setupPoolWithLiquidity() {
  if (getConnection(config).status === 'disconnected')
    await connect(config, {
      connector: config.connectors[0]!,
    })
  const client = await getConnectorClient(config)
  return viem_setupPoolWithLiquidity(client as never)
}

export async function setupTokenPair() {
  if (getConnection(config).status === 'disconnected')
    await connect(config, {
      connector: config.connectors[0]!,
    })
  const client = await getConnectorClient(config)
  return viem_setupTokenPair(client as never)
}

export async function setupOrders() {
  if (getConnection(config).status === 'disconnected')
    await connect(config, {
      connector: config.connectors[0]!,
    })
  const client = await getConnectorClient(config)
  return viem_setupOrders(client as never)
}

export async function viem_setupToken(
  client: Client<Transport, typeof tempoLocal, Account>,
  parameters: Partial<
    Awaited<ReturnType<typeof Actions.token.createSync>>
  > = {},
) {
  const token = await Actions.token.createSync(client, {
    currency: 'USD',
    name: 'Test Token',
    symbol: 'TST',
    ...parameters,
  })

  await sendTransactionSync(client, {
    calls: [
      Actions.token.grantRoles.call({
        role: 'issuer',
        to: client.account.address,
        token: token.token,
      }),
      Actions.token.mint.call({
        amount: parseUnits('10000', 6),
        to: client.account.address,
        token: token.token,
      }),
    ],
  })

  return token
}

export async function viem_setupPoolWithLiquidity(
  client: Client<Transport, Chain, Account>,
) {
  // Create a new token for testing
  const { token } = await Actions.token.createSync(client, {
    name: 'Test Token',
    symbol: 'TEST',
    currency: 'USD',
  })

  // Grant issuer role to mint tokens
  await Actions.token.grantRolesSync(client, {
    token,
    roles: ['issuer'],
    to: client.account.address,
  })

  // Mint some tokens to account
  await Actions.token.mintSync(client, {
    to: client.account.address,
    amount: parseUnits('1000', 6),
    token,
  })

  // Add liquidity to pool
  await Actions.amm.mintSync(client, {
    userTokenAddress: token,
    validatorTokenAddress: addresses.alphaUsd,
    validatorTokenAmount: parseUnits('100', 6),
    to: client.account.address,
  })

  return { tokenAddress: token }
}

export async function viem_setupTokenPair(
  client: Client<Transport, typeof tempoLocal, Account>,
) {
  // Create quote token
  const { token: quoteToken } = await Actions.token.createSync(client, {
    name: 'Test Quote Token',
    symbol: 'QUOTE',
    currency: 'USD',
  })

  // Create base token
  const { token: baseToken } = await Actions.token.createSync(client, {
    name: 'Test Base Token',
    symbol: 'BASE',
    currency: 'USD',
    quoteToken,
  })

  await sendTransactionSync(client, {
    calls: [
      Actions.token.grantRoles.call({
        token: baseToken,
        role: 'issuer',
        to: client.account.address,
      }),
      Actions.token.grantRoles.call({
        token: quoteToken,
        role: 'issuer',
        to: client.account.address,
      }),
      Actions.token.mint.call({
        token: baseToken,
        to: client.account.address,
        amount: parseUnits('10000', 6),
      }),
      Actions.token.mint.call({
        token: quoteToken,
        to: client.account.address,
        amount: parseUnits('10000', 6),
      }),
      Actions.token.approve.call({
        token: baseToken,
        spender: Addresses.stablecoinDex,
        amount: parseUnits('10000', 6),
      }),
      Actions.token.approve.call({
        token: quoteToken,
        spender: Addresses.stablecoinDex,
        amount: parseUnits('10000', 6),
      }),
    ],
  })

  // Create the pair on the DEX
  return await Actions.dex.createPairSync(client, {
    base: baseToken,
  })
}

export async function viem_setupOrders(
  client: Client<Transport, typeof tempoLocal, Account>,
) {
  const { base: base1 } = await viem_setupTokenPair(client)
  const { base: base2 } = await viem_setupTokenPair(client)

  const bases = [base1, base2]

  // Create 50 orders with varying amounts, ticks, and tokens
  const calls = []
  for (let i = 0; i < 50; i++) {
    const token = bases[i % bases.length]!
    const amount = parseUnits(String(100 + i * 10), 6)
    const isBuy = i % 2 === 0
    const tickPrice = 1.0 + ((i % 20) - 10) * 0.001
    const tick = Tick.fromPrice(String(tickPrice))

    calls.push(
      Actions.dex.place.call({
        token,
        amount,
        type: isBuy ? 'buy' : 'sell',
        tick,
      }),
    )
  }

  await sendTransactionSync(client, { calls } as never)

  return { bases }
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { connect, getConnection, getConnectorClient } from '@wagmi/core'
import * as chains from '@wagmi/core/chains'
import type { FixedArray } from '@wagmi/core/internal'
import { dangerous_secp256k1 } from '@wagmi/core/tempo'
import { Mnemonic } from 'ox'
import * as React from 'react'
import {
  type Account,
  type Chain,
  type Client,
  defineChain,
  http,
  parseUnits,
  type Transport,
} from 'viem'
import { sendTransactionSync } from 'viem/actions'
import { Actions, Addresses, Tick, Account as tempo_Account } from 'viem/tempo'
import {
  type RenderHookOptions,
  type RenderHookResult,
  renderHook as vbr_renderHook,
} from 'vitest-browser-react'
import { createConfig, WagmiProvider } from 'wagmi'

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

export const accounts = Array.from({ length: 20 }, (_, i) => {
  const privateKey = Mnemonic.toPrivateKey(
    'test test test test test test test test test test test junk',
    { as: 'Hex', path: Mnemonic.path({ account: i }) },
  )
  return tempo_Account.fromSecp256k1(privateKey)
}) as unknown as FixedArray<tempo_Account.RootAccount, 20>

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
  await Promise.all(
    [1n, 2n, 3n].map((id) =>
      Actions.amm.mintSync(client, {
        account: accounts[0],
        feeToken: Addresses.pathUsd,
        nonceKey: 'random',
        userTokenAddress: id,
        validatorTokenAddress: Addresses.pathUsd,
        validatorTokenAmount: parseUnits('1000', 6),
        to: accounts[0].address,
      }),
    ),
  )
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
  client: Client<Transport, Chain, Account>,
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

  await Actions.token.grantRolesSync(client, {
    roles: ['issuer'],
    to: client.account.address,
    token: token.token,
  })

  await Actions.token.mintSync(client, {
    amount: parseUnits('10000', 6),
    to: client.account.address,
    token: token.token,
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

import { privateKey } from '@wagmi/test'
import { type Address, createClient, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'
import { expect, test, vi } from 'vitest'

import { createConnector } from '../connectors/createConnector.js'
import { mock } from '../connectors/mock.js'
import { createConfig } from '../createConfig.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { prepareTransactionRequest } from './prepareTransactionRequest.js'

const localAccount = Object.assign(privateKeyToAccount(privateKey), {
  keyType: 'webAuthn' as const,
})

function createTestConfig(options: {
  connectorAccount: { address: Address; type: 'json-rpc' } | typeof localAccount
}) {
  const { connectorAccount } = options
  const prepareSpy = vi.fn(async (parameters: any) => ({
    ...parameters,
    chainId: mainnet.id,
    from:
      typeof parameters.account === 'string'
        ? parameters.account
        : parameters.account.address,
    gas: 21_000n,
    maxFeePerGas: 1n,
    maxPriorityFeePerGas: 1n,
    nonce: 0,
    type: 'eip1559' as const,
  }))

  const config = createConfig({
    chains: [mainnet],
    connectors: [
      createConnector((config) => {
        const base = mock({ accounts: [connectorAccount.address] })(config)
        return {
          ...base,
          async getClient({ chainId } = {}) {
            const chain =
              config.chains.find((chain) => chain.id === chainId) ??
              config.chains[0]
            return createClient({
              account: connectorAccount,
              chain,
              transport: custom({ request: async () => null }),
            })
          },
        }
      }),
    ],
    storage: null,
    transports: {
      [mainnet.id]: custom({ request: async () => null }),
    },
  })
  const client = createClient({
    chain: mainnet,
    transport: custom({ request: async () => null }),
  }).extend(() => ({
    prepareTransactionRequest: prepareSpy,
  }))
  vi.spyOn(config, 'getClient').mockReturnValue(client as never)

  return { config, connector: config.connectors[0]!, prepareSpy }
}

test('behavior: preserves richer connected account details', async () => {
  const { config, connector, prepareSpy } = createTestConfig({
    connectorAccount: localAccount,
  })
  await connect(config, { connector })

  await prepareTransactionRequest(config, {
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })

  expect(prepareSpy.mock.calls[0]?.[0]?.account).toBe(localAccount)

  await disconnect(config, { connector })
})

test('parameters: connector preserves richer connected account details', async () => {
  const { config, connector, prepareSpy } = createTestConfig({
    connectorAccount: localAccount,
  })
  await connect(config, { connector })

  await prepareTransactionRequest(config, {
    connector,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })

  expect(prepareSpy.mock.calls[0]?.[0]?.account).toBe(localAccount)

  await disconnect(config, { connector })
})

test('behavior: upgrades the current address to the richer connector account', async () => {
  const { config, connector, prepareSpy } = createTestConfig({
    connectorAccount: localAccount,
  })
  await connect(config, { connector })

  await prepareTransactionRequest(config, {
    account: localAccount.address,
    connector,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })

  expect(prepareSpy.mock.calls[0]?.[0]?.account).toBe(localAccount)

  await disconnect(config, { connector })
})

test('behavior: preserves json-rpc connector accounts as addresses', async () => {
  const jsonRpcAccount = {
    address: localAccount.address,
    type: 'json-rpc' as const,
  }
  const { config, connector, prepareSpy } = createTestConfig({
    connectorAccount: jsonRpcAccount,
  })
  await connect(config, { connector })

  await prepareTransactionRequest(config, {
    connector,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  })

  expect(prepareSpy.mock.calls[0]?.[0]?.account).toEqual(jsonRpcAccount)

  await disconnect(config, { connector })
})

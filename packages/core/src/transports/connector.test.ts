import { config } from '@wagmi/test'
import { optimism } from 'viem/chains'
import { expect, test } from 'vitest'
import { createStore } from 'zustand'

import { injected } from '../connectors/injected.js'
import { mock } from '../connectors/mock.js'
import { unstable_connector } from './connector.js'

const connector = config.connectors[0]!

test('setup', () => {
  expect(unstable_connector(injected)({})).toMatchInlineSnapshot(`
    {
      "config": {
        "key": "connector",
        "methods": undefined,
        "name": "Connector",
        "request": [Function],
        "retryCount": 3,
        "retryDelay": 150,
        "timeout": undefined,
        "type": "connector",
      },
      "request": [Function],
      "value": undefined,
    }
  `)
})

test('behavior: connector type not found', () => {
  const transport = unstable_connector({ type: 'foo' })({})
  expect(() =>
    transport.request({ method: 'eth_chainId' }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ProviderDisconnectedError: The Provider is disconnected from all chains.

    Details: Could not find connector of type "foo" in \`connectors\` passed to \`createConfig\`.
    Version: viem@2.23.12]
  `)
})

test('behavior: provider is disconnected', () => {
  const transport = unstable_connector(mock)({
    connectors: createStore(() => [
      {
        ...connector,
        async getProvider() {
          return undefined
        },
      },
    ]),
  })

  expect(() =>
    transport.request({ method: 'eth_chainId' }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ProviderDisconnectedError: The Provider is disconnected from all chains.

    Details: Provider is disconnected.
    Version: viem@2.23.12]
  `)
})

test('behavior: chainId mismatch', () => {
  const transport = unstable_connector(mock)({
    chain: optimism,
    connectors: createStore(() => [
      {
        ...connector,
        async getProvider(options = {}) {
          if (options.chainId === optimism.id) return connector.getProvider()
          return undefined
        },
      },
    ]),
  })

  expect(() =>
    transport.request({ method: 'eth_chainId' }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [ChainDisconnectedError: The Provider is not connected to the requested chain.

    Details: The current chain of the connector (id: 1) does not match the target chain for the request (id: 10 – OP Mainnet).
    Version: viem@2.23.12]
  `)
})

test('behavior: request', () => {
  const transport = unstable_connector(mock)({
    connectors: createStore(() => [connector]),
  })

  expect(
    transport.request({ method: 'eth_chainId' }),
  ).resolves.toThrowErrorMatchingInlineSnapshot(`"0x1"`)
})

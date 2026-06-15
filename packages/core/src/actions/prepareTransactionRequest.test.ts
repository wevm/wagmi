import { accounts, chain, config, privateKey } from '@wagmi/test'
import { createClient, custom, parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { afterEach, expect, test, vi } from 'vitest'
import { mock } from '../connectors/mock.js'
import { createConfig } from '../createConfig.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { prepareTransactionRequest } from './prepareTransactionRequest.js'

const connector = config.connectors[0]!

afterEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
  else if (config.state.current) await disconnect(config)
})

test('default', async () => {
  await connect(config, { connector })

  const request = await prepareTransactionRequest(config, {
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })

  const {
    gas: _gas,
    gasPrice: _gasPrice,
    maxFeePerGas: _mfpg,
    maxPriorityFeePerGas: _mpfpg,
    nonce: _nonce,
    ...rest
  } = request
  expect(rest).toMatchInlineSnapshot(`
    {
      "account": {
        "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
        "type": "json-rpc",
      },
      "chainId": 1,
      "from": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
      "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
      "type": "eip1559",
      "value": 1000000000000000000n,
    }
  `)
})

test('parameters: account', async () => {
  await connect(config, { connector })

  const request = await prepareTransactionRequest(config, {
    account: accounts[0],
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })

  const {
    gas: _gas,
    gasPrice: _gasPrice,
    maxFeePerGas: _mfpg,
    maxPriorityFeePerGas: _mpfpg,
    nonce: _nonce,
    ...rest
  } = request
  expect(rest).toMatchInlineSnapshot(`
    {
      "account": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
      "chainId": 1,
      "from": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
      "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
      "type": "eip1559",
      "value": 1000000000000000000n,
    }
  `)
})

test('behavior: local account', async () => {
  const account = privateKeyToAccount(privateKey)

  const request = await prepareTransactionRequest(config, {
    account,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })

  const {
    gas: _gas,
    gasPrice: _gasPrice,
    maxFeePerGas: _mfpg,
    maxPriorityFeePerGas: _mpfpg,
    nonce: _nonce,
    ...rest
  } = request
  expect(rest).toMatchInlineSnapshot(`
    {
      "account": {
        "address": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
        "nonceManager": undefined,
        "publicKey": "0x04e997cee8adb07b5269f375399109f53c94ddb7ac9cdb9252b74ba33fd471392fc563102ff7b38c85ee9d0a88c8819e6c97ea8b0db791d59c89086f62f5516863",
        "sign": [Function],
        "signAuthorization": [Function],
        "signMessage": [Function],
        "signTransaction": [Function],
        "signTypedData": [Function],
        "source": "privateKey",
        "type": "local",
      },
      "chainId": 1,
      "from": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
      "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
      "type": "eip1559",
      "value": 1000000000000000000n,
    }
  `)
})

test('behavior: routes through connector client when connector exposes `getClient`', async () => {
  const connectorRequest = vi.fn(async () => {
    throw new Error('connector client used')
  })
  const publicRequest = vi.fn(async () => {
    throw new Error('public client used')
  })

  const connectorClient = createClient({
    account: accounts[0],
    chain: chain.mainnet,
    transport: custom({ request: connectorRequest }, { retryCount: 0 }),
  })

  const config = createConfig({
    chains: [chain.mainnet],
    connectors: [
      (params) => ({
        ...mock({ accounts })(params),
        getClient: async () => connectorClient,
      }),
    ],
    storage: null,
    transports: {
      [chain.mainnet.id]: custom({ request: publicRequest }, { retryCount: 0 }),
    },
  })

  await connect(config, { connector: config.connectors[0]! })

  // The connector client's transport throws, proving prepare ran against it.
  await expect(
    prepareTransactionRequest(config, {
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: parseEther('1'),
    }),
  ).rejects.toThrowError()

  expect(connectorRequest).toHaveBeenCalled()
  expect(publicRequest).not.toHaveBeenCalled()
})

test('behavior: uses public client when connector has no `getClient`', async () => {
  const publicRequest = vi.fn(async () => {
    throw new Error('public client used')
  })

  const config = createConfig({
    chains: [chain.mainnet],
    connectors: [mock({ accounts })],
    storage: null,
    transports: {
      [chain.mainnet.id]: custom({ request: publicRequest }, { retryCount: 0 }),
    },
  })

  await connect(config, { connector: config.connectors[0]! })

  await expect(
    prepareTransactionRequest(config, {
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: parseEther('1'),
    }),
  ).rejects.toThrowError()

  expect(publicRequest).toHaveBeenCalled()
})

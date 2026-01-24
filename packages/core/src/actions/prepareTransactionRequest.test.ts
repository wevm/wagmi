import { accounts, config, privateKey } from '@wagmi/test'
import { parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { expect, test } from 'vitest'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { prepareTransactionRequest } from './prepareTransactionRequest.js'

const connector = config.connectors[0]!

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
      "account": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
      "chainId": 1,
      "from": "0x95132632579b073D12a6673e18Ab05777a6B86f8",
      "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
      "type": "eip1559",
      "value": 1000000000000000000n,
    }
  `)

  await disconnect(config, { connector })
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

  await disconnect(config, { connector })
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

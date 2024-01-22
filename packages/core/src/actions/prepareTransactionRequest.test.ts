import { accounts, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { parseEther } from 'viem'
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
    maxFeePerGas: _mfpg,
    maxPriorityFeePerGas: _mpfpg,
    nonce: _nonce,
    ...rest
  } = request
  expect(rest).toMatchInlineSnapshot(`
    {
      "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
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
    maxFeePerGas: _mfpg,
    maxPriorityFeePerGas: _mpfpg,
    nonce: _nonce,
    ...rest
  } = request
  expect(rest).toMatchInlineSnapshot(`
    {
      "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
      "type": "eip1559",
      "value": 1000000000000000000n,
    }
  `)

  await disconnect(config, { connector })
})

test('parameters: connector', async () => {
  await connect(config, { connector })

  const request = await prepareTransactionRequest(config, {
    connector,
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })

  const {
    gas: _gas,
    maxFeePerGas: _mfpg,
    maxPriorityFeePerGas: _mpfpg,
    nonce: _nonce,
    ...rest
  } = request
  expect(rest).toMatchInlineSnapshot(`
    {
      "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
      "type": "eip1559",
      "value": 1000000000000000000n,
    }
  `)

  await disconnect(config, { connector })
})

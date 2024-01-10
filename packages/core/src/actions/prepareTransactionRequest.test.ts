import { accounts, chain, config, testClient } from '@wagmi/test'
import { expect, test } from 'vitest'

import { parseEther, parseGwei } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { getBlock } from './getBlock.js'
import { prepareTransactionRequest } from './prepareTransactionRequest.js'

const targetAccount = accounts[1]

async function setup() {
  await testClient.mainnet.setBalance({
    address: targetAccount,
    value: parseEther('1'),
  })
  await testClient.mainnet.setNextBlockBaseFeePerGas({
    baseFeePerGas: parseGwei('10'),
  })
  await testClient.mainnet.mine({ blocks: 1 })
}

test('default', async () => {
  await setup()

  const block = await getBlock(config)
  const {
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce: _nonce,
    ...rest
  } = await prepareTransactionRequest(config, {
    to: targetAccount,
    value: parseEther('1'),
  })
  expect(maxFeePerGas).toEqual(
    (block.baseFeePerGas! * 120n) / 100n + maxPriorityFeePerGas!,
  )
  expect(rest).toMatchInlineSnapshot(`
      {
        "gas": 21000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
      }
    `)
})

test('parameters: account', async () => {
  await setup()

  const {
    maxFeePerGas: _maxFeePerGas,
    nonce: _nonce,
    ...rest
  } = await prepareTransactionRequest(config, {
    account: privateKeyToAccount(
      '0x0123456789012345678901234567890123456789012345678901234567890123',
    ),
    to: targetAccount,
    value: parseEther('1'),
  })

  expect(rest).toMatchInlineSnapshot(`
      {
        "account": {
          "address": "0x14791697260E4c9A71f18484C9f997B308e59325",
          "publicKey": "0x046655feed4d214c261e0a6b554395596f1f1476a77d999560e5a8df9b8a1a3515217e88dd05e938efdd71b2cce322bf01da96cd42087b236e8f5043157a9c068e",
          "signMessage": [Function],
          "signTransaction": [Function],
          "signTypedData": [Function],
          "source": "privateKey",
          "type": "local",
        },
        "from": "0x14791697260E4c9A71f18484C9f997B308e59325",
        "gas": 21000n,
        "maxPriorityFeePerGas": 18500000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
      }
    `)
})

test('parameters: data', async () => {
  await setup()

  const {
    maxFeePerGas: _maxFeePerGas,
    nonce: _nonce,
    ...rest
  } = await prepareTransactionRequest(config, {
    data: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1'),
  })

  expect(rest).toMatchInlineSnapshot(`
      {
        "data": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "gas": 21320n,
        "maxPriorityFeePerGas": 18500000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
      }
    `)
})

test('parameters: chainId', async () => {
  await setup()

  const {
    maxFeePerGas: _maxFeePerGas,
    nonce: _nonce,
    ...rest
  } = await prepareTransactionRequest(config, {
    chainId: chain.mainnet2.id,
    to: targetAccount,
    value: parseEther('1'),
  })

  expect(rest).toMatchInlineSnapshot(`
      {
        "gas": 21000n,
        "maxPriorityFeePerGas": 62527233158n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
      }
    `)
})

test('parameters: nonce', async () => {
  await setup()

  const { maxFeePerGas: _maxFeePerGas, ...rest } =
    await prepareTransactionRequest(config, {
      nonce: 5,
      to: targetAccount,
      value: parseEther('1'),
    })

  expect(rest).toMatchInlineSnapshot(`
      {
        "gas": 21000n,
        "maxPriorityFeePerGas": 18500000000n,
        "nonce": 5,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
      }
    `)
})

test('parameters: gasPrice', async () => {
  await setup()

  const { nonce: _nonce, ...rest } = await prepareTransactionRequest(config, {
    gasPrice: parseGwei('10'),
    to: targetAccount,
    value: parseEther('1'),
  })

  expect(rest).toMatchInlineSnapshot(`
      {
        "gas": 21000n,
        "gasPrice": 10000000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "legacy",
        "value": 1000000000000000000n,
      }
    `)
})

test('parameters: maxFeePerGas', async () => {
  await setup()

  const { nonce: _nonce, ...rest } = await prepareTransactionRequest(config, {
    maxFeePerGas: parseGwei('100'),
    to: targetAccount,
    value: parseEther('1'),
  })

  expect(rest).toMatchInlineSnapshot(`
      {
        "gas": 21000n,
        "maxFeePerGas": 100000000000n,
        "maxPriorityFeePerGas": 18500000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
      }
    `)
})

test('parameters: maxPriorityFeePerGas', async () => {
  await setup()

  const { nonce: _nonce, ...rest } = await prepareTransactionRequest(config, {
    maxPriorityFeePerGas: parseGwei('5'),
    to: targetAccount,
    value: parseEther('1'),
  })

  expect(rest).toMatchInlineSnapshot(`
      {
        "gas": 21000n,
        "maxFeePerGas": 17000000000n,
        "maxPriorityFeePerGas": 5000000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
      }
    `)
})

test('parameters: maxFeePerGas + maxPriorityFeePerGas', async () => {
  await setup()

  const { nonce: _nonce, ...rest } = await prepareTransactionRequest(config, {
    maxFeePerGas: parseGwei('10'),
    maxPriorityFeePerGas: parseGwei('5'),
    to: targetAccount,
    value: parseEther('1'),
  })

  expect(rest).toMatchInlineSnapshot(`
      {
        "gas": 21000n,
        "maxFeePerGas": 10000000000n,
        "maxPriorityFeePerGas": 5000000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
      }
    `)
})

test('parameters: gasPrice + maxFeePerGas', async () => {
  await setup()

  await expect(() =>
    // @ts-expect-error
    prepareTransactionRequest(config, {
      gasPrice: parseGwei('10'),
      maxFeePerGas: parseGwei('20'),
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).rejects.toThrowError(
    'Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.',
  )
})

test('parameters: gasPrice + maxPriorityFeePerGass', async () => {
  await setup()

  await expect(() =>
    // @ts-expect-error
    prepareTransactionRequest(config, {
      gasPrice: parseGwei('10'),
      maxPriorityFeePerGas: parseGwei('20'),
      to: targetAccount,
      value: parseEther('1'),
    }),
  ).rejects.toThrowError(
    'Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.',
  )
})

test('parameters: type', async () => {
  await setup()

  const {
    maxFeePerGas: _maxFeePerGas,
    nonce: _nonce,
    ...rest
  } = await prepareTransactionRequest(config, {
    type: 'eip1559',
    to: targetAccount,
    value: parseEther('1'),
  })

  expect(rest).toMatchInlineSnapshot(`
      {
        "gas": 21000n,
        "maxPriorityFeePerGas": 18500000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
      }
    `)
})

test('parameters: parameters', async () => {
  await setup()

  const result = await prepareTransactionRequest(config, {
    parameters: ['gas'],
    to: targetAccount,
    value: parseEther('1'),
  })
  expect(result).toMatchInlineSnapshot(`
      {
        "gas": 21000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "value": 1000000000000000000n,
      }
    `)

  const result2 = await prepareTransactionRequest(config, {
    parameters: ['fees'],
    to: targetAccount,
    value: parseEther('1'),
  })
  expect(result2).toMatchInlineSnapshot(`
      {
        "maxFeePerGas": 30500000000n,
        "maxPriorityFeePerGas": 18500000000n,
        "to": "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
        "type": "eip1559",
        "value": 1000000000000000000n,
      }
    `)
})

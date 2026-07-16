import { connect, disconnect } from '@wagmi/core'
import { config, tempoLocal } from '@wagmi/test/tempo'
import { beforeEach, describe, expect, test } from 'vitest'
import * as wallet from './wallet.js'

const connector = config.connectors[2]!

beforeEach(async () => {
  await disconnect(config).catch(() => {})
  await connect(config, { connector })
})

describe('transfer', () => {
  test('default (read-only)', async () => {
    await expect(
      wallet.transfer(config, {
        amount: '1.5',
        feePayer: false,
        to: '0x0000000000000000000000000000000000000003',
        token: '0x0000000000000000000000000000000000000004',
      }),
    ).resolves.toMatchInlineSnapshot(`
      {
        "chainId": 1337,
        "receipt": {
          "blockHash": "0x0000000000000000000000000000000000000000000000000000000000000001",
          "blockNumber": 1n,
          "contractAddress": null,
          "cumulativeGasUsed": 1n,
          "effectiveGasPrice": 1n,
          "from": "0x0000000000000000000000000000000000000001",
          "gasUsed": 1n,
          "logs": [],
          "logsBloom": "0x0",
          "status": "success",
          "to": null,
          "transactionHash": "0x0000000000000000000000000000000000000000000000000000000000000002",
          "transactionIndex": 0,
          "type": "tempo",
        },
      }
    `)
  })

  test('editable: no parameters', async () => {
    const result = await wallet.transfer(config, { editable: true })
    expect(result.receipt).toBeDefined()
  })
})

describe('swap', () => {
  test('default', async () => {
    await expect(
      wallet.swap(config, {
        amount: '2.5',
        pairToken: '0x0000000000000000000000000000000000000003',
        slippage: 0.05,
        token: '0x0000000000000000000000000000000000000004',
        type: 'sell',
      }),
    ).resolves.toMatchInlineSnapshot(`
      {
        "receipt": {
          "blockHash": "0x0000000000000000000000000000000000000000000000000000000000000001",
          "blockNumber": 1n,
          "contractAddress": null,
          "cumulativeGasUsed": 1n,
          "effectiveGasPrice": 1n,
          "from": "0x0000000000000000000000000000000000000001",
          "gasUsed": 1n,
          "logs": [],
          "logsBloom": "0x0",
          "status": "success",
          "to": null,
          "transactionHash": "0x0000000000000000000000000000000000000000000000000000000000000002",
          "transactionIndex": 0,
          "type": "tempo",
        },
      }
    `)
  })

  test('default: no parameters', async () => {
    const result = await wallet.swap(config)
    expect(result.receipt).toBeDefined()
  })
})

describe('deposit', () => {
  test('default', async () => {
    await expect(
      wallet.deposit(config, {
        address: '0x0000000000000000000000000000000000000003',
        chainId: tempoLocal.id,
        displayName: 'Account',
        token: '0x0000000000000000000000000000000000000004',
      }),
    ).resolves.toMatchInlineSnapshot(`
      {
        "receipts": [
          {
            "blockHash": "0x0000000000000000000000000000000000000000000000000000000000000001",
            "blockNumber": 1n,
            "contractAddress": null,
            "cumulativeGasUsed": 1n,
            "effectiveGasPrice": 1n,
            "from": "0x0000000000000000000000000000000000000001",
            "gasUsed": 1n,
            "logs": [],
            "logsBloom": "0x0",
            "status": "success",
            "to": null,
            "transactionHash": "0x0000000000000000000000000000000000000000000000000000000000000002",
            "transactionIndex": 0,
            "type": "tempo",
          },
        ],
      }
    `)
  })

  test('default: no parameters', async () => {
    const result = await wallet.deposit(config)
    expect(result?.receipts).toBeDefined()
  })
})

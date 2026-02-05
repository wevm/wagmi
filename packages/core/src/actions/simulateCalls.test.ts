import { accounts, address, config, mainnet } from '@wagmi/test'
import { numberToHex } from 'viem'
import { expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { simulateCalls } from './simulateCalls.js'

const connector = config.connectors[0]!
const name4bytes = '0x06fdde03'
const nameResultData =
  '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000'
const stateOverrideAddress = '0x000000000000000000000000000000000000dead'
const stateOverrideCode = '0x602a60005260206000f3'

const account = accounts[0]

test('parameters: account', async () => {
  const result = await simulateCalls(config, {
    account,
    calls: [
      {
        data: name4bytes,
        to: address.wagmiMintExample,
      },
    ],
  })

  expect(result.results[0]?.data).toBe(nameResultData)

  expect({
    assetChanges: result.assetChanges,
    blockNumber: result.block.number,
    results: result.results.map((call) => ({
      status: call.status,
      data: call.data,
    })),
  }).toMatchInlineSnapshot(`
    {
      "assetChanges": [],
      "blockNumber": 23535880n,
      "results": [
        {
          "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
          "status": "success",
        },
      ],
    }
  `)
})

test('parameters: blockNumber', async () => {
  const blockNumber = mainnet.fork.blockNumber - 1n
  const result = await simulateCalls(config, {
    blockNumber,
    calls: [
      {
        data: name4bytes,
        to: address.wagmiMintExample,
      },
    ],
  })

  expect(result.results[0]?.data).toBe(nameResultData)
})

test('parameters: connector', async () => {
  await connect(config, { connector })

  const result = await simulateCalls(config, {
    calls: [
      {
        data: name4bytes,
        to: address.wagmiMintExample,
      },
    ],
    connector,
    traceAssetChanges: true,
  })

  expect(result.results[0]?.data).toBe(nameResultData)
  expect(result.assetChanges[0]?.token.symbol).toBe('ETH')

  await disconnect(config, { connector })
})

test('behavior: state overrides', async () => {
  const result = await simulateCalls(config, {
    calls: [
      {
        data: '0x',
        to: stateOverrideAddress,
      },
    ],
    stateOverrides: [
      {
        address: stateOverrideAddress,
        code: stateOverrideCode,
      },
    ],
  })

  expect(result.results[0]).toMatchObject({
    status: 'success',
    data: numberToHex(42n, { size: 32 }),
  })
})

test('behavior: traceAssetChanges requires account', async () => {
  await expect(
    simulateCalls(config, {
      calls: [
        {
          data: name4bytes,
          to: address.wagmiMintExample,
        },
      ],
      traceAssetChanges: true,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [BaseError: \`account\` is required when \`traceAssetChanges\` is true

    Version: viem@2.44.4]
  `)
})

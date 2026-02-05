import { abi, address, config } from '@wagmi/test'
import { numberToHex } from 'viem'
import { expect, test } from 'vitest'

import { simulateBlocks } from './simulateBlocks.js'

const name4bytes = '0x06fdde03'
const nameResultData =
  '0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000'
const mintWithParams4bytes = '0xa0712d68'
const fourTwenty =
  '00000000000000000000000000000000000000000000000000000000000001a4'
const stateOverrideAddress = '0x000000000000000000000000000000000000dead'
const stateOverrideCode = '0x602a60005260206000f3'
const blockOverrideCode = '0x4260005260206000f3'

test('default', async () => {
  const result = await simulateBlocks(config, {
    blocks: [
      {
        calls: [
          {
            data: name4bytes,
            to: address.wagmiMintExample,
          },
        ],
      },
    ],
  })

  expect(result[0]?.calls[0]?.data).toBe(nameResultData)

  const snapshot = result.map((block) => ({
    blockNumber: block.number,
    calls: block.calls.map((call) => ({
      status: call.status,
      data: call.data,
    })),
  }))

  expect(snapshot).toMatchInlineSnapshot(`
    [
      {
        "blockNumber": 23535880n,
        "calls": [
          {
            "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000",
            "status": "success",
          },
        ],
      },
    ]
  `)
})

test('decodes result', async () => {
  const result = await simulateBlocks(config, {
    blocks: [
      {
        calls: [
          {
            abi: abi.wagmiMintExample,
            functionName: 'name',
            to: address.wagmiMintExample,
          },
        ],
      },
    ],
  })

  expect(result[0]?.calls[0]).toMatchObject({
    status: 'success',
    result: 'wagmi',
  })
})

test('behavior: multiple blocks', async () => {
  const result = await simulateBlocks(config, {
    blocks: [
      {
        calls: [
          {
            data: name4bytes,
            to: address.wagmiMintExample,
          },
        ],
      },
      {
        calls: [
          {
            data: name4bytes,
            to: address.wagmiMintExample,
          },
        ],
      },
    ],
  })

  expect(result).toHaveLength(2)
  expect(result[0]?.calls[0]).toMatchObject({
    status: 'success',
    data: nameResultData,
  })
  expect(result[1]?.calls[0]).toMatchObject({
    status: 'success',
    data: nameResultData,
  })
})

test('behavior: failure', async () => {
  const result = await simulateBlocks(config, {
    blocks: [
      {
        calls: [
          {
            data: `${mintWithParams4bytes}${fourTwenty}`,
            to: address.wagmiMintExample,
          },
        ],
      },
    ],
  })

  expect(result[0]?.calls[0]).toMatchObject({
    status: 'failure',
    error: expect.any(Error),
  })
})

test('behavior: state overrides', async () => {
  const result = await simulateBlocks(config, {
    blocks: [
      {
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
      },
    ],
  })

  expect(result[0]?.calls[0]).toMatchObject({
    status: 'success',
    data: numberToHex(42n, { size: 32 }),
  })
})

test('behavior: block overrides', async () => {
  const blockTime = 1_700_000_000n

  const result = await simulateBlocks(config, {
    blocks: [
      {
        blockOverrides: {
          time: blockTime,
        },
        calls: [
          {
            data: '0x',
            to: stateOverrideAddress,
          },
        ],
        stateOverrides: [
          {
            address: stateOverrideAddress,
            code: blockOverrideCode,
          },
        ],
      },
    ],
  })

  expect(result[0]?.calls[0]).toMatchObject({
    status: 'success',
    data: numberToHex(blockTime, { size: 32 }),
  })
})

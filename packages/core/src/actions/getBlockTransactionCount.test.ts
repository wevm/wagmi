import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBlockTransactionCount } from './getBlockTransactionCount.js'

test('default', async () => {
  await expect(getBlockTransactionCount(config)).resolves.toBeTypeOf('number')
})

test('parameters: chainId', async () => {
  await expect(
    getBlockTransactionCount(config, { chainId: chain.mainnet2.id }),
  ).resolves.toBeTypeOf('number')
})

test('parameters: blockNumber', async () => {
  await expect(
    getBlockTransactionCount(config, { blockNumber: 13677382n }),
  ).resolves.toBeTypeOf('number')
})

test('parameters: blockHash', async () => {
  await expect(
    getBlockTransactionCount(config, {
      blockHash:
        '0x6201f37a245850d1f11e4be3ac45bc51bd9d43ee4a127192cad550f351cfa575',
    }),
  ).resolves.toBeTypeOf('number')
})

test('parameters: blockTag', async () => {
  await expect(
    getBlockTransactionCount(config, {
      blockTag: 'earliest',
    }),
  ).resolves.toBeTypeOf('number')

  await expect(
    getBlockTransactionCount(config, {
      blockTag: 'finalized',
    }),
  ).resolves.toBeTypeOf('number')

  await expect(
    getBlockTransactionCount(config, {
      blockTag: 'latest',
    }),
  ).resolves.toBeTypeOf('number')

  await expect(
    getBlockTransactionCount(config, {
      blockTag: 'pending',
    }),
  ).resolves.toBeTypeOf('number')

  await expect(
    getBlockTransactionCount(config, {
      blockTag: 'safe',
    }),
  ).resolves.toBeTypeOf('number')
})

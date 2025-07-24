import { address, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getStorageAt } from './getStorageAt.js'

test('default', async () => {
  await expect(
    getStorageAt(config, {
      address: address.wagmiMintExample,
      slot: '0x0',
    }),
  ).resolves.toBe(
    '0x7761676d6900000000000000000000000000000000000000000000000000000a',
  )
  await expect(
    getStorageAt(config, {
      address: address.wagmiMintExample,
      slot: '0x1',
    }),
  ).resolves.toBe(
    '0x5741474d4900000000000000000000000000000000000000000000000000000a',
  )
})

test('parameters: blockNumber', async () => {
  await expect(
    getStorageAt(config, {
      address: address.wagmiMintExample,
      blockNumber: 16280770n,
      slot: '0x0',
    }),
  ).resolves.toBe(
    '0x7761676d6900000000000000000000000000000000000000000000000000000a',
  )
})

test('parameters: blockTag', async () => {
  await expect(
    getStorageAt(config, {
      address: address.wagmiMintExample,
      blockTag: 'safe',
      slot: '0x0',
    }),
  ).resolves.toBe(
    '0x7761676d6900000000000000000000000000000000000000000000000000000a',
  )
})

test('parameters: chainId', async () => {
  await expect(
    getStorageAt(config, {
      address: address.wagmiMintExample,
      chainId: chain.optimism.id,
      slot: '0x0',
    }),
  ).resolves.toBe(
    '0x0000000000000000000000000000000000000000000000000000000000000000',
  )
})

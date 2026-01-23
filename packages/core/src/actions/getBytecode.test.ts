import { address, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBytecode } from './getBytecode.js'

test('default', async () => {
  await expect(
    getBytecode(config, {
      address: '0x0000000000000000000000000000000000000000',
    }),
  ).resolves.toBe(undefined)

  await expect(
    getBytecode(config, {
      address: address.wagmiMintExample,
    }),
  ).resolves.toMatch(/^0x.*/)
})

test('parameters: blockNumber', async () => {
  await expect(
    getBytecode(config, {
      address: address.wagmiMintExample,
      blockNumber: 15564163n,
    }),
  ).resolves.toBe(undefined)
})

test('parameters: blockTag', async () => {
  await expect(
    getBytecode(config, {
      address: address.wagmiMintExample,
      blockTag: 'earliest',
    }),
  ).resolves.toBe(undefined)
})

test('parameters: chainId', async () => {
  await expect(
    getBytecode(config, {
      address: address.wagmiMintExample,
      chainId: chain.optimism.id,
    }),
  ).resolves.toBe(undefined)
})

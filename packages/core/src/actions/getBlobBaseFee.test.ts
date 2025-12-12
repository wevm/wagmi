import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBlobBaseFee } from './getBlobBaseFee.js'

test('default', async () => {
  await expect(getBlobBaseFee(config)).resolves.toBe(1n)
})

test('parameters: chainId', async () => {
  await expect(
    getBlobBaseFee(config, { chainId: chain.mainnet2.id }),
  ).resolves.toBe(1n)
})

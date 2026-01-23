import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getBlobBaseFee } from './getBlobBaseFee.js'

test('default', async () => {
  await expect(getBlobBaseFee(config)).resolves.toBeTypeOf('bigint')
})

test('parameters: chainId', async () => {
  await expect(
    getBlobBaseFee(config, { chainId: config.chains[0].id }),
  ).resolves.toBeTypeOf('bigint')
})

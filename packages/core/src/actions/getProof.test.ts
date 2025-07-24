import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getProof } from './getProof.js'

test('default', async () => {
  await expect(
    getProof(config, {
      chainId: chain.optimism.id,
      address: '0x4200000000000000000000000000000000000016',
      storageKeys: [
        '0x4a932049252365b3eedbc5190e18949f2ec11f39d3bef2d259764799a1b27d99',
      ],
    }),
  ).resolves.toBeDefined()
})

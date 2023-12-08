import { chain, config, testClient } from '@wagmi/test'
import { expect, test } from 'vitest'

import { estimateMaxPriorityFeePerGas } from './estimateMaxPriorityFeePerGas.js'

test('default', async () => {
  await testClient.mainnet.resetFork()
  await expect(estimateMaxPriorityFeePerGas(config)).resolves.toBe(64972311962n)
})

test('parameters: chainId', async () => {
  await testClient.mainnet2.resetFork()
  await testClient.mainnet2.mine({ blocks: 1 })

  await expect(
    estimateMaxPriorityFeePerGas(config, {
      chainId: chain.mainnet2.id,
    }),
  ).resolves.toBe(56975772968n)
})

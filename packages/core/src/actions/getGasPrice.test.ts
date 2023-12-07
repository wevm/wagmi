import { chain, config, testClient } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getGasPrice } from './getGasPrice.js'

test('default', async () => {
  await testClient.mainnet.setNextBlockBaseFeePerGas({
    baseFeePerGas: 2_000_000_000n,
  })
  await expect(getGasPrice(config)).resolves.toBe(3000000000n)
})

test('parameters: chainId', async () => {
  await testClient.mainnet2.setNextBlockBaseFeePerGas({
    baseFeePerGas: 1_000_000_000n,
  })
  await testClient.mainnet2.mine({ blocks: 1 })
  await expect(
    getGasPrice(config, { chainId: chain.mainnet2.id }),
  ).resolves.toBe(1875000000n)
})

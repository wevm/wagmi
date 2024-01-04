import { abi, address, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { readContract } from './readContract.js'

test('default', async () => {
  await expect(
    readContract(config, {
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  ).resolves.toMatchInlineSnapshot('4n')
})

test('parameters: chainId', async () => {
  await expect(
    readContract(config, {
      address: address.wagmiMintExample,
      abi: abi.wagmiMintExample,
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
      chainId: chain.mainnet2.id,
    }),
  ).resolves.toMatchInlineSnapshot('4n')
})

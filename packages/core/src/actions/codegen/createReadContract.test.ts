import { abi, address, chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { createReadContract } from './createReadContract.js'

test('default', async () => {
  const readWagmiMintExample = createReadContract({
    address: address.wagmiMintExample,
    abi: abi.wagmiMintExample,
  })

  await expect(
    readWagmiMintExample(config, {
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  ).resolves.toMatchInlineSnapshot('10n')
})

test('multichain', async () => {
  const readWagmiMintExample = createReadContract({
    address: {
      [chain.mainnet.id]: address.wagmiMintExample,
      [chain.mainnet2.id]: address.wagmiMintExample,
    },
    abi: abi.wagmiMintExample,
  })

  await expect(
    readWagmiMintExample(config, {
      functionName: 'balanceOf',
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
      chainId: chain.mainnet2.id,
    }),
  ).resolves.toMatchInlineSnapshot('10n')
})

test('functionName', async () => {
  const readWagmiMintExampleBalanceOf = createReadContract({
    address: address.wagmiMintExample,
    abi: abi.wagmiMintExample,
    functionName: 'balanceOf',
  })

  await expect(
    readWagmiMintExampleBalanceOf(config, {
      args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
    }),
  ).resolves.toMatchInlineSnapshot('10n')
})

import { abi, address, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { multicall } from './multicall.js'

test('default', async () => {
  await expect(
    multicall(config, {
      contracts: [
        {
          address: address.wagmiMintExample,
          abi: abi.wagmiMintExample,
          functionName: 'balanceOf',
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        },
      ],
    }),
  ).resolves.toMatchInlineSnapshot(`
    [
      {
        "result": 4n,
        "status": "success",
      },
    ]
  `)
})

test('allowFailure', async () => {
  await expect(
    multicall(config, {
      allowFailure: false,
      contracts: [
        {
          address: address.wagmiMintExample,
          abi: abi.wagmiMintExample,
          functionName: 'balanceOf',
          args: ['0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC'],
        },
      ],
    }),
  ).resolves.toMatchInlineSnapshot(`
    [
      4n,
    ]
  `)
})

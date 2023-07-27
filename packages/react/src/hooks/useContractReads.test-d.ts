import { abi } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useContractReads } from './useContractReads.js'

test('select data', async () => {
  const result = useContractReads({
    allowFailure: false,
    contracts: [
      {
        address: '0x',
        abi: abi.erc20,
        functionName: 'balanceOf',
        args: ['0x'],
      },
      {
        address: '0x',
        abi: abi.wagmiMintExample,
        functionName: 'tokenURI',
        args: [123n],
      },
    ],
    select(data) {
      expectTypeOf(data).toEqualTypeOf<[bigint, string]>()
      return data[0]
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<bigint | undefined>()
})

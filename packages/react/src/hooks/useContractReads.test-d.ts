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
      // TODO: Breaks with typescript@5.1.6
      // @ts-ignore
      expectTypeOf(data).toEqualTypeOf<[bigint, string]>()
      return data[0]
    },
  })
  // TODO: Breaks with typescript@5.1.6
  // @ts-ignore
  expectTypeOf(result.data).toEqualTypeOf<bigint | undefined>()
})

import { typedData } from '@wagmi/test'
import type { Address } from 'viem'
import { expectTypeOf, test } from 'vitest'
import {
  type UseVerifyTypedDataParameters,
  useVerifyTypedData,
} from './useVerifyTypedData.js'

test('select data', () => {
  const result = useVerifyTypedData({
    query: {
      select(data) {
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<boolean | undefined>()
})

test('UseReadContractParameters', () => {
  type Result = UseVerifyTypedDataParameters<
    typeof typedData.basic.types,
    'Mail'
  >
  expectTypeOf<Pick<Result, 'message' | 'primaryType'>>().toEqualTypeOf<{
    primaryType?: 'Mail' | 'Person'
    message?: {
      from: {
        name: string
        wallet: Address
      }
      to: {
        name: string
        wallet: Address
      }
      contents: string
    }
  }>()
})

test('primaryType', async () => {
  useVerifyTypedData({
    address: '0x',
    ...typedData.basic,
    primaryType: 'Mail',
    signature: '0x',
  })
  useVerifyTypedData({
    address: '0x',
    ...typedData.basic,
    // @ts-expect-error
    primaryType: 'foobarbaz',
    signature: '0x',
  })
})

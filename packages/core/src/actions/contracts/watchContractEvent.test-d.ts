import type { ResolvedConfig } from 'abitype'
import { assertType, describe, expectTypeOf } from 'vitest'

import { mlootContractConfig } from '../../../test'
import { watchContractEvent } from './watchContractEvent'

describe('watchContractEvent', () => {
  watchContractEvent(
    {
      ...mlootContractConfig,
      eventName: 'Transfer',
    },
    (result) => {
      // ^?
      assertType<ResolvedConfig['AddressType']>(result)
    },
  )

  watchContractEvent(
    {
      address: '0x123',
      abi: [],
      // @ts-expect-error not a valid event name
      eventName: 'Transfer',
    },
    (result) => {
      // ^?
      assertType<unknown>(result)
    },
  )

  expectTypeOf(
    watchContractEvent<(typeof mlootContractConfig)['abi'], 'ApprovalForAll'>,
  )
    .parameter(0)
    .toHaveProperty('args')
    .toEqualTypeOf<
      | readonly [
          (`0x${string}` | null | undefined)?,
          (`0x${string}` | null | undefined)?,
          (null | undefined)?,
        ]
      | undefined
    >()
})

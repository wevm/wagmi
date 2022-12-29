import type { ResolvedConfig } from 'abitype'
import { assertType, describe } from 'vitest'

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
})

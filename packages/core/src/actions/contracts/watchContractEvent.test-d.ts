import type { Log } from 'viem'
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
      assertType<Log[]>(result)
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

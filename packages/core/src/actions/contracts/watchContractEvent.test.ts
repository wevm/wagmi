import { ResolvedConfig } from 'abitype'
import { describe, it } from 'vitest'

import { expectType, mlootContractConfig } from '../../../test'
import { watchContractEvent } from './watchContractEvent'

describe('watchContractEvent', () => {
  it.skip('types', () => {
    watchContractEvent(
      {
        ...mlootContractConfig,
        eventName: 'Transfer',
      },
      (result) => {
        // ^?
        expectType<ResolvedConfig['AddressType']>(result)
      },
    )

    watchContractEvent(
      {
        address: '0x123',
        abi: [],
        eventName: 'Transfer',
      },
      (result) => {
        // ^?
        expectType<unknown>(result)
      },
    )
  })
})

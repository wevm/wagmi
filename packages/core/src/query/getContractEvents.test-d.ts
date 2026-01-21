import { abi, config } from '@wagmi/test'
import { test } from 'vitest'

import { getContractEventsQueryOptions } from './getContractEvents.js'

test('default', () => {
  getContractEventsQueryOptions(config, {
    address: '0x',
    abi: abi.erc20,
    eventName: 'Transfer',
    args: {
      from: '0x',
      to: '0x',
    },
  })
  getContractEventsQueryOptions(config, {
    address: '0x',
    abi: abi.erc20,
    // @ts-expect-error
    eventName: 'Foo',
  })
  getContractEventsQueryOptions(config, {
    address: '0x',
    abi: abi.erc20,
    eventName: 'Transfer',
    args: {
      // @ts-expect-error
      foo: '0x',
      to: '0x',
    },
  })
})

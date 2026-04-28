import { abi, config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import {
  type GetContractEventsParameters,
  getContractEvents,
} from './getContractEvents.js'

test('default', async () => {
  const logs = await getContractEvents(config, {
    address: '0x',
    abi: abi.erc20,
    eventName: 'Transfer',
    args: {
      from: '0x',
      to: '0x',
    },
  })

  expectTypeOf(logs[0]!.eventName).toEqualTypeOf<'Transfer'>()
  expectTypeOf(logs[0]!.args).toEqualTypeOf<{
    from?: `0x${string}` | undefined
    to?: `0x${string}` | undefined
    value?: bigint | undefined
  }>()

  getContractEvents(config, {
    address: '0x',
    abi: abi.erc20,
    eventName: 'Transfer',
    args: {
      // @ts-expect-error
      foo: '0x',
      to: '0x',
    },
  })
  getContractEvents(config, {
    address: '0x',
    abi: abi.erc20,
    // @ts-expect-error
    eventName: 'Foo',
    args: {
      from: '0x',
      to: '0x',
    },
  })
})

test('behavior: strict', async () => {
  const logs = await getContractEvents(config, {
    address: '0x',
    abi: abi.erc20,
    strict: true,
    eventName: 'Transfer',
    args: {
      from: '0x',
      to: '0x',
    },
  })

  expectTypeOf(logs[0]!.eventName).toEqualTypeOf<'Transfer'>()
  expectTypeOf(logs[0]!.args).toEqualTypeOf<{
    from: `0x${string}`
    to: `0x${string}`
    value: bigint
  }>()
  expectTypeOf(logs[0]!.args).not.toEqualTypeOf<{
    from?: `0x${string}` | undefined
    to?: `0x${string}` | undefined
    value?: bigint | undefined
  }>()
})

test('behavior: no eventName', async () => {
  type Result = GetContractEventsParameters<
    typeof abi.erc20,
    undefined,
    true,
    undefined,
    undefined,
    typeof config
  >
  type Args = NonNullable<Result['args']>

  expectTypeOf([
    {
      from: '0x',
      to: '0x',
    },
    {
      owner: '0x',
      spender: '0x',
    },
  ]).toMatchTypeOf<Args[]>()

  // @ts-expect-error
  expectTypeOf({ foo: '0x' }).toEqualTypeOf<Args>()

  const logs = await getContractEvents(config, {
    address: '0x',
    abi: abi.erc20,
    args: {
      from: '0x',
      to: '0x',
    },
  })

  expectTypeOf(logs[0]!.eventName).toEqualTypeOf<'Transfer' | 'Approval'>()
  expectTypeOf(logs[0]!.args).toEqualTypeOf<
    | {
        from?: `0x${string}` | undefined
        to?: `0x${string}` | undefined
        value?: bigint | undefined
      }
    | {
        owner?: `0x${string}` | undefined
        spender?: `0x${string}` | undefined
        value?: bigint | undefined
      }
  >()
})

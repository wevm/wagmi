import { abi, type config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import {
  type UseContractEventsParameters,
  useContractEvents,
} from './useContractEvents.js'

test('default', () => {
  const result = useContractEvents({
    address: '0x',
    abi: abi.erc20,
    eventName: 'Transfer',
    args: {
      from: '0x',
      to: '0x',
    },
  })
  if (result.data) {
    expectTypeOf(result.data[0]!.eventName).toEqualTypeOf<'Transfer'>()
    expectTypeOf(result.data[0]!.args).toEqualTypeOf<{
      from?: `0x${string}` | undefined
      to?: `0x${string}` | undefined
      value?: bigint | undefined
    }>()
  }

  useContractEvents({
    address: '0x',
    abi: abi.erc20,
    // @ts-expect-error
    eventName: 'Foo',
    args: {
      from: '0x',
      to: '0x',
    },
  })
  useContractEvents({
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

test('behavior: strict', () => {
  const result = useContractEvents({
    address: '0x',
    abi: abi.erc20,
    strict: true,
    eventName: 'Transfer',
    args: {
      from: '0x',
      to: '0x',
    },
  })
  if (result.data) {
    expectTypeOf(result.data[0]!.eventName).toEqualTypeOf<'Transfer'>()
    expectTypeOf(result.data[0]!.args).toEqualTypeOf<{
      from: `0x${string}`
      to: `0x${string}`
      value: bigint
    }>()
    expectTypeOf(result.data[0]!.args).not.toEqualTypeOf<{
      from?: `0x${string}` | undefined
      to?: `0x${string}` | undefined
      value?: bigint | undefined
    }>()
  }
})

test('behavior: no eventName', () => {
  type Result = UseContractEventsParameters<
    typeof abi.erc20,
    undefined,
    true,
    undefined,
    undefined,
    typeof config
  >
  expectTypeOf<Result['args']>().toEqualTypeOf<
    | {
        from?: `0x${string}` | `0x${string}`[] | null | undefined
        to?: `0x${string}` | `0x${string}`[] | null | undefined
      }
    | {
        owner?: `0x${string}` | `0x${string}`[] | null | undefined
        spender?: `0x${string}` | `0x${string}`[] | null | undefined
      }
    | undefined
  >()

  const result = useContractEvents({
    address: '0x',
    abi: abi.erc20,
    args: {
      from: '0x',
      to: '0x',
    },
  })
  if (result.data) {
    expectTypeOf(result.data[0]!.eventName).toEqualTypeOf<
      'Transfer' | 'Approval'
    >()
    expectTypeOf(result.data[0]!.args).toEqualTypeOf<
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
  }
})

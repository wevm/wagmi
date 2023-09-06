import { abi } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useWatchContractEvent } from './useWatchContractEvent.js'

test('default', () => {
  useWatchContractEvent({
    address: '0x',
    abi: abi.erc20,
    eventName: 'Transfer',
    args: {
      from: '0x',
      to: '0x',
    },
    onLogs(logs) {
      expectTypeOf(logs[0]!.eventName).toEqualTypeOf<'Transfer'>()
      expectTypeOf(logs[0]!.args).toEqualTypeOf<{
        from?: `0x${string}` | undefined
        to?: `0x${string}` | undefined
        value?: bigint | undefined
      }>()
    },
  })
})

test('behavior: no eventName', () => {
  useWatchContractEvent({
    address: '0x',
    abi: abi.erc20,
    args: {
      from: '0x',
      to: '0x',
    },
    onLogs(logs) {
      expectTypeOf(logs[0]!.eventName).toEqualTypeOf<'Transfer' | 'Approval'>()
      expectTypeOf(logs[0]!.args).toEqualTypeOf<
        | Record<string, unknown>
        | readonly unknown[]
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
    },
  })
})

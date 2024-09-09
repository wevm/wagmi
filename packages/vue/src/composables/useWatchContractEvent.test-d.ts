import { http, createConfig, webSocket } from '@wagmi/core'
import { mainnet, optimism } from '@wagmi/core/chains'
import { abi } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useWatchContractEvent } from './useWatchContractEvent.js'

test('default', () => {
  useWatchContractEvent({
    address: '0x',
    abi: abi.erc20,
    eventName: 'Transfer',
    poll: false,
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
      // TODO: Figure out why this is not working
      // @ts-ignore
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

test('differing transports', () => {
  const config = createConfig({
    chains: [mainnet, optimism],
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: webSocket(),
    },
  })

  // TODO: Fix inference for `poll` (`DeepMaybeRef` wrapping `UseWatchContractEventParameters` not working as expected)
  // type Result = UseWatchContractEventParameters<
  //   typeof abi.erc20,
  //   'Transfer' | 'Approval',
  //   true,
  //   typeof config,
  //   typeof mainnet.id | typeof optimism.id
  // >
  // expectTypeOf<Result['poll']>().toEqualTypeOf<boolean | undefined>()
  useWatchContractEvent({
    config,
    poll: false,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  })

  // type Result2 = UseWatchContractEventParameters<
  //   typeof abi.erc20,
  //   'Transfer' | 'Approval',
  //   true,
  //   typeof config,
  //   typeof mainnet.id
  // >
  // expectTypeOf<Result2['poll']>().toEqualTypeOf<true | undefined>()
  useWatchContractEvent({
    config,
    chainId: mainnet.id,
    poll: true,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  })

  // type Result3 = UseWatchContractEventParameters<
  //   typeof abi.erc20,
  //   'Transfer' | 'Approval',
  //   true,
  //   typeof config,
  //   typeof optimism.id
  // >
  // expectTypeOf<Result3['poll']>().toEqualTypeOf<boolean | undefined>()
  useWatchContractEvent({
    config,
    chainId: optimism.id,
    poll: true,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  })
  useWatchContractEvent({
    config,
    chainId: optimism.id,
    poll: false,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  })
})

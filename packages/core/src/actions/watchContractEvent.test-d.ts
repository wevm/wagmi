import { abi, config } from '@wagmi/test'
import { http, webSocket } from 'viem'
import { mainnet, optimism } from 'viem/chains'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import {
  type WatchContractEventParameters,
  watchContractEvent,
} from './watchContractEvent.js'

test('default', () => {
  watchContractEvent(config, {
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
  type Result = WatchContractEventParameters<
    typeof abi.erc20,
    undefined,
    true,
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

  watchContractEvent(config, {
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

  type Result = WatchContractEventParameters<
    typeof abi.erc20,
    'Transfer' | 'Approval',
    true,
    typeof config,
    typeof mainnet.id | typeof optimism.id
  >
  expectTypeOf<Result['poll']>().toEqualTypeOf<boolean | undefined>()
  watchContractEvent(config, {
    poll: false,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  })

  type Result2 = WatchContractEventParameters<
    typeof abi.erc20,
    'Transfer' | 'Approval',
    true,
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result2['poll']>().toEqualTypeOf<true | undefined>()
  watchContractEvent(config, {
    chainId: mainnet.id,
    poll: true,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  })

  type Result3 = WatchContractEventParameters<
    typeof abi.erc20,
    'Transfer' | 'Approval',
    true,
    typeof config,
    typeof optimism.id
  >
  expectTypeOf<Result3['poll']>().toEqualTypeOf<boolean | undefined>()
  watchContractEvent(config, {
    chainId: optimism.id,
    poll: true,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  })
  watchContractEvent(config, {
    chainId: optimism.id,
    poll: false,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  })
})

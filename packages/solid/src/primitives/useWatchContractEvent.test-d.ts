import { createConfig, http, webSocket } from '@wagmi/core'
import { mainnet, optimism } from '@wagmi/core/chains'
import { abi } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { useWatchContractEvent } from './useWatchContractEvent.js'

type LogsOf<parameters> = parameters extends {
  onLogs?: ((logs: infer logs) => void) | undefined
}
  ? logs
  : never

test('default', () => {
  type Parameters = useWatchContractEvent.SolidParameters<
    typeof abi.erc20,
    'Transfer'
  >
  const logs = null as unknown as LogsOf<Parameters>
  const eventName: 'Transfer' = logs[0]!.eventName
  const args: {
    from?: `0x${string}` | undefined
    to?: `0x${string}` | undefined
    value?: bigint | undefined
  } = logs[0]!.args

  expectTypeOf(eventName).toEqualTypeOf<'Transfer'>()
  expectTypeOf(args).toEqualTypeOf<{
    from?: `0x${string}` | undefined
    to?: `0x${string}` | undefined
    value?: bigint | undefined
  }>()
})

test('behavior: no eventName', () => {
  type Parameters = useWatchContractEvent.SolidParameters<typeof abi.erc20>
  const logs = null as unknown as LogsOf<Parameters>
  const eventName: 'Transfer' | 'Approval' = logs[0]!.eventName
  const args:
    | {
        from?: `0x${string}` | undefined
        to?: `0x${string}` | undefined
        value?: bigint | undefined
      }
    | {
        owner?: `0x${string}` | undefined
        spender?: `0x${string}` | undefined
        value?: bigint | undefined
      } = logs[0]!.args

  expectTypeOf(eventName).toEqualTypeOf<'Transfer' | 'Approval'>()
  expectTypeOf(args).toEqualTypeOf<
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

test('differing transports', () => {
  const config = createConfig({
    chains: [mainnet, optimism],
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: webSocket(),
    },
  })

  type Result = useWatchContractEvent.SolidParameters<
    typeof abi.erc20,
    'Transfer' | 'Approval',
    true,
    typeof config,
    typeof mainnet.id | typeof optimism.id
  >
  expectTypeOf<Result['poll']>().toEqualTypeOf<boolean | undefined>()
  useWatchContractEvent(() => ({
    config,
    poll: false,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  }))

  type Result2 = useWatchContractEvent.SolidParameters<
    typeof abi.erc20,
    'Transfer' | 'Approval',
    true,
    typeof config,
    typeof mainnet.id
  >
  expectTypeOf<Result2['poll']>().toEqualTypeOf<true | undefined>()
  useWatchContractEvent(() => ({
    config,
    chainId: mainnet.id,
    poll: true,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  }))

  type Result3 = useWatchContractEvent.SolidParameters<
    typeof abi.erc20,
    'Transfer' | 'Approval',
    true,
    typeof config,
    typeof optimism.id
  >
  expectTypeOf<Result3['poll']>().toEqualTypeOf<boolean | undefined>()
  useWatchContractEvent(() => ({
    config,
    chainId: optimism.id,
    poll: true,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  }))
  useWatchContractEvent(() => ({
    config,
    chainId: optimism.id,
    poll: false,
    address: '0x',
    abi: abi.erc20,
    onLogs() {},
  }))
})

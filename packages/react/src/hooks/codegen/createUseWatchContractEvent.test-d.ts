import { createConfig, http, webSocket } from '@wagmi/core'
import { abi, mainnet, optimism } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'

import { createUseWatchContractEvent } from './createUseWatchContractEvent.js'

test('default', () => {
  const useWatchErc20Event = createUseWatchContractEvent({
    abi: abi.erc20,
  })

  useWatchErc20Event({
    eventName: 'Transfer',
    chainId: 123,
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

test('multichain address', () => {
  const useWatchErc20Event = createUseWatchContractEvent({
    abi: abi.erc20,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  useWatchErc20Event({
    eventName: 'Transfer',
    chainId: mainnet.id,
    // ^?
  })

  useWatchErc20Event({
    eventName: 'Transfer',
    // @ts-expect-error chain id must match address keys
    chainId: 420,
  })

  useWatchErc20Event({
    eventName: 'Transfer',
    // @ts-expect-error chain id must match address keys
    address: '0x',
  })
})

test('differing transports', () => {
  const useWatchErc20Event = createUseWatchContractEvent({
    abi: abi.erc20,
  })

  const config = createConfig({
    chains: [mainnet, optimism],
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: webSocket(),
    },
  })

  useWatchErc20Event({
    config,
    poll: false,
    address: '0x',
    onLogs() {},
  })

  useWatchErc20Event({
    config,
    chainId: mainnet.id,
    poll: true,
    address: '0x',
    onLogs() {},
  })
  useWatchErc20Event({
    config,
    chainId: mainnet.id,
    // @ts-expect-error poll required since http transport
    poll: false,
    address: '0x',
    onLogs() {},
  })

  useWatchErc20Event({
    config,
    chainId: optimism.id,
    poll: true,
    address: '0x',
    onLogs() {},
  })
  useWatchErc20Event({
    config,
    chainId: optimism.id,
    poll: false,
    address: '0x',
    onLogs() {},
  })
})

test('eventName', () => {
  const useWatchErc20Event = createUseWatchContractEvent({
    abi: abi.erc20,
    eventName: 'Transfer',
  })

  useWatchErc20Event({
    chainId: 123,
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

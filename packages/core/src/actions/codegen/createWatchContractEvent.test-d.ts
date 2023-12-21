import { abi, config, mainnet, optimism } from '@wagmi/test'
import { http, webSocket } from 'viem'
import { expectTypeOf, test } from 'vitest'

import { createConfig } from '../../createConfig.js'
import { createWatchContractEvent } from './createWatchContractEvent.js'

test('default', () => {
  const watchErc20Event = createWatchContractEvent({
    abi: abi.erc20,
  })

  watchErc20Event(config, {
    eventName: 'Transfer',
    chainId: 1,
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
  const watchErc20Event = createWatchContractEvent({
    abi: abi.erc20,
    address: {
      [mainnet.id]: '0x',
      [optimism.id]: '0x',
    },
  })

  watchErc20Event(config, {
    eventName: 'Transfer',
    chainId: mainnet.id,
    // ^?
    onLogs() {},
  })

  watchErc20Event(config, {
    eventName: 'Transfer',
    // @ts-expect-error chain id must match address keys
    chainId: 420,
    onLogs() {},
  })

  watchErc20Event(config, {
    eventName: 'Transfer',
    // @ts-expect-error chain id must match address keys
    address: '0x',
    onLogs() {},
  })
})

test('differing transports', () => {
  const watchErc20Event = createWatchContractEvent({
    abi: abi.erc20,
  })

  const config = createConfig({
    chains: [mainnet, optimism],
    transports: {
      [mainnet.id]: http(),
      [optimism.id]: webSocket(),
    },
  })

  watchErc20Event(config, {
    poll: false,
    address: '0x',
    onLogs() {},
  })

  watchErc20Event(config, {
    chainId: mainnet.id,
    poll: true,
    address: '0x',
    onLogs() {},
  })
  watchErc20Event(config, {
    config,
    chainId: mainnet.id,
    // @ts-expect-error poll required since http transport
    poll: false,
    address: '0x',
    onLogs() {},
  })

  watchErc20Event(config, {
    chainId: optimism.id,
    poll: true,
    address: '0x',
    onLogs() {},
  })
  watchErc20Event(config, {
    chainId: optimism.id,
    poll: false,
    address: '0x',
    onLogs() {},
  })
})

test('eventName', () => {
  const watchErc20Event = createWatchContractEvent({
    abi: abi.erc20,
    eventName: 'Transfer',
  })

  watchErc20Event(config, {
    chainId: 1,
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

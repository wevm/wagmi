import { abi, address, chain, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import type { WatchEventOnLogsParameter } from 'viem'
import { test } from 'vitest'

import { createUseWatchContractEvent } from './createUseWatchContractEvent.js'

test('default', async () => {
  const useWatchErc20Event = createUseWatchContractEvent({
    address: address.usdc,
    abi: abi.wagmiMintExample,
  })

  let logs: WatchEventOnLogsParameter = []
  renderHook(() =>
    useWatchErc20Event({
      eventName: 'Transfer',
      onLogs(next) {
        logs = logs.concat(next)
      },
    }),
  )
  await wait(500)
})

test('multichain', async () => {
  const useWatchErc20Event = createUseWatchContractEvent({
    address: {
      [chain.mainnet.id]: address.usdc,
      [chain.mainnet2.id]: address.usdc,
    },
    abi: abi.wagmiMintExample,
  })

  let logs: WatchEventOnLogsParameter = []
  renderHook(() =>
    useWatchErc20Event({
      eventName: 'Transfer',
      chainId: chain.mainnet2.id,
      onLogs(next) {
        logs = logs.concat(next)
      },
    }),
  )
  await wait(500)
})

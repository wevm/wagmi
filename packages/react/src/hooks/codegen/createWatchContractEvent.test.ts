import { abi, address, chain } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { type WatchEventOnLogsParameter } from 'viem'
import { test } from 'vitest'

import { createWatchContractEvent } from './createWatchContractEvent.js'

test('default', async () => {
  const useWatchErc20Event = createWatchContractEvent({
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
})

test('multichain', async () => {
  const useWatchErc20Event = createWatchContractEvent({
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
})

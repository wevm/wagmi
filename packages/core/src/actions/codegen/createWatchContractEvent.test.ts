import { abi, address, chain, config } from '@wagmi/test'
import { type WatchEventOnLogsParameter } from 'viem'
import { test } from 'vitest'

import { createWatchContractEvent } from './createWatchContractEvent.js'

test('default', async () => {
  const watchErc20Event = createWatchContractEvent({
    address: address.usdc,
    abi: abi.wagmiMintExample,
  })

  let logs: WatchEventOnLogsParameter = []
  const unwatch = watchErc20Event(config, {
    eventName: 'Transfer',
    onLogs(next) {
      logs = logs.concat(next)
    },
  })
  unwatch()
})

test('multichain', async () => {
  const watchErc20Event = createWatchContractEvent({
    address: {
      [chain.mainnet.id]: address.usdc,
      [chain.mainnet2.id]: address.usdc,
    },
    abi: abi.wagmiMintExample,
  })

  let logs: WatchEventOnLogsParameter = []
  const unwatch = watchErc20Event(config, {
    eventName: 'Transfer',
    chainId: chain.mainnet2.id,
    onLogs(next) {
      logs = logs.concat(next)
    },
  })
  unwatch()
})

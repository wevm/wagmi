import {
  abi,
  accounts,
  address,
  config,
  testClient,
  transactionHashRegex,
  wait,
} from '@wagmi/test'
import { createWalletClient, erc20Abi, http, parseEther } from 'viem'
import type { WatchEventOnLogsParameter } from 'viem/actions'
import { beforeEach, expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { readContract } from './readContract.js'
import { watchContractEvent } from './watchContractEvent.js'
import { writeContract } from './writeContract.js'

const connector = config.connectors[0]!

// TODO: Some test does not call disconnect after finishing. Remove once fixing it.
beforeEach(async () => {
  if (config.state.current) {
    const connection = config.state.connections.get(config.state.current)!
    const connector = connection.connector
    await disconnect(config, { connector })
  }
})

test('default', async () => {
  const data = await connect(config, { connector })
  const connectedAddress = data.accounts[0]

  // impersonate usdc holder account and transfer usdc to connected account
  await testClient.mainnet.impersonateAccount({ address: address.usdcHolder })
  await testClient.mainnet.setBalance({
    address: address.usdcHolder,
    value: 10000000000000000000000n,
  })
  await createWalletClient({
    account: address.usdcHolder,
    chain: testClient.mainnet.chain,
    transport: http(),
  }).writeContract({
    address: address.usdc,
    abi: abi.erc20,
    functionName: 'transfer',
    args: [connectedAddress, parseEther('10', 'gwei')],
  })
  await testClient.mainnet.mine({ blocks: 1 })
  await testClient.mainnet.stopImpersonatingAccount({
    address: address.usdcHolder,
  })

  const balance = await readContract(config, {
    address: address.usdc,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [connectedAddress],
  })
  expect(balance).toBeGreaterThan(0n)

  // start watching transfer events
  let logs: WatchEventOnLogsParameter = []
  const unwatch = watchContractEvent(config, {
    address: address.usdc,
    abi: abi.erc20,
    eventName: 'Transfer',
    onLogs(next) {
      logs = logs.concat(next)
    },
  })

  await writeContract(config, {
    address: address.usdc,
    abi: abi.erc20,
    functionName: 'transfer',
    args: [accounts[1], parseEther('1', 'gwei')],
  })

  await writeContract(config, {
    address: address.usdc,
    abi: abi.erc20,
    functionName: 'transfer',
    args: [accounts[3], parseEther('1', 'gwei')],
  })

  await testClient.mainnet.mine({ blocks: 1 })
  await testClient.mainnet.mine({ blocks: 1 })
  await wait(1000) // wait for events to be emitted

  unwatch()
  await wait(100)
  expect(logs.length).toBe(2)
  expect(logs[0]?.transactionHash).toMatch(transactionHashRegex)

  await disconnect(config, { connector })
})

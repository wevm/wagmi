import { connect, disconnect, readContract, writeContract } from '@wagmi/core'
import {
  abi,
  accounts,
  address,
  config,
  testClient,
  transactionHashRegex,
  wait,
} from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { createWalletClient, erc20Abi, http, parseEther } from 'viem'
import type { WatchEventOnLogsParameter } from 'viem/actions'
import { expect, test, vi } from 'vitest'

import { useWatchContractEvent } from './useWatchContractEvent.js'

const connector = config.connectors[0]!

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
  renderHook(() =>
    useWatchContractEvent({
      address: address.usdc,
      abi: abi.erc20,
      eventName: 'Transfer',
      onLogs(next) {
        logs = logs.concat(next)
      },
    }),
  )

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

  expect(logs.length).toBe(2)
  expect(logs[0]?.transactionHash).toMatch(transactionHashRegex)

  await disconnect(config, { connector })
  await wait(500)
})

test('behavior: uses latest callback after rerender', async () => {
  await connect(config, { connector })

  let logs1: WatchEventOnLogsParameter = []
  let logs2: WatchEventOnLogsParameter = []

  const { rerender } = await renderHook(
    (props) =>
      useWatchContractEvent({
        address: address.usdc,
        abi: abi.erc20,
        eventName: 'Transfer',
        onLogs: props?.callback,
      }),
    {
      initialProps: {
        callback: (next: WatchEventOnLogsParameter) => {
          logs1 = logs1.concat(next)
        },
      },
    },
  )

  await writeContract(config, {
    address: address.usdc,
    abi: abi.erc20,
    functionName: 'transfer',
    args: [accounts[1], parseEther('0.001', 'gwei')],
  })
  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => logs1.length >= 1, { timeout: 10_000 })

  rerender({
    callback: (next) => {
      logs2 = logs2.concat(next)
    },
  })

  await writeContract(config, {
    address: address.usdc,
    abi: abi.erc20,
    functionName: 'transfer',
    args: [accounts[1], parseEther('0.001', 'gwei')],
  })
  await testClient.mainnet.mine({ blocks: 1 })
  await vi.waitUntil(() => logs2.length >= 1, { timeout: 10_000 })

  expect(logs1.length).toBe(1)
  expect(logs2.length).toBeGreaterThanOrEqual(1)

  await disconnect(config, { connector })
})

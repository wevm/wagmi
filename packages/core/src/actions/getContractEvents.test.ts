import { abi, address, config, testClient } from '@wagmi/test'
import {
  createWalletClient,
  erc20Abi,
  getAddress,
  http,
  parseEther,
} from 'viem'
import { beforeEach, expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getContractEvents } from './getContractEvents.js'
import { readContract } from './readContract.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  if (config.state.current === connector.uid) {
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

  const walletClient = createWalletClient({
    account: address.usdcHolder,
    chain: testClient.mainnet.chain,
    transport: http(),
  })

  await walletClient.writeContract({
    address: address.usdc,
    abi: abi.erc20,
    functionName: 'transfer',
    args: [connectedAddress, parseEther('100', 'gwei')],
  })
  await walletClient.writeContract({
    address: address.usdc,
    abi: abi.erc20,
    functionName: 'approve',
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

  const [logs, approvalLogs, transferLogs] = await Promise.all([
    getContractEvents(config, {
      address: address.usdc,
      abi: abi.erc20,
    }),
    getContractEvents(config, {
      address: address.usdc,
      abi: abi.erc20,
      eventName: 'Approval',
    }),
    getContractEvents(config, {
      address: address.usdc,
      abi: abi.erc20,
      eventName: 'Transfer',
    }),
  ])
  expect(logs.length).toBe(2)
  expect(approvalLogs.length).toBe(1)
  expect(transferLogs.length).toBe(1)

  expect(logs[0]!.eventName).toEqual('Transfer')
  expect(logs[0]!.args).toEqual({
    from: getAddress(address.usdcHolder),
    to: getAddress(connectedAddress),
    value: parseEther('100', 'gwei'),
  })
  expect(logs[1]!.eventName).toEqual('Approval')
  expect(logs[1]!.args).toEqual({
    owner: getAddress(address.usdcHolder),
    spender: getAddress(connectedAddress),
    value: parseEther('10', 'gwei'),
  })
})

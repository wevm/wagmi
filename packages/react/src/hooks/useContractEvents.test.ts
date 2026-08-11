import { connect, disconnect, readContract } from '@wagmi/core'
import { abi, address, config, testClient } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import {
  createWalletClient,
  erc20Abi,
  getAddress,
  http,
  parseEther,
} from 'viem'
import { expect, test, vi } from 'vitest'
import { useContractEvents } from './useContractEvents.js'

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

  const { result } = await renderHook(() =>
    useContractEvents({
      address: address.usdc,
      abi: abi.erc20,
    }),
  )

  await vi.waitUntil(() => result.current.isSuccess, { timeout: 10_000 })

  const logs = result.current.data
  expect(logs![0]!.eventName).toEqual('Transfer')
  expect(logs![0]!.args).toEqual({
    from: getAddress(address.usdcHolder),
    to: getAddress(connectedAddress),
    value: parseEther('100', 'gwei'),
  })
  expect(logs![1]!.eventName).toEqual('Approval')
  expect(logs![1]!.args).toEqual({
    owner: getAddress(address.usdcHolder),
    spender: getAddress(connectedAddress),
    value: parseEther('10', 'gwei'),
  })

  await disconnect(config, { connector })
})

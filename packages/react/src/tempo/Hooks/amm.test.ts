import { accounts, addresses, config, renderHook } from '@wagmi/test/tempo'
import { type Address, parseUnits } from 'viem'
import { describe, expect, test, vi } from 'vitest'

import { useConnect } from '../../hooks/useConnect.js'
import * as hooks from './amm.js'
import * as tokenHooks from './token.js'

const account = accounts[0]

describe('usePool', () => {
  test('default', async () => {
    const { result } = await renderHook(() =>
      hooks.usePool({
        userToken: addresses.alphaUsd,
        validatorToken: '0x20c0000000000000000000000000000000000001',
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 10_000,
    })

    expect(result.current.data).toMatchInlineSnapshot(`
      {
        "reserveUserToken": 0n,
        "reserveValidatorToken": 0n,
        "totalSupply": 0n,
      }
    `)
  })

  test('reactivity: token parameters', async () => {
    let userToken: Address | undefined
    let validatorToken: Address | undefined

    const { result, rerender } = await renderHook(() =>
      hooks.usePool({
        userToken,
        validatorToken,
      }),
    )

    await vi.waitFor(() => result.current.fetchStatus === 'idle')

    // Should be disabled when tokens are undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false)

    // Set tokens
    userToken = addresses.alphaUsd
    validatorToken = '0x20c0000000000000000000000000000000000001'
    rerender()

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Should now be enabled and have data
    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBeDefined()
  })
})

describe('useLiquidityBalance', () => {
  test('default', async () => {
    const { result } = await renderHook(() =>
      hooks.useLiquidityBalance({
        address: account.address,
        userToken: addresses.alphaUsd,
        validatorToken: '0x20c0000000000000000000000000000000000001',
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5_000,
    })

    expect(result.current.data).toMatchInlineSnapshot('0n')
  })

  test('reactivity: poolId and address parameters', async () => {
    let userToken: Address | undefined
    let validatorToken: Address | undefined
    let address: Address | undefined

    const { result, rerender } = await renderHook(() =>
      hooks.useLiquidityBalance({
        userToken,
        validatorToken,
        address,
      }),
    )

    await vi.waitFor(() => result.current.fetchStatus === 'idle')

    // Should be disabled when parameters are undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false)

    // Set parameters
    userToken = addresses.alphaUsd
    validatorToken = '0x20c0000000000000000000000000000000000001'
    address = account.address
    rerender()

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Should now be enabled and have data
    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBeDefined()
  })
})

describe('useMintSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: tokenHooks.useCreateSync(),
      grantRolesSync: tokenHooks.useGrantRolesSync(),
      mintTokenSync: tokenHooks.useMintSync(),
      mintSync: hooks.useMintSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token for testing
    const { token } = await result.current.createSync.mutateAsync({
      name: 'Test Token',
      symbol: 'TEST',
      currency: 'USD',
    })

    // Grant issuer role to mint tokens
    await result.current.grantRolesSync.mutateAsync({
      token,
      roles: ['issuer'],
      to: account.address,
    })

    // Mint some tokens to account
    await result.current.mintTokenSync.mutateAsync({
      to: account.address,
      amount: parseUnits('1000', 6),
      token,
    })

    // Add liquidity to pool
    const data = await result.current.mintSync.mutateAsync({
      userTokenAddress: token,
      validatorTokenAddress: addresses.alphaUsd,
      validatorTokenAmount: parseUnits('100', 6),
      to: account.address,
    })

    await vi.waitFor(() =>
      expect(result.current.mintSync.isSuccess).toBeTruthy(),
    )

    expect(data.receipt).toBeDefined()
    expect(data.amountValidatorToken).toBe(parseUnits('100', 6))
  })
})

describe.skip('useBurnSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: tokenHooks.useCreateSync(),
      grantRolesSync: tokenHooks.useGrantRolesSync(),
      mintTokenSync: tokenHooks.useMintSync(),
      mintSync: hooks.useMintSync(),
      burnSync: hooks.useBurnSync(),
      transferSync: tokenHooks.useTransferSync(),
      getLiquidityBalance: hooks.useLiquidityBalance,
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token for testing
    const { token } = await result.current.createSync.mutateAsync({
      name: 'Test Token 5',
      symbol: 'TEST5',
      currency: 'USD',
    })

    // Grant issuer role to mint tokens
    await result.current.grantRolesSync.mutateAsync({
      token,
      roles: ['issuer'],
      to: account.address,
    })

    // Mint some tokens to account
    await result.current.mintTokenSync.mutateAsync({
      to: account.address,
      amount: parseUnits('1000', 6),
      token,
    })

    // Add liquidity to pool
    await result.current.mintSync.mutateAsync({
      userTokenAddress: token,
      validatorTokenAddress: addresses.alphaUsd,
      validatorTokenAmount: parseUnits('100', 6),
      to: account.address,
    })

    // TODO(TEMPO-1183): Remove this janky fix to get some user token in the pool
    await result.current.transferSync.mutateAsync({
      to: '0x30D861999070Ae03B9548501DBd573E11A9f59Ee',
      amount: 600n,
      token: token,
      feeToken: token,
    })

    // Get LP balance before burn
    const { result: balanceResult } = await renderHook(() =>
      result.current.getLiquidityBalance({
        userToken: token,
        validatorToken: addresses.alphaUsd,
        address: account.address,
      }),
    )

    await vi.waitFor(() => expect(balanceResult.current.isSuccess).toBeTruthy())

    const lpBalanceBefore = balanceResult.current.data!

    // Burn half of LP tokens
    const data = await result.current.burnSync.mutateAsync({
      userToken: token,
      validatorToken: addresses.alphaUsd,
      liquidity: lpBalanceBefore / 2n,
      to: account.address,
    })

    await vi.waitFor(() =>
      expect(result.current.burnSync.isSuccess).toBeTruthy(),
    )

    expect(data.receipt).toBeDefined()
    expect(data.liquidity).toBe(lpBalanceBefore / 2n)
  })
})

describe.skip('useRebalanceSwapSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: tokenHooks.useCreateSync(),
      grantRolesSync: tokenHooks.useGrantRolesSync(),
      mintTokenSync: tokenHooks.useMintSync(),
      mintSync: hooks.useMintSync(),
      transferSync: tokenHooks.useTransferSync(),
      rebalanceSwapSync: hooks.useRebalanceSwapSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token for testing
    const { token } = await result.current.createSync.mutateAsync({
      name: 'Test Token 6',
      symbol: 'TEST6',
      currency: 'USD',
    })

    // Grant issuer role to mint tokens
    await result.current.grantRolesSync.mutateAsync({
      token,
      roles: ['issuer'],
      to: account.address,
    })

    // Mint some tokens to account
    await result.current.mintTokenSync.mutateAsync({
      to: account.address,
      amount: parseUnits('1000', 6),
      token,
    })

    // Add liquidity to pool
    await result.current.mintSync.mutateAsync({
      userTokenAddress: token,
      validatorTokenAddress: addresses.alphaUsd,
      validatorTokenAmount: parseUnits('100', 6),
      to: account.address,
    })

    // TODO(TEMPO-1183): Remove this janky fix to get some user token in the pool
    await result.current.transferSync.mutateAsync({
      to: '0x30D861999070Ae03B9548501DBd573E11A9f59Ee',
      amount: 600n,
      token: token,
      feeToken: token,
    })

    const account2 = accounts[1]

    // Perform rebalance swap
    const data = await result.current.rebalanceSwapSync.mutateAsync({
      userToken: token,
      validatorToken: addresses.alphaUsd,
      amountOut: 100n,
      to: account2.address,
    })

    await vi.waitFor(() =>
      expect(result.current.rebalanceSwapSync.isSuccess).toBeTruthy(),
    )

    expect(data.receipt).toBeDefined()
    expect(data.amountOut).toBe(100n)
    expect(data.swapper).toBe(account.address)
  })
})

describe.skip('useWatchRebalanceSwap', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: tokenHooks.useCreateSync(),
      grantRolesSync: tokenHooks.useGrantRolesSync(),
      mintTokenSync: tokenHooks.useMintSync(),
      mintSync: hooks.useMintSync(),
      transferSync: tokenHooks.useTransferSync(),
      rebalanceSwapSync: hooks.useRebalanceSwapSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token for testing
    const { token } = await connectResult.current.createSync.mutateAsync({
      name: 'Test Token 3',
      symbol: 'TEST3',
      currency: 'USD',
    })

    // Grant issuer role to mint tokens
    await connectResult.current.grantRolesSync.mutateAsync({
      token,
      roles: ['issuer'],
      to: account.address,
    })

    // Mint some tokens to account
    await connectResult.current.mintTokenSync.mutateAsync({
      to: account.address,
      amount: parseUnits('1000', 6),
      token,
    })

    // Add liquidity to pool
    await connectResult.current.mintSync.mutateAsync({
      userTokenAddress: token,
      validatorTokenAddress: addresses.alphaUsd,
      validatorTokenAmount: parseUnits('100', 6),
      to: account.address,
    })

    // TODO(TEMPO-1183): Remove this janky fix to get some user token in the pool
    await connectResult.current.transferSync.mutateAsync({
      to: '0x30D861999070Ae03B9548501DBd573E11A9f59Ee',
      amount: 600n,
      token: token,
      feeToken: token,
    })

    const events: any[] = []
    await renderHook(() =>
      hooks.useWatchRebalanceSwap({
        onRebalanceSwap(args) {
          events.push(args)
        },
      }),
    )

    const account2 = accounts[1]

    // Perform rebalance swap
    await connectResult.current.rebalanceSwapSync.mutateAsync({
      userToken: token,
      validatorToken: addresses.alphaUsd,
      amountOut: 100n,
      to: account2.address,
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.userToken.toLowerCase()).toBe(token.toLowerCase())
    expect(events[0]?.validatorToken.toLowerCase()).toBe(
      addresses.alphaUsd.toLowerCase(),
    )
    expect(events[0]?.amountOut).toBe(100n)
  })
})

describe('useWatchMint', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: tokenHooks.useCreateSync(),
      grantRolesSync: tokenHooks.useGrantRolesSync(),
      mintTokenSync: tokenHooks.useMintSync(),
      mintSync: hooks.useMintSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token for testing
    const { token } = await connectResult.current.createSync.mutateAsync({
      name: 'Test Token 2',
      symbol: 'TEST2',
      currency: 'USD',
    })

    // Grant issuer role to mint tokens
    await connectResult.current.grantRolesSync.mutateAsync({
      token,
      roles: ['issuer'],
      to: account.address,
    })

    // Mint some tokens to account
    await connectResult.current.mintTokenSync.mutateAsync({
      to: account.address,
      amount: parseUnits('1000', 6),
      token,
    })

    const events: any[] = []
    await renderHook(() =>
      hooks.useWatchMint({
        onMint(args) {
          events.push(args)
        },
      }),
    )

    // Add liquidity to pool
    await connectResult.current.mintSync.mutateAsync({
      userTokenAddress: token,
      validatorTokenAddress: addresses.alphaUsd,
      validatorTokenAmount: parseUnits('100', 6),
      to: account.address,
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.userToken.address.toLowerCase()).toBe(token.toLowerCase())
    expect(events[0]?.validatorToken.address.toLowerCase()).toBe(
      addresses.alphaUsd.toLowerCase(),
    )
    expect(events[0]?.validatorToken.amount).toBe(parseUnits('100', 6))
  })
})

describe.skip('useWatchBurn', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: tokenHooks.useCreateSync(),
      grantRolesSync: tokenHooks.useGrantRolesSync(),
      mintTokenSync: tokenHooks.useMintSync(),
      mintSync: hooks.useMintSync(),
      burnSync: hooks.useBurnSync(),
      transferSync: tokenHooks.useTransferSync(),
      getLiquidityBalance: hooks.useLiquidityBalance,
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token for testing
    const { token } = await connectResult.current.createSync.mutateAsync({
      name: 'Test Token 4',
      symbol: 'TEST4',
      currency: 'USD',
    })

    // Grant issuer role to mint tokens
    await connectResult.current.grantRolesSync.mutateAsync({
      token,
      roles: ['issuer'],
      to: account.address,
    })

    // Mint some tokens to account
    await connectResult.current.mintTokenSync.mutateAsync({
      to: account.address,
      amount: parseUnits('1000', 6),
      token,
    })

    // Add liquidity to pool
    await connectResult.current.mintSync.mutateAsync({
      userTokenAddress: token,
      validatorTokenAddress: addresses.alphaUsd,
      validatorTokenAmount: parseUnits('100', 6),
      to: account.address,
    })

    // TODO(TEMPO-1183): Remove this janky fix to get some user token in the pool
    await connectResult.current.transferSync.mutateAsync({
      to: '0x30D861999070Ae03B9548501DBd573E11A9f59Ee',
      amount: 600n,
      token: token,
      feeToken: token,
    })

    // Get LP balance
    const { result: balanceResult } = await renderHook(() =>
      connectResult.current.getLiquidityBalance({
        userToken: token,
        validatorToken: addresses.alphaUsd,
        address: account.address,
      }),
    )

    await vi.waitFor(() => expect(balanceResult.current.isSuccess).toBeTruthy())

    const lpBalance = balanceResult.current.data!

    const events: any[] = []
    await renderHook(() =>
      hooks.useWatchBurn({
        onBurn(args) {
          events.push(args)
        },
      }),
    )

    // Burn LP tokens
    await connectResult.current.burnSync.mutateAsync({
      userToken: token,
      validatorToken: addresses.alphaUsd,
      liquidity: lpBalance / 2n,
      to: account.address,
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.userToken.toLowerCase()).toBe(token.toLowerCase())
    expect(events[0]?.validatorToken.toLowerCase()).toBe(
      addresses.alphaUsd.toLowerCase(),
    )
    expect(events[0]?.liquidity).toBe(lpBalance / 2n)
  })
})

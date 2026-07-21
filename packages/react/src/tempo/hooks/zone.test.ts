import { disconnect } from '@wagmi/core'
import { accounts } from '@wagmi/test/tempo'
import {
  authorize,
  config,
  context,
  depositAndWait,
  parentChain,
  renderHook,
  setupZoneBalance,
  zoneChain,
  zoneId,
  zoneStorage,
} from '@wagmi/test/tempo/zone'
import { Addresses, Storage } from 'viem/tempo'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { useConnect } from '../../hooks/useConnect.js'
import * as zoneHooks from './zone.js'

const revealTo =
  '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798' as const
const depositToken = Addresses.pathUsd

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

describe('useSignAuthorizationToken', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      signAuthorizationToken: zoneHooks.useSignAuthorizationToken(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const result_ = await result.current.signAuthorizationToken.mutateAsync({
      chainId: zoneChain.id,
      storage: zoneStorage,
      zoneId,
    })
    expect(await zoneStorage.getItem(`auth:token:${zoneChain.id}`)).toBe(
      result_.token,
    )
  })

  test('parameters: storage', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      signAuthorizationToken: zoneHooks.useSignAuthorizationToken(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const storage = Storage.memory()
    const result_ = await result.current.signAuthorizationToken.mutateAsync({
      chainId: zoneChain.id,
      storage,
      zoneId,
    })
    expect(await storage.getItem(`auth:token:${zoneChain.id}`)).toBe(
      result_.token,
    )
  })
})

describe('useDeposit', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      deposit: zoneHooks.useDeposit(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const hash = await result.current.deposit.mutateAsync({
      amount: 123_000n,
      chainId: parentChain.id,
      token: depositToken,
      zoneId,
    })

    expect(hash).toBeDefined()
  })
})

describe('useDepositSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      deposit: zoneHooks.useDepositSync(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const data = await result.current.deposit.mutateAsync({
      amount: 456_000n,
      chainId: parentChain.id,
      token: depositToken,
      zoneId,
    })

    expect(data.receipt.status).toBe('success')
  })
})

describe('useEncryptedDeposit', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      deposit: zoneHooks.useEncryptedDeposit(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const hash = await result.current.deposit.mutateAsync({
      amount: 123_000n,
      chainId: parentChain.id,
      token: depositToken,
      zoneId,
    })

    expect(hash).toBeDefined()
  })
})

describe('useEncryptedDepositSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      deposit: zoneHooks.useEncryptedDepositSync(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const data = await result.current.deposit.mutateAsync({
      amount: 456_000n,
      chainId: parentChain.id,
      token: depositToken,
      zoneId,
    })

    expect(data.receipt.status).toBe('success')
  })
})

describe('useRequestWithdrawal', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      requestWithdrawal: zoneHooks.useRequestWithdrawal(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const amount = 123_000n
    const token = await setupZoneBalance(amount)
    const hash = await result.current.requestWithdrawal.mutateAsync({
      amount,
      chainId: zoneChain.id,
      token,
    })

    expect(hash).toBeDefined()
  })
})

describe('useRequestWithdrawalSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      requestWithdrawal: zoneHooks.useRequestWithdrawalSync(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const amount = 456_000n
    const token = await setupZoneBalance(amount)
    const data = await result.current.requestWithdrawal.mutateAsync({
      amount,
      chainId: zoneChain.id,
      token,
    })

    expect(data.receipt.status).toBe('success')
  })
})

describe('useRequestVerifiableWithdrawal', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      requestWithdrawal: zoneHooks.useRequestVerifiableWithdrawal(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const amount = 123_000n
    const token = await setupZoneBalance(amount)
    const hash = await result.current.requestWithdrawal.mutateAsync({
      amount,
      chainId: zoneChain.id,
      revealTo,
      token,
    })

    expect(hash).toBeDefined()
  })
})

describe('useRequestVerifiableWithdrawalSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      requestWithdrawal: zoneHooks.useRequestVerifiableWithdrawalSync(),
    }))

    await result.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })

    const amount = 456_000n
    const token = await setupZoneBalance(amount)
    const data = await result.current.requestWithdrawal.mutateAsync({
      amount,
      chainId: zoneChain.id,
      revealTo,
      token,
    })

    expect(data.receipt.status).toBe('success')
  })
})

describe('useZoneInfo', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      signAuthorizationToken: zoneHooks.useSignAuthorizationToken(),
    }))

    await connectResult.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })
    await connectResult.current.signAuthorizationToken.mutateAsync({
      chainId: zoneChain.id,
      storage: zoneStorage,
      zoneId,
    })

    const { result } = await renderHook(() =>
      zoneHooks.useZoneInfo({ chainId: zoneChain.id }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toMatchObject({
      chainId: context.chainId,
      zoneId,
    })
    expect(result.current.data?.zoneTokens.length).toBeGreaterThan(0)
  })
})

describe('useWaitForTempoBlock', () => {
  test('default', async () => {
    const { receipt } = await depositAndWait(123_000n)

    const { result } = await renderHook(() =>
      zoneHooks.useWaitForTempoBlock({
        chainId: zoneChain.id,
        tempoBlockNumber: receipt.blockNumber,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.tempoBlockNumber).toBeGreaterThanOrEqual(
      receipt.blockNumber,
    )
  })

  test('reactivity: tempoBlockNumber parameter', async () => {
    const { receipt } = await depositAndWait(123_000n)

    const { result, rerender } = await renderHook(
      (props) =>
        zoneHooks.useWaitForTempoBlock({
          chainId: zoneChain.id,
          tempoBlockNumber: props?.tempoBlockNumber,
        }),
      {
        initialProps: { tempoBlockNumber: undefined as bigint | undefined },
      },
    )

    expect(result.current.data).toBeUndefined()
    expect(result.current.isSuccess).toBe(false)

    rerender({ tempoBlockNumber: receipt.blockNumber })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.tempoBlockNumber).toBeGreaterThanOrEqual(
      receipt.blockNumber,
    )
  })
})

describe('useAuthorizationTokenInfo', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      signAuthorizationToken: zoneHooks.useSignAuthorizationToken(),
    }))

    await connectResult.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })
    const expiresAt = Math.floor(Date.now() / 1000) + 300
    await connectResult.current.signAuthorizationToken.mutateAsync({
      chainId: zoneChain.id,
      expiresAt,
      storage: zoneStorage,
      zoneId,
    })

    const { result } = await renderHook(() =>
      zoneHooks.useAuthorizationTokenInfo({ chainId: zoneChain.id }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.account.toLowerCase()).toBe(
      accounts[0].address.toLowerCase(),
    )
    expect(result.current.data?.expiresAt).toBe(BigInt(expiresAt))
  })
})

describe('useWithdrawalFee', () => {
  test('default', async () => {
    await authorize()
    const { result } = await renderHook(() =>
      zoneHooks.useWithdrawalFee({ chainId: zoneChain.id }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBeGreaterThanOrEqual(0n)
  })

  test('parameters: callbackGas', async () => {
    await authorize()
    const { result } = await renderHook(() =>
      zoneHooks.useWithdrawalFee({
        callbackGas: 21_000n,
        chainId: zoneChain.id,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBeGreaterThanOrEqual(0n)
  })
})

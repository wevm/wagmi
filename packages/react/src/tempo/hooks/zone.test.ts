import { disconnect } from '@wagmi/core'
import {
  accounts,
  config,
  renderHook,
  setupToken,
  tempoLocal,
  zoneDepositStatus,
  zoneInfo,
  zoneLocal,
  zoneStorage,
} from '@wagmi/test/tempo'
import { Storage } from 'viem/tempo'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'

import { useConnect } from '../../hooks/useConnect.js'
import * as zoneHooks from './zone.js'

const revealTo =
  '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798' as const
let depositToken: Awaited<ReturnType<typeof setupToken>>['token']

beforeAll(async () => {
  ;({ token: depositToken } = await setupToken())
  await disconnect(config).catch(() => {})
})

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
      chainId: zoneLocal.id,
      storage: zoneStorage,
    })
    expect(await zoneStorage.getItem(`auth:token:${zoneLocal.id}`)).toBe(
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
      chainId: zoneLocal.id,
      storage,
    })
    expect(await storage.getItem(`auth:token:${zoneLocal.id}`)).toBe(
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
      chainId: tempoLocal.id,
      token: depositToken,
      zoneId: zoneInfo.zoneId,
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
      chainId: tempoLocal.id,
      token: depositToken,
      zoneId: zoneInfo.zoneId,
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
      chainId: tempoLocal.id,
      token: depositToken,
      zoneId: zoneInfo.zoneId,
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
      chainId: tempoLocal.id,
      token: depositToken,
      zoneId: zoneInfo.zoneId,
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

    const hash = await result.current.requestWithdrawal.mutateAsync({
      amount: 123_000n,
      chainId: zoneLocal.id,
      token: zoneInfo.zoneTokens[0],
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

    const data = await result.current.requestWithdrawal.mutateAsync({
      amount: 456_000n,
      chainId: zoneLocal.id,
      token: zoneInfo.zoneTokens[0],
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

    const hash = await result.current.requestWithdrawal.mutateAsync({
      amount: 123_000n,
      chainId: zoneLocal.id,
      revealTo,
      token: zoneInfo.zoneTokens[0],
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

    const data = await result.current.requestWithdrawal.mutateAsync({
      amount: 456_000n,
      chainId: zoneLocal.id,
      revealTo,
      token: zoneInfo.zoneTokens[0],
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
      chainId: zoneLocal.id,
      storage: zoneStorage,
    })

    const { result } = await renderHook(() =>
      zoneHooks.useZoneInfo({ chainId: zoneLocal.id }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toEqual(zoneInfo)
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
    await connectResult.current.signAuthorizationToken.mutateAsync({
      chainId: zoneLocal.id,
      expiresAt: 1_700_000_000,
      storage: zoneStorage,
    })

    const { result } = await renderHook(() =>
      zoneHooks.useAuthorizationTokenInfo({ chainId: zoneLocal.id }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toEqual({
      account: accounts[0].address,
      expiresAt: 1_700_000_000n,
    })
  })
})

describe('useDepositStatus', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      signAuthorizationToken: zoneHooks.useSignAuthorizationToken(),
    }))

    await connectResult.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })
    await connectResult.current.signAuthorizationToken.mutateAsync({
      chainId: zoneLocal.id,
      storage: zoneStorage,
    })

    const { result } = await renderHook(() =>
      zoneHooks.useDepositStatus({
        chainId: zoneLocal.id,
        tempoBlockNumber: zoneDepositStatus.tempoBlockNumber,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toEqual(zoneDepositStatus)
  })

  test('reactivity: tempoBlockNumber parameter', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      signAuthorizationToken: zoneHooks.useSignAuthorizationToken(),
    }))

    await connectResult.current.connect.connectAsync({
      connector: config.connectors[0]!,
    })
    await connectResult.current.signAuthorizationToken.mutateAsync({
      chainId: zoneLocal.id,
      storage: zoneStorage,
    })

    const { result, rerender } = await renderHook(
      (props) =>
        zoneHooks.useDepositStatus({
          chainId: zoneLocal.id,
          tempoBlockNumber: props?.tempoBlockNumber,
        }),
      {
        initialProps: { tempoBlockNumber: undefined as bigint | undefined },
      },
    )

    expect(result.current.data).toBeUndefined()
    expect(result.current.isSuccess).toBe(false)

    rerender({ tempoBlockNumber: zoneDepositStatus.tempoBlockNumber })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toEqual(zoneDepositStatus)
  })
})

describe('useWithdrawalFee', () => {
  test('default', async () => {
    const { result } = await renderHook(() =>
      zoneHooks.useWithdrawalFee({ chainId: zoneLocal.id }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBe(1_000n)
  })

  test('parameters: gas', async () => {
    const { result } = await renderHook(() =>
      zoneHooks.useWithdrawalFee({
        chainId: zoneLocal.id,
        gas: 21_000n,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBe(22_000n)
  })
})

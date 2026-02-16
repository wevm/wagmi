import { accounts, addresses, config, renderHook } from '@wagmi/test/tempo'
import { type Address, parseUnits } from 'viem'
import { describe, expect, test, vi } from 'vitest'

import { useConnect } from '../../hooks/useConnect.js'
import * as hooks from './token.js'

const account = accounts[0]
const account2 = accounts[1]

describe('useGetAllowance', () => {
  test('default', async () => {
    const { result } = await renderHook(() =>
      hooks.useGetAllowance({
        account: account.address,
        spender: account2.address,
        token: addresses.alphaUsd,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy(), {
      timeout: 5000,
    })

    expect(result.current.data).toBeDefined()
    expect(typeof result.current.data).toBe('bigint')
  })

  test('reactivity: account parameter', async () => {
    const { result, rerender } = await renderHook(
      (props) =>
        hooks.useGetAllowance({
          account: props?.account,
          spender: props?.spender,
          token: addresses.alphaUsd,
        }),
      {
        initialProps: {
          account: undefined as Address | undefined,
          spender: undefined as Address | undefined,
        },
      },
    )

    await vi.waitFor(() => expect(result.current.fetchStatus).toBe('idle'))

    // Should be disabled when account or spender is undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false)

    // Set account but not spender
    rerender({ account: account.address, spender: undefined })

    await vi.waitFor(() => expect(result.current.fetchStatus).toBe('idle'))

    // Still disabled when spender is undefined
    // expect(result.current.isEnabled).toBe(false)

    // Set spender
    rerender({ account: account.address, spender: account2.address })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Should now be enabled and have data
    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBeDefined()
    expect(typeof result.current.data).toBe('bigint')
  })
})

describe('useGetBalance', () => {
  test('default', async () => {
    const { result } = await renderHook(() =>
      hooks.useGetBalance({
        account: account.address,
        token: addresses.alphaUsd,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBeDefined()
    expect(typeof result.current.data).toBe('bigint')
    expect(result.current.data).toBeGreaterThan(0n)
  })

  test('reactivity: account parameter', async () => {
    const { result, rerender } = await renderHook(
      (props) =>
        hooks.useGetBalance({
          account: props?.account,
          token: addresses.alphaUsd,
        }),
      {
        initialProps: {
          account: undefined as Address | undefined,
        },
      },
    )

    await vi.waitFor(() => expect(result.current.fetchStatus).toBe('idle'))

    // Should be disabled when account is undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false)

    // Set account
    rerender({ account: account.address })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Should now be enabled and have data
    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBeDefined()
    expect(typeof result.current.data).toBe('bigint')
    expect(result.current.data).toBeGreaterThan(0n)
  })
})

describe('useGetMetadata', () => {
  test('default', async () => {
    const { result } = await renderHook(() =>
      hooks.useGetMetadata({
        token: addresses.alphaUsd,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBeDefined()
    expect(result.current.data?.name).toBeDefined()
    expect(result.current.data?.symbol).toBeDefined()
    expect(result.current.data?.decimals).toBeDefined()
  })
})

describe('useGetRoleAdmin', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a token where we're the admin
    const createData = await connectResult.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'GetRoleAdmin Hook Test',
      symbol: 'GRAHTEST',
    })

    const { result } = await renderHook(() =>
      hooks.useGetRoleAdmin({
        token: createData.token,
        role: 'issuer',
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBeDefined()
    expect(typeof result.current.data).toBe('string')
  })
})

describe('useHasRole', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a token where we're the admin
    const createData = await connectResult.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'HasRole Hook Test',
      symbol: 'HRHTEST',
    })

    const { result } = await renderHook(() =>
      hooks.useHasRole({
        account: account.address,
        token: createData.token,
        role: 'defaultAdmin',
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBe(true)
  })

  test('reactivity: account parameter', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a token where we're the admin
    const createData = await connectResult.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'HasRole Hook Reactivity Test',
      symbol: 'HRHRTEST',
    })

    const { result, rerender } = await renderHook(
      (props) =>
        hooks.useHasRole({
          account: props?.account,
          token: createData.token,
          role: 'defaultAdmin',
        }),
      {
        initialProps: {
          account: undefined as Address | undefined,
        },
      },
    )

    await vi.waitFor(() => expect(result.current.fetchStatus).toBe('idle'))

    // Should be disabled when account is undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false)

    // Set account
    rerender({ account: account.address })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Should now be enabled and have data
    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBe(true)
  })
})

describe('useApproveSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      approve: hooks.useApproveSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    const data = await result.current.approve.mutateAsync({
      spender: account2.address,
      amount: parseUnits('100', 6),
      token: addresses.alphaUsd,
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.approve.isSuccess).toBeTruthy(),
    )
  })
})

describe('useBurnSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      grantRolesSync: hooks.useGrantRolesSync(),
      mintSync: hooks.useMintSync(),
      burn: hooks.useBurnSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Burnable Hook Token Sync',
      symbol: 'BURNHOOKSYNC',
    })

    // Grant issuer role
    await result.current.grantRolesSync.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })

    // Mint some tokens
    await result.current.mintSync.mutateAsync({
      token: tokenAddr,
      to: account.address,
      amount: parseUnits('1000', 6),
    })

    const data = await result.current.burn.mutateAsync({
      token: tokenAddr,
      amount: parseUnits('1', 6),
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()

    await vi.waitFor(() => expect(result.current.burn.isSuccess).toBeTruthy())
  })
})

describe('useChangeTransferPolicySync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      changeTransferPolicy: hooks.useChangeTransferPolicySync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Policy Hook Token Sync',
      symbol: 'POLICYHOOKSYNC',
    })

    const data = await result.current.changeTransferPolicy.mutateAsync({
      token: tokenAddr,
      policyId: 0n,
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.changeTransferPolicy.isSuccess).toBeTruthy(),
    )
  })
})

describe('useCreateSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      create: hooks.useCreateSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    const data = await result.current.create.mutateAsync({
      name: 'Hook Test Token Sync',
      symbol: 'HOOKTESTSYNC',
      currency: 'USD',
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()
    expect(data.token).toBeDefined()
    expect(data.name).toBe('Hook Test Token Sync')

    await vi.waitFor(() => expect(result.current.create.isSuccess).toBeTruthy())
  })
})

describe('useUpdateQuoteTokenSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      prepareUpdateQuoteTokenSync: hooks.usePrepareUpdateQuoteTokenSync(),
      updateQuoteToken: hooks.useUpdateQuoteTokenSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create quote token
    const { token: quoteToken } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Finalize Quote Hook Sync',
      symbol: 'FQHOOKSYNC',
    })

    // Create main token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Finalize Main Hook Sync',
      symbol: 'FMHOOKSYNC',
    })

    // Prepare quote token update first
    await result.current.prepareUpdateQuoteTokenSync.mutateAsync({
      token: tokenAddr,
      quoteToken,
    })

    const data = await result.current.updateQuoteToken.mutateAsync({
      token: tokenAddr,
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.updateQuoteToken.isSuccess).toBeTruthy(),
    )
  })
})

describe('useGrantRoles', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      grantRoles: hooks.useGrantRoles(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Grant Hook Token',
      symbol: 'GRANTHOOK',
    })

    const hash = await result.current.grantRoles.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
      to: account2.address,
    })
    expect(hash).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.grantRoles.isSuccess).toBeTruthy(),
    )
  })
})

describe('useGrantRolesSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      grantRoles: hooks.useGrantRolesSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Grant Hook Token Sync',
      symbol: 'GRANTHOOKSYNC',
    })

    const data = await result.current.grantRoles.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
      to: account2.address,
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()
    expect(data.value).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.grantRoles.isSuccess).toBeTruthy(),
    )
  })
})

describe('useMintSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      grantRolesSync: hooks.useGrantRolesSync(),
      mint: hooks.useMintSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Mint Hook Token Sync',
      symbol: 'MINTHOOKSYNC',
    })

    // Grant issuer role
    await result.current.grantRolesSync.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })

    const data = await result.current.mint.mutateAsync({
      token: tokenAddr,
      to: account.address,
      amount: parseUnits('100', 6),
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()

    await vi.waitFor(() => expect(result.current.mint.isSuccess).toBeTruthy())
  })
})

describe('usePauseSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      grantRolesSync: hooks.useGrantRolesSync(),
      pause: hooks.usePauseSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Pause Hook Token Sync',
      symbol: 'PAUSEHOOKSYNC',
    })

    // Grant pause role
    await result.current.grantRolesSync.mutateAsync({
      token: tokenAddr,
      roles: ['pause'],
      to: account.address,
    })

    const data = await result.current.pause.mutateAsync({
      token: tokenAddr,
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()

    await vi.waitFor(() => expect(result.current.pause.isSuccess).toBeTruthy())
  })
})

describe('useRenounceRolesSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      grantRolesSync: hooks.useGrantRolesSync(),
      renounceRoles: hooks.useRenounceRolesSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Renounce Hook Token Sync',
      symbol: 'RENOUNCEHOOKSYNC',
    })

    // Grant issuer role to ourselves
    await result.current.grantRolesSync.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })

    const data = await result.current.renounceRoles.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()
    expect(data.value).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.renounceRoles.isSuccess).toBeTruthy(),
    )
  })
})

describe('useRevokeRolesSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      grantRolesSync: hooks.useGrantRolesSync(),
      revokeRoles: hooks.useRevokeRolesSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Revoke Hook Token Sync',
      symbol: 'REVOKEHOOKSYNC',
    })

    // Grant issuer role to account2
    await result.current.grantRolesSync.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
      to: account2.address,
    })

    const data = await result.current.revokeRoles.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
      from: account2.address,
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()
    expect(data.value).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.revokeRoles.isSuccess).toBeTruthy(),
    )
  })
})

describe('useSetRoleAdminSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      setRoleAdmin: hooks.useSetRoleAdminSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Role Admin Hook Token Sync',
      symbol: 'ROLEADMINHOOKSYNC',
    })

    const data = await result.current.setRoleAdmin.mutateAsync({
      token: tokenAddr,
      role: 'issuer',
      adminRole: 'pause',
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.setRoleAdmin.isSuccess).toBeTruthy(),
    )
  })
})

describe('useSetSupplyCapSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      setSupplyCap: hooks.useSetSupplyCapSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Supply Cap Hook Token Sync',
      symbol: 'SUPPLYCAPHOOKSYNC',
    })

    const data = await result.current.setSupplyCap.mutateAsync({
      token: tokenAddr,
      supplyCap: parseUnits('1000000', 6),
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.setSupplyCap.isSuccess).toBeTruthy(),
    )
  })
})

describe('useTransferSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      transfer: hooks.useTransferSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    const data = await result.current.transfer.mutateAsync({
      to: account2.address,
      amount: parseUnits('1', 6),
      token: addresses.alphaUsd,
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.transfer.isSuccess).toBeTruthy(),
    )
  })
})

describe('useUnpauseSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      grantRolesSync: hooks.useGrantRolesSync(),
      pauseSync: hooks.usePauseSync(),
      unpause: hooks.useUnpauseSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Unpause Hook Token Sync',
      symbol: 'UNPAUSEHOOKSYNC',
    })

    // Grant pause and unpause roles
    await result.current.grantRolesSync.mutateAsync({
      token: tokenAddr,
      roles: ['pause', 'unpause'],
      to: account.address,
    })

    // First pause it
    await result.current.pauseSync.mutateAsync({
      token: tokenAddr,
    })

    const data = await result.current.unpause.mutateAsync({
      token: tokenAddr,
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.unpause.isSuccess).toBeTruthy(),
    )
  })
})

describe('usePrepareUpdateQuoteTokenSync', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      prepareUpdateQuoteToken: hooks.usePrepareUpdateQuoteTokenSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create quote token
    const { token: quoteToken } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Update Quote Hook Sync',
      symbol: 'UQHOOKSYNC',
    })

    // Create main token
    const { token: tokenAddr } = await result.current.createSync.mutateAsync({
      currency: 'USD',
      name: 'Update Main Hook Sync',
      symbol: 'UMHOOKSYNC',
    })

    const data = await result.current.prepareUpdateQuoteToken.mutateAsync({
      token: tokenAddr,
      quoteToken,
    })
    expect(data).toBeDefined()
    expect(data.receipt).toBeDefined()

    await vi.waitFor(() =>
      expect(result.current.prepareUpdateQuoteToken.isSuccess).toBeTruthy(),
    )
  })
})

describe('useWatchAdminRole', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      setRoleAdminSync: hooks.useSetRoleAdminSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } =
      await connectResult.current.createSync.mutateAsync({
        currency: 'USD',
        name: 'Watch Admin Role Hook Token',
        symbol: 'WATCHADMINHOOK',
      })

    const events: any[] = []
    await renderHook(() =>
      hooks.useWatchAdminRole({
        token: tokenAddr,
        onRoleAdminUpdated(args) {
          events.push(args)
        },
      }),
    )

    // Trigger event by setting a role admin
    await connectResult.current.setRoleAdminSync.mutateAsync({
      token: tokenAddr,
      role: 'issuer',
      adminRole: 'pause',
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]).toBeDefined()
  })
})

describe('useWatchApprove', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      approveSync: hooks.useApproveSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    const events: any[] = []
    await renderHook(() =>
      hooks.useWatchApprove({
        onApproval(args) {
          events.push(args)
        },
        token: addresses.alphaUsd,
      }),
    )

    // Trigger approval event
    await connectResult.current.approveSync.mutateAsync({
      spender: account2.address,
      amount: parseUnits('50', 6),
      token: addresses.alphaUsd,
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.owner).toBe(account.address)
    expect(events[0]?.spender).toBe(account2.address)
    expect(events[0]?.amount).toBe(parseUnits('50', 6))
  })
})

describe('useWatchBurn', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      grantRolesSync: hooks.useGrantRolesSync(),
      mintSync: hooks.useMintSync(),
      burnSync: hooks.useBurnSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } =
      await connectResult.current.createSync.mutateAsync({
        currency: 'USD',
        name: 'Watch Burn Hook Token',
        symbol: 'WATCHBURNHOOK',
      })

    // Grant issuer role and mint tokens
    await connectResult.current.grantRolesSync.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })
    await connectResult.current.mintSync.mutateAsync({
      token: tokenAddr,
      to: account.address,
      amount: parseUnits('1000', 6),
    })

    const events: any[] = []
    await renderHook(() =>
      hooks.useWatchBurn({
        token: tokenAddr,
        onBurn(args) {
          events.push(args)
        },
      }),
    )

    // Trigger burn event
    await connectResult.current.burnSync.mutateAsync({
      token: tokenAddr,
      amount: parseUnits('10', 6),
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.from).toBe(account.address)
    expect(events[0]?.amount).toBe(parseUnits('10', 6))
  })
})

describe('useWatchCreate', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    const events: any[] = []
    await renderHook(() =>
      hooks.useWatchCreate({
        onTokenCreated(args) {
          events.push(args)
        },
      }),
    )

    // Trigger token creation event
    await connectResult.current.createSync.mutateAsync({
      name: 'Watch Create Hook Token',
      symbol: 'WATCHCREATEHOOK',
      currency: 'USD',
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.name).toBe('Watch Create Hook Token')
    expect(events[0]?.symbol).toBe('WATCHCREATEHOOK')
    expect(events[0]?.currency).toBe('USD')
    expect(events[0]?.admin).toBe(account.address)
  })
})

describe('useWatchMint', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      grantRolesSync: hooks.useGrantRolesSync(),
      mintSync: hooks.useMintSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } =
      await connectResult.current.createSync.mutateAsync({
        currency: 'USD',
        name: 'Watch Mint Hook Token',
        symbol: 'WATCHMINTHOOK',
      })

    // Grant issuer role
    await connectResult.current.grantRolesSync.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })

    const events: any[] = []
    await renderHook(() =>
      hooks.useWatchMint({
        token: tokenAddr,
        onMint(args) {
          events.push(args)
        },
      }),
    )

    // Trigger mint event
    await connectResult.current.mintSync.mutateAsync({
      token: tokenAddr,
      to: account.address,
      amount: parseUnits('100', 6),
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.to).toBe(account.address)
    expect(events[0]?.amount).toBe(parseUnits('100', 6))
  })
})

describe('useWatchRole', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      grantRolesSync: hooks.useGrantRolesSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } =
      await connectResult.current.createSync.mutateAsync({
        currency: 'USD',
        name: 'Watch Role Hook Token',
        symbol: 'WATCHROLEHOOK',
      })

    const events: any[] = []
    await renderHook(() =>
      hooks.useWatchRole({
        token: tokenAddr,
        onRoleUpdated(args) {
          events.push(args)
        },
      }),
    )

    // Trigger role update event by granting a role
    await connectResult.current.grantRolesSync.mutateAsync({
      token: tokenAddr,
      roles: ['issuer'],
      to: account2.address,
    })

    await vi.waitUntil(() => events.some((e) => e.account === account2.address))

    const event = events.find((e) => e.account === account2.address)
    expect(event).toBeDefined()
    expect(event?.hasRole).toBe(true)
    expect(event?.type).toBe('granted')
  })
})

describe('useWatchTransfer', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      transferSync: hooks.useTransferSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    const events: any[] = []
    await renderHook(() =>
      hooks.useWatchTransfer({
        onTransfer(args) {
          events.push(args)
        },
        token: addresses.alphaUsd,
      }),
    )

    // Trigger transfer event
    await connectResult.current.transferSync.mutateAsync({
      to: account2.address,
      amount: parseUnits('5', 6),
      token: addresses.alphaUsd,
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.from).toBe(account.address)
    expect(events[0]?.to).toBe(account2.address)
    expect(events[0]?.amount).toBe(parseUnits('5', 6))
  })
})

describe('useWatchUpdateQuoteToken', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: hooks.useCreateSync(),
      prepareUpdateQuoteTokenSync: hooks.usePrepareUpdateQuoteTokenSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create quote token
    const { token: quoteToken } =
      await connectResult.current.createSync.mutateAsync({
        currency: 'USD',
        name: 'Watch Quote Hook Token',
        symbol: 'WATCHQUOTEHOOK',
      })

    // Create main token
    const { token: tokenAddr } =
      await connectResult.current.createSync.mutateAsync({
        currency: 'USD',
        name: 'Watch Main Hook Token',
        symbol: 'WATCHMAINHOOK',
      })

    const events: any[] = []
    await renderHook(() =>
      hooks.useWatchUpdateQuoteToken({
        token: tokenAddr,
        onUpdateQuoteToken(args) {
          events.push(args)
        },
      }),
    )

    // Trigger prepare update quote token event
    await connectResult.current.prepareUpdateQuoteTokenSync.mutateAsync({
      token: tokenAddr,
      quoteToken,
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.nextQuoteToken).toBe(quoteToken)
    expect(events[0]?.updater).toBe(account.address)
    expect(events[0]?.completed).toBe(false)
  })
})

describe.todo('useBurnBlocked')

describe.todo('useBurnBlockedSync')

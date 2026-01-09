import { Actions } from '@wagmi/core/tempo'
import { accounts, config, queryClient, renderHook } from '@wagmi/test/tempo'
import type { Address } from 'viem'
import { describe, expect, test, vi } from 'vitest'

import { useConnect } from '../../hooks/useConnect.js'
import * as policy from './policy.js'

const account = accounts[0]
const account2 = accounts[1]

describe('useCreate', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // create whitelist policy
    const { receipt, ...createResult } =
      await result.current.createSync.mutateAsync({
        type: 'whitelist',
      })
    expect(receipt).toBeDefined()
    expect(createResult).toMatchInlineSnapshot(`
      {
        "policyId": 2n,
        "policyType": 0,
        "updater": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      }
    `)

    const { policyId } = createResult

    // verify policy was created
    const data = await Actions.policy.getData(config, {
      policyId,
    })
    expect(data.admin).toBe(account.address)
    expect(data.type).toBe('whitelist')
  })

  test('behavior: blacklist', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // create blacklist policy
    const { receipt: blacklistReceipt, ...blacklistResult } =
      await result.current.createSync.mutateAsync({
        type: 'blacklist',
      })
    expect(blacklistReceipt).toBeDefined()
    expect(blacklistResult).toMatchInlineSnapshot(`
      {
        "policyId": 3n,
        "policyType": 1,
        "updater": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      }
    `)

    const { policyId } = blacklistResult

    // verify policy was created
    const data = await Actions.policy.getData(config, {
      policyId,
    })
    expect(data.admin).toBe(account.address)
    expect(data.type).toBe('blacklist')
  })
})

describe('useSetAdmin', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
      setAdminSync: policy.useSetAdminSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // create policy
    const { policyId } = await result.current.createSync.mutateAsync({
      type: 'whitelist',
    })

    // set new admin
    const { receipt: setAdminReceipt, ...setAdminResult } =
      await result.current.setAdminSync.mutateAsync({
        policyId,
        admin: account2.address,
      })
    expect(setAdminReceipt).toBeDefined()
    expect(setAdminResult).toMatchInlineSnapshot(`
      {
        "admin": "0x8C8d35429F74ec245F8Ef2f4Fd1e551cFF97d650",
        "policyId": 4n,
        "updater": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      }
    `)

    {
      // verify new admin
      const data = await Actions.policy.getData(config, { policyId })
      expect(data.admin).toBe(account2.address)
    }
  })
})

describe('useModifyWhitelist', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
      modifyWhitelistSync: policy.useModifyWhitelistSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // create whitelist policy
    const { policyId } = await result.current.createSync.mutateAsync({
      type: 'whitelist',
    })

    // verify account2 is not authorized
    {
      const isAuthorized = await Actions.policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(false)
    }

    // add account2 to whitelist
    const { receipt: addReceipt, ...addResult } =
      await result.current.modifyWhitelistSync.mutateAsync({
        policyId,
        address: account2.address,
        allowed: true,
      })
    expect(addReceipt).toBeDefined()
    expect(addResult).toMatchInlineSnapshot(`
      {
        "account": "0x8C8d35429F74ec245F8Ef2f4Fd1e551cFF97d650",
        "allowed": true,
        "policyId": 5n,
        "updater": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      }
    `)

    // verify account2 is authorized
    {
      const isAuthorized = await Actions.policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(true)
    }

    // remove account2 from whitelist
    const { receipt: removeReceipt, ...removeResult } =
      await result.current.modifyWhitelistSync.mutateAsync({
        policyId,
        address: account2.address,
        allowed: false,
      })
    expect(removeReceipt).toBeDefined()
    expect(removeResult).toMatchInlineSnapshot(`
      {
        "account": "0x8C8d35429F74ec245F8Ef2f4Fd1e551cFF97d650",
        "allowed": false,
        "policyId": 5n,
        "updater": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      }
    `)

    // verify account2 is no longer authorized
    {
      const isAuthorized = await Actions.policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(false)
    }
  })
})

describe('useModifyBlacklist', () => {
  test('default', async () => {
    const { result } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
      modifyBlacklistSync: policy.useModifyBlacklistSync(),
    }))

    await result.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // create blacklist policy
    const { policyId } = await result.current.createSync.mutateAsync({
      type: 'blacklist',
    })

    // verify account2 is authorized (not blacklisted)
    {
      const isAuthorized = await Actions.policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(true)
    }

    // add account2 to blacklist
    const { receipt: addBlacklistReceipt, ...addBlacklistResult } =
      await result.current.modifyBlacklistSync.mutateAsync({
        policyId,
        address: account2.address,
        restricted: true,
      })
    expect(addBlacklistReceipt).toBeDefined()
    expect(addBlacklistResult).toMatchInlineSnapshot(`
      {
        "account": "0x8C8d35429F74ec245F8Ef2f4Fd1e551cFF97d650",
        "policyId": 6n,
        "restricted": true,
        "updater": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      }
    `)

    // verify account2 is not authorized (blacklisted)
    {
      const isAuthorized = await Actions.policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(false)
    }

    // remove account2 from blacklist
    const removeResult = await result.current.modifyBlacklistSync.mutateAsync({
      policyId,
      address: account2.address,
      restricted: false,
    })

    expect(removeResult.receipt).toBeDefined()
    expect(removeResult.policyId).toBe(policyId)
    expect(removeResult.account).toBe(account2.address)
    expect(removeResult.restricted).toBe(false)
    expect(removeResult.updater).toBe(account.address)

    // verify account2 is authorized again
    {
      const isAuthorized = await Actions.policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(true)
    }
  })
})

describe('useData', () => {
  test('default', async () => {
    const { result: setupResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
    }))

    await setupResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // create policy
    const { policyId } = await setupResult.current.createSync.mutateAsync({
      type: 'whitelist',
    })

    {
      // get policy data
      const { result } = await renderHook(() => policy.useData({ policyId }))

      await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      expect(result.current.data?.admin).toBe(account.address)
      expect(result.current.data?.type).toBe('whitelist')
    }
  })

  test('behavior: blacklist', async () => {
    const { result: setupResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
    }))

    await setupResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // create blacklist policy
    const { policyId } = await setupResult.current.createSync.mutateAsync({
      type: 'blacklist',
    })

    {
      // get policy data
      const { result } = await renderHook(() => policy.useData({ policyId }))

      await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

      expect(result.current.data?.admin).toBe(account.address)
      expect(result.current.data?.type).toBe('blacklist')
    }
  })

  test('reactivity: policyId parameter', async () => {
    const { result: setupResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
    }))

    await setupResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create policy
    const { policyId } = await setupResult.current.createSync.mutateAsync({
      type: 'whitelist',
    })

    // Query with undefined policyId initially
    const { result, rerender } = await renderHook(
      (props) => policy.useData({ policyId: props?.policyId }),
      { initialProps: { policyId: undefined as bigint | undefined } },
    )

    await vi.waitFor(() => result.current.fetchStatus === 'fetching')

    // Should be disabled when policyId is undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false)

    // Set policyId
    rerender({ policyId })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Should now be enabled and have data
    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data?.admin).toBe(account.address)
    expect(result.current.data?.type).toBe('whitelist')
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const { result: setupResult } = await renderHook(() => ({
        connect: useConnect(),
        createSync: policy.useCreateSync(),
      }))

      await setupResult.current.connect.mutateAsync({
        connector: config.connectors[0]!,
      })

      // create policy
      const { policyId } = await setupResult.current.createSync.mutateAsync({
        type: 'whitelist',
      })

      const options = Actions.policy.getData.queryOptions(config, { policyId })
      const data = await queryClient.fetchQuery(options)

      expect(data.admin).toBe(account.address)
      expect(data.type).toBe('whitelist')
    })
  })
})

describe('useIsAuthorized', () => {
  test('special policy: always-reject (policyId 0)', async () => {
    const { result } = await renderHook(() =>
      policy.useIsAuthorized({
        policyId: 0n,
        user: account.address,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBe(false)
  })

  test('special policy: always-allow (policyId 1)', async () => {
    const { result } = await renderHook(() =>
      policy.useIsAuthorized({
        policyId: 1n,
        user: account.address,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBe(true)
  })

  test('reactivity: policyId and user parameters', async () => {
    const { result: setupResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
      modifyWhitelistSync: policy.useModifyWhitelistSync(),
    }))

    await setupResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create whitelist policy
    const { policyId } = await setupResult.current.createSync.mutateAsync({
      type: 'whitelist',
    })

    // Add account2 to whitelist
    await setupResult.current.modifyWhitelistSync.mutateAsync({
      policyId,
      address: account2.address,
      allowed: true,
    })

    // Query with undefined parameters initially
    const { result, rerender } = await renderHook(
      (props) =>
        policy.useIsAuthorized({
          policyId: props?.policyId,
          user: props?.user,
        }),
      {
        initialProps: {
          policyId: undefined as bigint | undefined,
          user: undefined as Address | undefined,
        },
      },
    )

    await vi.waitFor(() => result.current.fetchStatus === 'fetching')

    // Should be disabled when parameters are undefined
    expect(result.current.data).toBeUndefined()
    expect(result.current.isPending).toBe(true)
    // expect(result.current.isEnabled).toBe(false)

    // Set parameters
    rerender({ policyId, user: account2.address })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Should now be enabled and have data
    // expect(result.current.isEnabled).toBe(true)
    expect(result.current.data).toBe(true)
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const options = Actions.policy.isAuthorized.queryOptions(config, {
        policyId: 1n,
        user: account.address,
      })
      const isAuthorized = await queryClient.fetchQuery(options)

      expect(isAuthorized).toBe(true)
    })
  })
})

describe('useWatchCreate', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    const events: any[] = []
    await renderHook(() =>
      policy.useWatchCreate({
        onPolicyCreated(args) {
          events.push(args)
        },
      }),
    )

    // Create policy
    await connectResult.current.createSync.mutateAsync({
      type: 'whitelist',
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.policyId).toBeDefined()
    expect(events[0]?.updater).toBe(account.address)
    expect(events[0]?.type).toBe('whitelist')
  })
})

describe('useWatchAdminUpdated', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
      setAdminSync: policy.useSetAdminSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create policy
    const { policyId } = await connectResult.current.createSync.mutateAsync({
      type: 'whitelist',
    })

    const events: any[] = []
    await renderHook(() =>
      policy.useWatchAdminUpdated({
        onAdminUpdated(args) {
          events.push(args)
        },
      }),
    )

    // Set new admin
    await connectResult.current.setAdminSync.mutateAsync({
      policyId,
      admin: account2.address,
    })

    await vi.waitUntil(() => events.some((e) => e.admin === account2.address))

    const event = events.find((e) => e.admin === account2.address)
    expect(event).toBeDefined()
    expect(event?.policyId).toBe(policyId)
    expect(event?.updater).toBe(account.address)
  })
})

describe('useWatchWhitelistUpdated', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
      modifyWhitelistSync: policy.useModifyWhitelistSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create whitelist policy
    const { policyId } = await connectResult.current.createSync.mutateAsync({
      type: 'whitelist',
    })

    const events: any[] = []
    await renderHook(() =>
      policy.useWatchWhitelistUpdated({
        onWhitelistUpdated(args) {
          events.push(args)
        },
      }),
    )

    // Add address to whitelist
    await connectResult.current.modifyWhitelistSync.mutateAsync({
      policyId,
      address: account2.address,
      allowed: true,
    })

    // Remove address from whitelist
    await connectResult.current.modifyWhitelistSync.mutateAsync({
      policyId,
      address: account2.address,
      allowed: false,
    })

    await vi.waitUntil(() => events.length >= 2)

    expect(events.length).toBeGreaterThanOrEqual(2)
    expect(events[0]?.policyId).toBe(policyId)
    expect(events[0]?.updater).toBe(account.address)
    expect(events[0]?.account).toBe(account2.address)
    expect(events[0]?.allowed).toBe(true)
    expect(events[1]?.allowed).toBe(false)
  })
})

describe('useWatchBlacklistUpdated', () => {
  test('default', async () => {
    const { result: connectResult } = await renderHook(() => ({
      connect: useConnect(),
      createSync: policy.useCreateSync(),
      modifyBlacklistSync: policy.useModifyBlacklistSync(),
    }))

    await connectResult.current.connect.mutateAsync({
      connector: config.connectors[0]!,
    })

    // Create blacklist policy
    const { policyId } = await connectResult.current.createSync.mutateAsync({
      type: 'blacklist',
    })

    const events: any[] = []
    await renderHook(() =>
      policy.useWatchBlacklistUpdated({
        onBlacklistUpdated(args) {
          events.push(args)
        },
      }),
    )

    // Add address to blacklist
    await connectResult.current.modifyBlacklistSync.mutateAsync({
      policyId,
      address: account2.address,
      restricted: true,
    })

    // Remove address from blacklist
    await connectResult.current.modifyBlacklistSync.mutateAsync({
      policyId,
      address: account2.address,
      restricted: false,
    })

    await vi.waitUntil(() => events.length >= 2)

    expect(events.length).toBeGreaterThanOrEqual(2)
    expect(events[0]?.policyId).toBe(policyId)
    expect(events[0]?.updater).toBe(account.address)
    expect(events[0]?.account).toBe(account2.address)
    expect(events[0]?.restricted).toBe(true)
    expect(events[1]?.restricted).toBe(false)
  })
})

import { connect } from '@wagmi/core'
import { accounts, config, queryClient } from '@wagmi/test/tempo'
import { describe, expect, test } from 'vitest'
import * as policy from './policy.js'

const account = accounts[0]
const account2 = accounts[1]

describe('create', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const result = await policy.createSync(config, {
      type: 'whitelist',
    })

    expect(result.receipt).toBeDefined()
    expect(result.policyId).toBeDefined()
    expect(result.policyType).toBe(0)
    expect(result.updater).toBe(account.address)

    // verify policy was created
    const data = await policy.getData(config, {
      policyId: result.policyId,
    })
    expect(data.admin).toBe(account.address)
    expect(data.type).toBe('whitelist')
  })

  test('behavior: blacklist', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const result = await policy.createSync(config, {
      type: 'blacklist',
    })

    expect(result.receipt).toBeDefined()
    expect(result.policyId).toBeDefined()
    expect(result.policyType).toBe(1)
    expect(result.updater).toBe(account.address)

    // verify policy was created
    const data = await policy.getData(config, {
      policyId: result.policyId,
    })
    expect(data.admin).toBe(account.address)
    expect(data.type).toBe('blacklist')
  })
})

describe('setAdmin', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // create policy
    const { policyId } = await policy.createSync(config, {
      type: 'whitelist',
    })

    // set new admin
    const { receipt: setAdminReceipt, ...setAdminResult } =
      await policy.setAdminSync(config, {
        policyId,
        admin: account2.address,
      })
    expect(setAdminReceipt).toBeDefined()
    expect(setAdminResult.policyId).toBe(policyId)
    expect(setAdminResult.admin).toBe(account2.address)
    expect(setAdminResult.updater).toBe(account.address)

    {
      // verify new admin
      const data = await policy.getData(config, {
        policyId,
      })
      expect(data.admin).toBe(account2.address)
    }
  })
})

describe('modifyWhitelist', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // create whitelist policy
    const { policyId } = await policy.createSync(config, {
      type: 'whitelist',
    })

    // verify account2 is not authorized
    {
      const isAuthorized = await policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(false)
    }

    // add account2 to whitelist
    const addResult = await policy.modifyWhitelistSync(config, {
      policyId,
      address: account2.address,
      allowed: true,
    })

    expect(addResult.receipt).toBeDefined()
    expect(addResult.policyId).toBe(policyId)
    expect(addResult.account).toBe(account2.address)
    expect(addResult.allowed).toBe(true)
    expect(addResult.updater).toBe(account.address)

    // verify account2 is authorized
    {
      const isAuthorized = await policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(true)
    }

    // remove account2 from whitelist
    const removeResult = await policy.modifyWhitelistSync(config, {
      policyId,
      address: account2.address,
      allowed: false,
    })

    expect(removeResult.receipt).toBeDefined()
    expect(removeResult.policyId).toBe(policyId)
    expect(removeResult.account).toBe(account2.address)
    expect(removeResult.allowed).toBe(false)
    expect(removeResult.updater).toBe(account.address)

    // verify account2 is no longer authorized
    {
      const isAuthorized = await policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(false)
    }
  })
})

describe('modifyBlacklist', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // create blacklist policy
    const { policyId } = await policy.createSync(config, {
      type: 'blacklist',
    })

    // verify account2 is authorized (not blacklisted)
    {
      const isAuthorized = await policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(true)
    }

    // add account2 to blacklist
    const addResult = await policy.modifyBlacklistSync(config, {
      policyId,
      address: account2.address,
      restricted: true,
    })

    expect(addResult.receipt).toBeDefined()
    expect(addResult.policyId).toBe(policyId)
    expect(addResult.account).toBe(account2.address)
    expect(addResult.restricted).toBe(true)
    expect(addResult.updater).toBe(account.address)

    // verify account2 is not authorized (blacklisted)
    {
      const isAuthorized = await policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(false)
    }

    // remove account2 from blacklist
    const removeResult = await policy.modifyBlacklistSync(config, {
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
      const isAuthorized = await policy.isAuthorized(config, {
        policyId,
        user: account2.address,
      })
      expect(isAuthorized).toBe(true)
    }
  })
})

describe('getData', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // create policy
    const { policyId } = await policy.createSync(config, {
      type: 'whitelist',
    })

    {
      // get policy data
      const data = await policy.getData(config, {
        policyId,
      })
      expect(data.admin).toBe(account.address)
      expect(data.type).toBe('whitelist')
    }
  })

  test('behavior: blacklist', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // create blacklist policy
    const { policyId } = await policy.createSync(config, {
      type: 'blacklist',
    })

    {
      // get policy data
      const data = await policy.getData(config, {
        policyId,
      })
      expect(data.admin).toBe(account.address)
      expect(data.type).toBe('blacklist')
    }
  })

  describe('queryOptions', () => {
    test('default', async () => {
      await connect(config, {
        connector: config.connectors[0]!,
      })

      // create policy
      const { policyId } = await policy.createSync(config, {
        type: 'whitelist',
      })

      const options = policy.getData.queryOptions(config, {
        policyId,
      })
      const data = await queryClient.fetchQuery(options)

      expect(data.admin).toBe(account.address)
      expect(data.type).toBe('whitelist')
    })
  })
})

describe('isAuthorized', () => {
  test('special policy: always-reject (policyId 0)', async () => {
    const isAuthorized = await policy.isAuthorized(config, {
      policyId: 0n,
      user: account.address,
    })
    expect(isAuthorized).toBe(false)
  })

  test('special policy: always-allow (policyId 1)', async () => {
    const isAuthorized = await policy.isAuthorized(config, {
      policyId: 1n,
      user: account.address,
    })
    expect(isAuthorized).toBe(true)
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const options = policy.isAuthorized.queryOptions(config, {
        policyId: 1n,
        user: account.address,
      })
      const isAuthorized = await queryClient.fetchQuery(options)

      expect(isAuthorized).toBe(true)
    })
  })
})

describe('watchCreate', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const events: any[] = []
    const unwatch = policy.watchCreate(config, {
      onPolicyCreated: (args, log) => {
        events.push({ args, log })
      },
    })

    // create policy
    await policy.createSync(config, {
      type: 'whitelist',
    })

    await new Promise((resolve) => setTimeout(resolve, 500))
    unwatch()

    expect(events.length).toBe(1)
    expect(events[0].args.policyId).toBeDefined()
    expect(events[0].args.updater).toBe(account.address)
    expect(events[0].args.type).toBe('whitelist')
  })
})

describe('watchAdminUpdated', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // create policy
    const { policyId } = await policy.createSync(config, {
      type: 'whitelist',
    })

    const events: any[] = []
    const unwatch = policy.watchAdminUpdated(config, {
      onAdminUpdated: (args, log) => {
        events.push({ args, log })
      },
    })

    // set new admin
    await policy.setAdminSync(config, {
      policyId,
      admin: account2.address,
    })

    await new Promise((resolve) => setTimeout(resolve, 500))
    unwatch()

    // Policy creation emits an admin event for the creator, so find the specific event
    const event = events.find((e) => e.args.admin === account2.address)
    expect(event).toBeDefined()
    expect(event.args.policyId).toBe(policyId)
    expect(event.args.updater).toBe(account.address)
  })
})

describe('watchWhitelistUpdated', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // create whitelist policy
    const { policyId } = await policy.createSync(config, {
      type: 'whitelist',
    })

    const events: any[] = []
    const unwatch = policy.watchWhitelistUpdated(config, {
      onWhitelistUpdated: (args, log) => {
        events.push({ args, log })
      },
    })

    // add address to whitelist
    await policy.modifyWhitelistSync(config, {
      policyId,
      address: account2.address,
      allowed: true,
    })

    // remove address from whitelist
    await policy.modifyWhitelistSync(config, {
      policyId,
      address: account2.address,
      allowed: false,
    })

    await new Promise((resolve) => setTimeout(resolve, 500))
    unwatch()

    expect(events.length).toBe(2)
    expect(events[0].args.policyId).toBe(policyId)
    expect(events[0].args.updater).toBe(account.address)
    expect(events[0].args.account).toBe(account2.address)
    expect(events[0].args.allowed).toBe(true)
    expect(events[1].args.allowed).toBe(false)
  })
})

describe('watchBlacklistUpdated', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // create blacklist policy
    const { policyId } = await policy.createSync(config, {
      type: 'blacklist',
    })

    const events: any[] = []
    const unwatch = policy.watchBlacklistUpdated(config, {
      onBlacklistUpdated: (args, log) => {
        events.push({ args, log })
      },
    })

    // add address to blacklist
    await policy.modifyBlacklistSync(config, {
      policyId,
      address: account2.address,
      restricted: true,
    })

    // remove address from blacklist
    await policy.modifyBlacklistSync(config, {
      policyId,
      address: account2.address,
      restricted: false,
    })

    await new Promise((resolve) => setTimeout(resolve, 500))
    unwatch()

    expect(events.length).toBe(2)
    expect(events[0].args.policyId).toBe(policyId)
    expect(events[0].args.updater).toBe(account.address)
    expect(events[0].args.account).toBe(account2.address)
    expect(events[0].args.restricted).toBe(true)
    expect(events[1].args.restricted).toBe(false)
  })
})

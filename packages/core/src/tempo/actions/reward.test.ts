import { getConnection } from '@wagmi/core'
import { config, queryClient, setupToken } from '@wagmi/test/tempo'
import { parseUnits } from 'viem'
import { describe, expect, test, vi } from 'vitest'
import * as actions from './reward.js'
import * as tokenActions from './token.js'

describe('claimSync', () => {
  test('default', async () => {
    const { token } = await setupToken()

    const connection = getConnection(config)

    const balanceBefore = await tokenActions.getBalance(config, {
      account: connection.address!,
      token,
    })

    // Opt in to rewards
    await actions.setRecipientSync(config, {
      recipient: connection.address!,
      token,
    })

    // Mint reward tokens
    const rewardAmount = parseUnits('100', 6)
    await tokenActions.mintSync(config, {
      amount: rewardAmount,
      to: connection.address!,
      token,
    })

    // Start immediate reward
    await actions.distributeSync(config, {
      amount: rewardAmount,
      token,
    })

    // Trigger reward accrual by transferring
    await tokenActions.transferSync(config, {
      amount: 1n,
      to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      token,
    })

    // Claim rewards
    const { receipt } = await actions.claimSync(config, {
      token,
    })

    expect(receipt).toBeDefined()

    const balanceAfter = await tokenActions.getBalance(config, {
      account: connection.address!,
      token,
    })

    // Balance should have increased due to claimed rewards
    expect(balanceAfter).toBeGreaterThan(
      balanceBefore + rewardAmount - parseUnits('1', 6),
    )
  })
})

describe('getGlobalRewardPerToken', () => {
  test('default', async () => {
    const { token } = await setupToken()

    const rate = await actions.getGlobalRewardPerToken(config, {
      token,
    })

    expect(rate).toBe(0n)
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const { token } = await setupToken()

      const options = actions.getGlobalRewardPerToken.queryOptions(config, {
        token,
      })

      const rate = await queryClient.fetchQuery(options)

      expect(rate).toBe(0n)
    })
  })
})

describe('getUserRewardInfo', () => {
  test('default', async () => {
    const { token } = await setupToken()

    const connection = getConnection(config)

    const info = await actions.getUserRewardInfo(config, {
      token,
      account: connection.address!,
    })

    expect(info.rewardRecipient).toBeDefined()
    expect(info.rewardPerToken).toBeDefined()
    expect(info.rewardBalance).toBeDefined()
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const { token } = await setupToken()

      const connection = getConnection(config)

      const options = actions.getUserRewardInfo.queryOptions(config, {
        token,
        account: connection.address!,
      })

      const info = await queryClient.fetchQuery(options)

      expect(info.rewardRecipient).toBeDefined()
      expect(info.rewardPerToken).toBeDefined()
      expect(info.rewardBalance).toBeDefined()
    })
  })
})

describe('setRecipientSync', () => {
  test('default', async () => {
    const { token } = await setupToken()

    const connection = getConnection(config)

    // Set reward recipient
    const { holder, receipt, recipient } = await actions.setRecipientSync(
      config,
      {
        recipient: connection.address!,
        token,
      },
    )

    expect(receipt).toBeDefined()
    expect(holder).toBe(connection.address)
    expect(recipient).toBe(connection.address)
  })
})

describe('watchRewardDistributed', () => {
  test('default', async () => {
    const { token } = await setupToken()

    const connection = getConnection(config)

    // Setup rewards
    await actions.setRecipientSync(config, {
      recipient: connection.address!,
      token,
    })

    const rewardAmount = parseUnits('100', 6)
    await tokenActions.mintSync(config, {
      amount: rewardAmount,
      to: connection.address!,
      token,
    })

    const events: any[] = []
    const unwatch = actions.watchRewardDistributed(config, {
      token,
      onRewardDistributed: (args) => {
        events.push(args)
      },
    })

    await actions.distributeSync(config, {
      amount: rewardAmount,
      token,
    })

    await vi.waitFor(() => {
      expect(events.length).toBeGreaterThan(0)
    })
    unwatch()

    expect(events[0]?.amount).toBe(rewardAmount)
    expect(events[0]?.funder).toBe(connection.address)
  })
})

describe('watchRewardRecipientSet', () => {
  test('default', async () => {
    const { token } = await setupToken()

    const account = getConnection(config)

    const events: any[] = []
    const unwatch = actions.watchRewardRecipientSet(config, {
      token,
      onRewardRecipientSet: (args) => {
        events.push(args)
      },
    })

    await actions.setRecipientSync(config, {
      recipient: account.address!,
      token,
    })

    await vi.waitFor(() => {
      expect(events.length).toBeGreaterThan(0)
    })
    unwatch()

    expect(events[0]?.holder).toBe(account.address)
    expect(events[0]?.recipient).toBe(account.address)
  })
})

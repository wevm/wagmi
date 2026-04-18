import { connect, disconnect, getConnection } from '@wagmi/core'
import { accounts, config, queryClient, setupToken } from '@wagmi/test/tempo'
import { parseUnits } from 'viem'
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import * as actions from './reward.js'
import * as tokenActions from './token.js'

let claimToken: Awaited<ReturnType<typeof setupToken>>['token']
let readToken: Awaited<ReturnType<typeof setupToken>>['token']
let setRecipientToken: Awaited<ReturnType<typeof setupToken>>['token']
let distributedWatchToken: Awaited<ReturnType<typeof setupToken>>['token']
let recipientWatchToken: Awaited<ReturnType<typeof setupToken>>['token']

beforeAll(async () => {
  ;({ token: claimToken } = await setupToken())
  ;({ token: readToken } = await setupToken())
  ;({ token: setRecipientToken } = await setupToken())
  ;({ token: distributedWatchToken } = await setupToken())
  ;({ token: recipientWatchToken } = await setupToken())
  await disconnect(config).catch(() => {})
})

beforeEach(async () => {
  await disconnect(config).catch(() => {})
})

describe('reward', () => {
  describe('claimSync', () => {
    test('default', async () => {
      await connect(config, {
        connector: config.connectors[0]!,
      })

      const connection = getConnection(config)

      const balanceBefore = await tokenActions.getBalance(config, {
        account: connection.address!,
        token: claimToken,
      })

      // Opt in to rewards
      await actions.setRecipientSync(config, {
        recipient: connection.address!,
        token: claimToken,
      })

      // Mint reward tokens
      const rewardAmount = parseUnits('100', 6)
      await tokenActions.mintSync(config, {
        amount: rewardAmount,
        to: connection.address!,
        token: claimToken,
      })

      // Start immediate reward
      await actions.distributeSync(config, {
        amount: rewardAmount,
        token: claimToken,
      })

      // Trigger reward accrual by transferring
      await tokenActions.transferSync(config, {
        amount: 1n,
        to: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
        token: claimToken,
      })

      // Claim rewards
      const { receipt } = await actions.claimSync(config, {
        token: claimToken,
      })

      expect(receipt).toBeDefined()

      const balanceAfter = await tokenActions.getBalance(config, {
        account: connection.address!,
        token: claimToken,
      })

      // Balance should have increased due to claimed rewards
      expect(balanceAfter).toBeGreaterThan(
        balanceBefore + rewardAmount - parseUnits('1', 6),
      )
    })
  })

  describe('getGlobalRewardPerToken', () => {
    test('default', async () => {
      const rate = await actions.getGlobalRewardPerToken(config, {
        token: readToken,
      })

      expect(rate).toBe(0n)
    })

    describe('queryOptions', () => {
      test('default', async () => {
        const options = actions.getGlobalRewardPerToken.queryOptions(config, {
          token: readToken,
        })

        const rate = await queryClient.fetchQuery(options)

        expect(rate).toBe(0n)
      })
    })
  })

  describe('getUserRewardInfo', () => {
    test('default', async () => {
      const info = await actions.getUserRewardInfo(config, {
        token: readToken,
        account: accounts[0].address,
      })

      expect(info.rewardRecipient).toBeDefined()
      expect(info.rewardPerToken).toBeDefined()
      expect(info.rewardBalance).toBeDefined()
    })

    describe('queryOptions', () => {
      test('default', async () => {
        const options = actions.getUserRewardInfo.queryOptions(config, {
          token: readToken,
          account: accounts[0].address,
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
      await connect(config, {
        connector: config.connectors[0]!,
      })

      const connection = getConnection(config)

      // Set reward recipient
      const { holder, receipt, recipient } = await actions.setRecipientSync(
        config,
        {
          recipient: connection.address!,
          token: setRecipientToken,
        },
      )

      expect(receipt).toBeDefined()
      expect(holder).toBe(connection.address)
      expect(recipient).toBe(connection.address)
    })
  })

  describe('watchRewardDistributed', () => {
    test('default', async () => {
      await connect(config, {
        connector: config.connectors[0]!,
      })

      const connection = getConnection(config)

      // Setup rewards
      await actions.setRecipientSync(config, {
        recipient: connection.address!,
        token: distributedWatchToken,
      })

      const rewardAmount = parseUnits('100', 6)
      await tokenActions.mintSync(config, {
        amount: rewardAmount,
        to: connection.address!,
        token: distributedWatchToken,
      })

      const events: any[] = []
      const unwatch = actions.watchRewardDistributed(config, {
        token: distributedWatchToken,
        onRewardDistributed: (args) => {
          events.push(args)
        },
      })

      await actions.distributeSync(config, {
        amount: rewardAmount,
        token: distributedWatchToken,
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
      await connect(config, {
        connector: config.connectors[0]!,
      })

      const account = getConnection(config)

      const events: any[] = []
      const unwatch = actions.watchRewardRecipientSet(config, {
        token: recipientWatchToken,
        onRewardRecipientSet: (args) => {
          events.push(args)
        },
      })

      await actions.setRecipientSync(config, {
        recipient: account.address!,
        token: recipientWatchToken,
      })

      await vi.waitFor(() => {
        expect(events.length).toBeGreaterThan(0)
      })
      unwatch()

      expect(events[0]?.holder).toBe(account.address)
      expect(events[0]?.recipient).toBe(account.address)
    })
  })
})

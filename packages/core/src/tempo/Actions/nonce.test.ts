import { connect } from '@wagmi/core'
import { accounts, config, queryClient, rpcUrl } from '@wagmi/test/tempo'
import { afterEach, describe, expect, test } from 'vitest'
import * as nonce from './nonce.js'
import * as token from './token.js'

const account = accounts[0]
const account2 = accounts[1]

afterEach(async () => {
  await fetch(`${rpcUrl}/restart`)
})

describe('getNonce', () => {
  test('default', async () => {
    const result = await nonce.getNonce(config, {
      account: account.address,
      nonceKey: 1n,
    })
    expect(result).toBe(0n)
  })

  test('queryOptions', async () => {
    const options = nonce.getNonce.queryOptions(config, {
      account: account.address,
      nonceKey: 1n,
    })
    const result = await queryClient.fetchQuery(options)
    expect(result).toBe(0n)
  })
})

test('watchNonceIncremented', async () => {
  await connect(config, {
    connector: config.connectors[0]!,
  })

  const events: any[] = []
  const unwatch = nonce.watchNonceIncremented(config, {
    onNonceIncremented: (args) => {
      events.push(args)
    },
    args: {
      account: account.address,
      nonceKey: 5n,
    },
  })

  // Have to manually set nonce because eth_FillTransaction does not support nonce keys
  await token.transferSync(config, {
    to: account2.address,
    amount: 1n,
    token: 1n,
    nonceKey: 5n,
    nonce: 0,
  })

  await token.transferSync(config, {
    to: account2.address,
    amount: 1n,
    token: 1n,
    nonceKey: 5n,
    nonce: 1,
  })

  await new Promise((resolve) => setTimeout(resolve, 1000))

  expect(events).toHaveLength(2)
  expect(events[0]?.account).toBe(account.address)
  expect(events[0]?.nonceKey).toBe(5n)
  expect(events[0]?.newNonce).toBe(1n)
  expect(events[1]?.newNonce).toBe(2n)
  unwatch()
})

import { afterEach, describe, expect, test } from 'vitest'
import { accounts, config, queryClient, rpcUrl } from '../../test/config.js'
import * as nonce from './nonce.js'

const account = accounts[0]

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

  describe('queryOptions', () => {
    test('default', async () => {
      const options = nonce.getNonce.queryOptions(config, {
        account: account.address,
        nonceKey: 1n,
      })
      const result = await queryClient.fetchQuery(options)
      expect(result).toBe(0n)
    })
  })
})

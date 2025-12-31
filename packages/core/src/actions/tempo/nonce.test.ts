import { config, tempoAccounts, tempoLocal } from '@wagmi/test'
import { beforeEach, describe, expect, test } from 'vitest'
import * as nonce from './nonce.js'

const account = tempoAccounts[0]

beforeEach(async () => {
  await fetch(`${tempoLocal.rpcUrls.default.http[0]}/restart`)
})

describe('getNonce', () => {
  test('default', async () => {
    const result = await nonce.getNonce(config, {
      account: account.address,
      nonceKey: 1n,
      chainId: tempoLocal.id,
    })
    expect(result).toMatch(expect.any(BigInt))
  })
})

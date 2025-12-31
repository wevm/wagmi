import { config, tempoAccounts, tempoLocal } from '@wagmi/test'
import { describe, expect, test } from 'vitest'
import * as nonce from './nonce.js'

const account = tempoAccounts[0]

describe('getNonce', () => {
  test('default', async () => {
    const result = await nonce.getNonce(config, {
      account: account.address,
      nonceKey: 1n,
      chainId: tempoLocal.id,
    })
    console.log(result)
    expect(result).toMatch(expect.any(BigInt))
  })
})

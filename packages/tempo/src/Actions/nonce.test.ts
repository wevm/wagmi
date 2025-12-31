import { beforeEach, describe, expect, test } from 'vitest'
import { accounts, config, tempoLocal } from '../../test/config.js'
import * as nonce from './nonce.js'

const account = accounts[0]

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
    console.log(result)
    expect(result).toMatch(expect.any(BigInt))
  })
})

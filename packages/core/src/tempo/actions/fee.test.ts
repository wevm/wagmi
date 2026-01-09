import { connect } from '@wagmi/core'
import { accounts, config, queryClient } from '@wagmi/test/tempo'
import { describe, expect, test } from 'vitest'
import { getUserToken, setUserToken, setUserTokenSync } from './fee.js'

const account = accounts[0]

describe('getUserToken', () => {
  test('default', async () => {
    const result = await getUserToken(config, {
      account,
    })
    expect(result).toMatchInlineSnapshot(`
      {
        "address": "0x20C0000000000000000000000000000000000001",
        "id": 1n,
      }
    `)
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const options = getUserToken.queryOptions(config, {
        account,
      })
      expect(await queryClient.fetchQuery(options)).toMatchInlineSnapshot(
        `
        {
          "address": "0x20C0000000000000000000000000000000000001",
          "id": 1n,
        }
      `,
      )
    })
  })
})

describe('setUserToken', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    const hash = await setUserToken(config, {
      account,
      token: '0x20C0000000000000000000000000000000000001',
    })
    expect(hash).toBeDefined()
  })
})

describe('setUserTokenSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    const result = await setUserTokenSync(config, {
      account,
      token: '0x20C0000000000000000000000000000000000001',
    })
    expect(result).toBeDefined()
  })
})

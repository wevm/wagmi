import { accounts, config, testChains, testConnector } from '@wagmi/test'
import { beforeEach, describe, expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'

const connector = config.connectors[0]!

describe('connect', () => {
  beforeEach(async () => {
    await disconnect(config, { connector })
  })

  test('default', async () => {
    const result = await connect(config, { connector })
    expect(result.accounts.length).toBeGreaterThan(0)
    expect(result.chainId).toEqual(expect.any(Number))
  })

  test('parameters: chainId', async () => {
    const chainId = testChains.anvilTwo.id
    const result = await connect(config, { connector, chainId })
    expect(result.chainId).toEqual(chainId)
  })

  test('parameters: connector', async () => {
    const connector_ = config._internal.setup(testConnector({ accounts }))
    const result = await connect(config, { connector: connector_ })
    expect(result.accounts.length).toBeGreaterThan(0)
    expect(result.chainId).toEqual(expect.any(Number))
  })

  test.todo('behavior: user rejected request')
})

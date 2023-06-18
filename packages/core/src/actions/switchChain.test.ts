import { config, testChains } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getAccount } from './getAccount.js'
import { switchChain } from './switchChain.js'

const connector = config.connectors[0]!

describe('switchChain', () => {
  test('default', async () => {
    await connect(config, { connector })

    const chainId1 = getAccount(config).chainId

    switchChain(config, { chainId: testChains.anvilTwo.chainId })

    const chainId2 = getAccount(config).chainId
    expect(chainId2).toBeDefined()
    expect(chainId1).not.toBe(chainId2)

    switchChain(config, { chainId: testChains.anvil.chainId })

    const chainId3 = getAccount(config).chainId
    expect(chainId3).toBeDefined()
    expect(chainId1).toBe(chainId3)

    await disconnect(config, { connector })
  })
})

describe('switchChainMutationOptions', () => {
  test.todo('default', () => {})
})

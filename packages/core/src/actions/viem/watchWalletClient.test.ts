import { beforeEach, describe, expect, it } from 'vitest'

import { setupConfig } from '../../../test'

import { connect, disconnect, switchNetwork } from '../accounts'
import { watchWalletClient } from './watchWalletClient'

describe('watchWalletClient', () => {
  beforeEach(() => {
    setupConfig()
  })

  it('listens to account changes', async () => {
    const config = setupConfig()

    let counter = 0
    const unsubscribe = watchWalletClient({}, (data) => {
      if (counter === 0) expect(data).toBeDefined()
      else if (counter === 1) expect(data).toMatchInlineSnapshot('null')
      counter += 1
    })

    await connect({ connector: config.connectors[0]! })
    await new Promise((res) => setTimeout(res, 0)) // wait until next tick
    await disconnect()
    unsubscribe()
  })

  it('listens to chain changes', async () => {
    const config = setupConfig()

    let counter = 0
    const unwatch = watchWalletClient({}, () => {
      counter += 1
    })

    await connect({ connector: config.connectors[0]! })
    await switchNetwork({ chainId: 4 })
    expect(counter).toEqual(2)
    unwatch()
  })
})

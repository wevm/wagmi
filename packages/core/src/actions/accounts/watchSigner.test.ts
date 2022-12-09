import { beforeEach, describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'

import { connect } from './connect'
import { disconnect } from './disconnect'
import { switchNetwork } from './switchNetwork'
import { watchSigner } from './watchSigner'

describe('watchSigner', () => {
  beforeEach(() => {
    setupClient()
  })

  it('listens to account changes', async () => {
    const client = setupClient()

    let counter = 0
    const unsubscribe = watchSigner({}, (data) => {
      if (counter === 0)
        expect(data).toMatchInlineSnapshot(`
          WalletSigner {
            "_isSigner": true,
            "_mnemonic": [Function],
            "_signingKey": [Function],
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "provider": "<Provider network={1} />",
          }
        `)
      else if (counter === 1) expect(data).toMatchInlineSnapshot(`null`)
      counter += 1
    })

    await connect({ connector: client.connectors[0]! })
    await new Promise((res) => setTimeout(res, 0)) // wait until next tick
    await disconnect()
    unsubscribe()
  })

  it('listens to chain changes', async () => {
    const client = setupClient()

    let counter = 0
    const unwatch = watchSigner({}, (data) => {
      if (counter === 0)
        expect(data).toMatchInlineSnapshot(`
          WalletSigner {
            "_isSigner": true,
            "_mnemonic": [Function],
            "_signingKey": [Function],
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "provider": "<Provider network={1} />",
          }
        `)
      else if (counter === 1)
        expect(data).toMatchInlineSnapshot(`
          WalletSigner {
            "_isSigner": true,
            "_mnemonic": [Function],
            "_signingKey": [Function],
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "provider": "<Provider network={1} />",
          }
        `)
      counter += 1
    })

    await connect({ connector: client.connectors[0]! })
    await switchNetwork({ chainId: 4 })
    unwatch()
  })
})

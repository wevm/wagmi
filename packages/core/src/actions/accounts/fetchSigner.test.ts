import { beforeEach, describe, expect, it } from 'vitest'

import { getSigners, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { fetchSigner } from './fetchSigner'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

describe('fetchSigner', () => {
  beforeEach(() => {
    setupClient()
  })

  describe('behavior', () => {
    it('not connected', async () => {
      expect(await fetchSigner()).toMatchInlineSnapshot(`null`)
    })

    it('connected', async () => {
      await connect({ connector })
      expect(await fetchSigner()).toMatchInlineSnapshot(`
        WalletSigner {
          "_isSigner": true,
          "_mnemonic": [Function],
          "_signingKey": [Function],
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "provider": "<Provider network={1} />",
        }
      `)
    })
  })
})

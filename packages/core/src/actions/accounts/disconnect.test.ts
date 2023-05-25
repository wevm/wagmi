import { beforeEach, describe, expect, it } from 'vitest'

import { getWalletClients, setupConfig } from '../../../test'
import type { Config } from '../../config'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { disconnect } from './disconnect'

const connector = new MockConnector({
  options: { walletClient: getWalletClients()[0]! },
})

describe('disconnect', () => {
  let config: Config
  beforeEach(() => {
    config = setupConfig()
  })

  describe('behavior', () => {
    it('can disconnect connected account', async () => {
      await connect({ connector })
      expect(config.data?.account).toMatchInlineSnapshot(
        `"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"`,
      )

      await disconnect()
      expect(config.data?.account).toMatchInlineSnapshot('undefined')
    })

    it('not connected', async () => {
      await disconnect()
      expect(config.data?.account).toMatchInlineSnapshot('undefined')
    })
  })
})

import { beforeEach, describe, expect, it } from 'vitest'

import { getWalletClients, setupConfig } from '../../test'
import { connect } from '../actions'
import { MockConnector } from '../connectors/mock'
import { assertActiveChain } from './assertActiveChain'

describe('assertActiveChain', () => {
  beforeEach(() => {
    setupConfig()
  })

  it('errors when on wrong chain', async () => {
    await connect({
      chainId: 5,
      connector: new MockConnector({
        options: {
          flags: { noSwitchChain: true },
          walletClient: getWalletClients()[0]!,
        },
      }),
    })
    expect(() =>
      assertActiveChain({ chainId: 1 }),
    ).toThrowErrorMatchingInlineSnapshot(
      '"Chain mismatch: Expected \\"Ethereum\\", received \\"Goerli\\"."',
    )
  })

  it('does not error when on correct chain', async () => {
    await connect({
      chainId: 1,
      connector: new MockConnector({
        options: {
          flags: { noSwitchChain: true },
          walletClient: getWalletClients()[0]!,
        },
      }),
    })
    assertActiveChain({ chainId: 1 })
  })
})

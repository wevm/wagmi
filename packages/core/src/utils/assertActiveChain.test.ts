import { beforeEach, describe, expect, it } from 'vitest'

import { getWalletClients, setupClient } from '../../test'
import { connect } from '../actions'
import { MockConnector } from '../connectors/mock'
import { assertActiveChain } from './assertActiveChain'

describe('assertActiveChain', () => {
  beforeEach(() => {
    setupClient()
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

  it('errors when wallet is on wrong chain', async () => {
    const walletClient = getWalletClients()[0]!
    walletClient.chain.id = 1
    await connect({
      chainId: 5,
      connector: new MockConnector({
        options: {
          flags: { noSwitchChain: true },
          walletClient: walletClient,
        },
      }),
    })
    expect(() =>
      assertActiveChain({ chainId: 5, walletClient }),
    ).toThrowErrorMatchingInlineSnapshot(
      '"Chain \\"5\\" not configured for connector \\"mock\\"."',
    )
  })
})

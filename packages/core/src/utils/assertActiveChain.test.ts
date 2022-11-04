import { beforeEach, describe, expect, it } from 'vitest'

import { getSigners, setupClient } from '../../test'
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
          signer: getSigners()[0]!,
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
          signer: getSigners()[0]!,
        },
      }),
    })
    assertActiveChain({ chainId: 1 })
  })

  it('errors when signer is on wrong chain', async () => {
    const signer = getSigners()[0]!
    ;(
      signer.provider as unknown as { network: { chainId: number } }
    ).network.chainId = 1
    await connect({
      chainId: 5,
      connector: new MockConnector({
        options: {
          flags: { noSwitchChain: true },
          signer,
        },
      }),
    })
    expect(() =>
      assertActiveChain({ chainId: 5, signer }),
    ).toThrowErrorMatchingInlineSnapshot(
      '"Chain \\"5\\" not configured for connector \\"mock\\"."',
    )
  })
})

import { ethers } from 'ethers'

import { defaultMnemonic, messageLookup } from '../testing'
import { normalizeMessage } from './normalizeMessage'
import { verifyNormalizedMessage } from './verifyNormalizedMessage'

const wallet = ethers.Wallet.fromMnemonic(defaultMnemonic)

describe('verifyNormalizedMessage', () => {
  it('string', async () => {
    const signature = await wallet.signMessage(
      normalizeMessage(messageLookup.basic),
    )
    const address = await wallet.getAddress()
    expect(verifyNormalizedMessage(messageLookup.basic, signature)).toEqual(
      address,
    )
  })

  it('bytes', async () => {
    const signature = await wallet.signMessage(
      normalizeMessage(messageLookup.bytes),
    )
    const address = await wallet.getAddress()
    expect(verifyNormalizedMessage(messageLookup.bytes, signature)).toEqual(
      address,
    )
  })
})

import { hashMessage } from 'ethers/lib/utils'

import { getProvider } from '../../test'
import { verifyEIP1271Signature } from './verifyEIP1271Signature'

const provider = getProvider()

const multisigAddress = '0xF7f52Dd34bc21eDA08c0b804C7c1dbc48375820f'

describe.skip('verifyEIP1271Signature', () => {
  it('is valid', async () => {
    const isValid = await verifyEIP1271Signature({
      address: multisigAddress,
      data: hashMessage('Hello World'),
      provider,
      signature: '0x',
    })
    expect(isValid).toEqual(true)
  })

  it('is invalid', async () => {
    const isValid = await verifyEIP1271Signature({
      address: multisigAddress,
      data: hashMessage('invalid message'),
      provider,
      signature: '0x',
    })
    expect(isValid).toEqual(false)
  })
})

import { hashMessage } from 'ethers/lib/utils'

import { ethers } from '../../test'
import { verifyEIP1271Signature } from './verifyEIP1271Signature'

const provider = ethers.provider

describe.skip('verifyEIP1271Signature', () => {
  it('is valid', async () => {
    const isValid = await verifyEIP1271Signature({
      address: '0x2E12888E480314DF227AC11e5FBa1F79029d091D',
      data: hashMessage('Hello World'),
      provider,
      signature: '0x',
    })
    expect(isValid).toEqual(true)
  })

  it('is invalid', async () => {
    const isValid = await verifyEIP1271Signature({
      address: '0x2E12888E480314DF227AC11e5FBa1F79029d091D',
      data: hashMessage('invalid message'),
      provider,
      signature: '0x',
    })
    expect(isValid).toEqual(false)
  })
})

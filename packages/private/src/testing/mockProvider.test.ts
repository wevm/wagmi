import { ethers } from 'ethers'

import { UserRejectedRequestError } from '../connectors'
import { defaultMnemonic } from './constants'
import { MockProvider } from './mockProvider'

describe('MockProvider', () => {
  let provider: MockProvider
  let wallet: ethers.Wallet
  beforeEach(() => {
    provider = new MockProvider({
      mnemonic: defaultMnemonic,
      network: 1,
    })
    wallet = ethers.Wallet.fromMnemonic(defaultMnemonic)
  })

  it('inits', () => {
    expect(provider).toBeDefined()
  })

  it('connects and disconnects', async () => {
    const accounts = await provider.enable()
    const account = await wallet.getAddress()
    expect(accounts[0]).toEqual(account)

    await provider.disconnect()
    const disconnected = await provider.getAccounts()
    expect(disconnected[0]).toEqual(undefined)
  })

  it('getAccounts', async () => {
    const disconnected = await provider.getAccounts()
    expect(disconnected[0]).toEqual(undefined)

    await provider.enable()
    const account = await wallet.getAddress()
    const connected = await provider.getAccounts()
    expect(connected[0]).toEqual(account)
  })

  it('fails connect', async () => {
    const provider = new MockProvider({
      flags: {
        failConnect: true,
      },
      mnemonic: defaultMnemonic,
      network: 1,
    })
    try {
      await provider.enable()
    } catch (error) {
      expect((<UserRejectedRequestError>error).message).toEqual(
        'User rejected request',
      )
    }
  })
})

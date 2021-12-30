import { ethers } from 'ethers'
import { verifyMessage } from 'ethers/lib/utils'

import { addressLookup, defaultMnemonic, messageLookup } from '../constants'
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

  describe('connect', () => {
    it('succeeds', async () => {
      const accounts = await provider.enable()
      const account = await wallet.getAddress()
      expect(accounts[0]).toEqual(account)
    })

    it('fails', async () => {
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
        expect(error).toMatchInlineSnapshot(
          `[UserRejectedRequestError: User rejected request]`,
        )
      }
    })
  })

  it('disconnect', async () => {
    await provider.enable()
    await provider.disconnect()
    const disconnected = await provider.getAccounts()
    expect(disconnected[0]).toEqual(undefined)
  })

  describe('getAccounts', () => {
    it('getAccounts', async () => {
      const disconnected = await provider.getAccounts()
      expect(disconnected[0]).toEqual(undefined)
    })

    it('getAccounts', async () => {
      await provider.enable()
      const account = await wallet.getAddress()
      const connected = await provider.getAccounts()
      expect(connected[0]).toEqual(account)
    })
  })

  describe('signMessage', () => {
    it('succeeds', async () => {
      const accounts = await provider.enable()
      const signature = await provider.signMessage(messageLookup.basic)
      const recovered = verifyMessage(messageLookup.basic, signature)
      const account = accounts[0]
      expect(account).toEqual(recovered)
    })

    it('fails', async () => {
      const provider = new MockProvider({
        flags: {
          failSign: true,
        },
        mnemonic: defaultMnemonic,
        network: 1,
      })
      try {
        await provider.enable()
        await provider.signMessage(messageLookup.basic)
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[UserRejectedRequestError: User rejected request]`,
        )
      }
    })
  })

  it('switchChain', async () => {
    await provider.switchChain(4)
    expect(provider.network.chainId).toEqual(4)
  })

  it('watchAsset', async () => {
    await provider.watchAsset({
      address: addressLookup.uniToken,
      decimals: 18,
      symbol: 'UNI',
    })
    expect(true).toEqual(true)
  })
})

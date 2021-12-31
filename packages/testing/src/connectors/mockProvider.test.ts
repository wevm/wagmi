import { ethers } from 'ethers'

import { addressLookup, defaultMnemonic } from '../constants'
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
    it('disconnected', async () => {
      const disconnected = await provider.getAccounts()
      expect(disconnected[0]).toEqual(undefined)
    })

    it('connected', async () => {
      await provider.enable()
      const account = await wallet.getAddress()
      const connected = await provider.getAccounts()
      expect(connected[0]).toEqual(account)
    })
  })

  describe('getSigner', () => {
    it('disconnected', () => {
      try {
        provider.getSigner()
      } catch (error) {
        expect(error).toMatchInlineSnapshot(`[Error: Signer not found]`)
      }
    })

    it('connected', async () => {
      await provider.enable()
      const signer = provider.getSigner()
      expect(signer).toBeDefined()
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

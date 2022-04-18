import { Signer } from 'ethers/lib/ethers'

import { getSigners } from '../../../test'
import { MockProvider } from './provider'

describe('MockProvider', () => {
  let provider: MockProvider
  let signer: Signer
  beforeEach(() => {
    const signers = getSigners()
    signer = signers[0]
    provider = new MockProvider({ signer })
  })

  it('constructor', () => {
    expect(provider).toBeDefined()
  })

  describe('connect', () => {
    it('succeeds', async () => {
      const accounts = await provider.enable()
      const account = await signer.getAddress()
      expect(accounts[0]).toEqual(account)
    })

    it('fails', async () => {
      const signers = getSigners()
      signer = signers[0]
      const provider = new MockProvider({
        flags: { failConnect: true },
        signer,
      })
      await expect(
        provider.enable(),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"User rejected request"`)
    })
  })

  it('disconnect', async () => {
    await provider.enable()
    await provider.disconnect()
    const accounts = await provider.getAccounts()
    expect(accounts[0]).toEqual(undefined)
  })

  describe('getAccounts', () => {
    it('disconnected', async () => {
      const accounts = await provider.getAccounts()
      expect(accounts[0]).toEqual(undefined)
    })

    it('connected', async () => {
      await provider.enable()
      const account = await signer.getAddress()
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
      expect(provider.getSigner()).toMatchInlineSnapshot(`
        JsonRpcSigner {
          "_address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "_index": null,
          "_isSigner": true,
          "provider": "<Provider network={31337} />",
        }
      `)
    })
  })

  describe('switchChain', () => {
    it('succeeds', async () => {
      await provider.switchChain(4)
      expect(provider.network.chainId).toEqual(4)
    })

    it('fails', async () => {
      const provider = new MockProvider({
        flags: { failSwitchChain: true },
        signer,
      })
      await expect(
        provider.switchChain(4),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"User rejected request"`)
    })
  })

  it('watchAsset', async () => {
    expect(
      await provider.watchAsset({
        address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        decimals: 18,
        symbol: 'UNI',
      }),
    ).toEqual(true)
  })
})

import { ethers } from 'ethers'
import { defaultChains } from 'wagmi-private'

import { contracts, wallets } from '../constants'
import { MockConnector } from './mockConnector'

describe('MockConnector', () => {
  let connector: MockConnector
  let wallet: ethers.Wallet
  beforeEach(() => {
    connector = new MockConnector({
      chains: defaultChains,
      options: {
        network: 1,
        privateKey: wallets.ethers1.privateKey,
      },
    })
    wallet = new ethers.Wallet(wallets.ethers1.privateKey)
  })

  it('inits', () => {
    expect(connector.name).toEqual('Mock')
    expect(connector.ready).toEqual(true)
  })

  describe('connect', () => {
    it('succeeds', async () => {
      const onChange = jest.fn()
      connector.on('change', onChange)

      const data = await connector.connect()
      expect(onChange).toBeCalledTimes(1)
      expect(data.account).toEqual(wallet.address)
      expect(data.chain.id).toEqual(1)
      expect(data.chain.unsupported).toEqual(false)
      connector.isAuthorized().then((x) => expect(x).toEqual(true))
    })

    it('fails', async () => {
      const connector = new MockConnector({
        chains: defaultChains,
        options: {
          flags: {
            failConnect: true,
          },
          network: 1,
          privateKey: wallets.ethers1.privateKey,
        },
      })
      try {
        await connector.connect()
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[UserRejectedRequestError: User rejected request]`,
        )
      }
    })
  })

  it('disconnect', async () => {
    const onDisconnect = jest.fn()
    connector.on('disconnect', onDisconnect)

    await connector.connect()
    await connector.disconnect()
    expect(onDisconnect).toBeCalledTimes(1)
  })

  it('getAccount', async () => {
    await connector.connect()
    const account = await connector.getAccount()
    expect(account).toEqual(wallet.address)
  })

  it('getChainId', async () => {
    const chainId = await connector.getChainId()
    expect(chainId).toEqual(1)
  })

  it('getSigner', async () => {
    await connector.connect()
    const signer = await connector.getSigner()
    expect(signer).toBeDefined()
  })

  it('switchChain', async () => {
    const onChange = jest.fn()
    connector.on('change', onChange)

    const chainIdBefore = await connector.getChainId()
    expect(chainIdBefore).toEqual(1)
    await connector.connect()
    await connector.switchChain(4)
    expect(onChange).toBeCalledTimes(2)
    const chainIdAfter = await connector.getChainId()
    expect(chainIdAfter).toEqual(4)
  })

  it('watchAsset', async () => {
    await connector.connect()
    await connector.watchAsset({
      address: contracts.uniToken,
      decimals: 18,
      symbol: 'UNI',
    })
    expect(true).toEqual(true)
  })
})

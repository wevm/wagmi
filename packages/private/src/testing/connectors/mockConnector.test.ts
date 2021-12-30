import { ethers } from 'ethers'

import { defaultChains } from '../../constants'
import { verifyNormalizedMessage } from '../../utils'
import { defaultMnemonic, messageLookup } from '../constants'
import { MockConnector } from './mockConnector'

describe('MockConnector', () => {
  let connector: MockConnector
  beforeEach(() => {
    connector = new MockConnector({
      chains: defaultChains,
      options: {
        mnemonic: defaultMnemonic,
        network: 1,
      },
    })
  })

  it('inits', () => {
    expect(connector.name).toEqual('Mock')
    expect(connector.ready).toEqual(true)
  })

  describe('connect', () => {
    it('succeeds', async () => {
      const onChange = jest.fn()
      connector.on('change', onChange)
      const wallet = ethers.Wallet.fromMnemonic(defaultMnemonic)
      const data = await connector.connect()
      expect(onChange).toBeCalledTimes(1)
      expect(data.account).toEqual(wallet.address)
      expect(data.chainId).toEqual(1)
      connector.isAuthorized().then((x) => expect(x).toEqual(true))
    })

    it('fails', async () => {
      const connector = new MockConnector({
        chains: defaultChains,
        options: {
          flags: {
            failConnect: true,
          },
          mnemonic: defaultMnemonic,
          network: 1,
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
    const wallet = ethers.Wallet.fromMnemonic(defaultMnemonic)
    expect(account).toEqual(wallet.address)
  })

  it('getChainId', async () => {
    const chainId = await connector.getChainId()
    expect(chainId).toEqual(1)
  })

  describe('signMessage', () => {
    it('succeeds', async () => {
      const data = await connector.connect()
      const signature = await connector.signMessage({
        message: messageLookup.basic,
      })
      const recovered = verifyNormalizedMessage(messageLookup.basic, signature)
      expect(data.account).toEqual(recovered)
    })

    it('fails', async () => {
      const connector = new MockConnector({
        chains: defaultChains,
        options: {
          flags: {
            failSign: true,
          },
          mnemonic: defaultMnemonic,
          network: 1,
        },
      })
      try {
        await connector.connect()
        await connector.signMessage({
          message: messageLookup.basic,
        })
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `[UserRejectedRequestError: User rejected request]`,
        )
      }
    })
  })
})

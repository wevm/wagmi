import { ethers } from 'ethers'

import { UserRejectedRequestError } from '../../errors'
import { defaultChains } from '../../constants'
import { defaultMnemonic } from '../constants'
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

  it('connects and disconnects', async () => {
    const onDisconnect = jest.fn()
    const onChange = jest.fn()
    const onError = jest.fn()
    connector.on('change', onChange)
    connector.on('disconnect', onDisconnect)
    connector.on('error', onError)

    const wallet = ethers.Wallet.fromMnemonic(defaultMnemonic)
    const data = await connector.connect()
    expect(onChange).toBeCalledTimes(1)
    expect(data.account).toEqual(wallet.address)
    expect(data.chainId).toEqual(1)

    connector.isAuthorized().then((x) => expect(x).toEqual(true))
    await connector.disconnect()
    // connector.isAuthorized().then((x) => expect(x).toEqual(false))
    expect(onDisconnect).toBeCalledTimes(1)
  })

  it('fails connect', async () => {
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
      expect((<UserRejectedRequestError>error).message).toEqual(
        'User rejected request',
      )
    }
  })

  it('getChainId', async () => {
    const chainId = await connector.getChainId()
    expect(chainId).toEqual(1)
  })
})

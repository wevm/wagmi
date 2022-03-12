import { Signer } from 'ethers/lib/ethers'

import { getSigners } from '../../../test'
import { defaultChains } from '../../constants'
import { MockConnector } from './connector'

describe('MockConnector', () => {
  let connector: MockConnector
  let signer: Signer
  beforeEach(() => {
    const signers = getSigners()
    signer = signers[0]
    connector = new MockConnector({
      chains: defaultChains,
      options: {
        signer,
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

      const { provider, ...data } = await connector.connect()
      expect(onChange).toBeCalledTimes(1)
      expect(data).toMatchInlineSnapshot(`
        {
          "account": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "chain": {
            "id": 1,
            "unsupported": false,
          },
        }
      `)
      expect(provider).toBeDefined()
      connector.isAuthorized().then((x) => expect(x).toEqual(true))
    })

    it('fails', async () => {
      const connector = new MockConnector({
        chains: defaultChains,
        options: {
          flags: {
            failConnect: true,
          },
          signer,
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
    expect(account).toEqual(await signer.getAddress())
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
    await connector.switchChain?.(4)
    expect(onChange).toBeCalledTimes(2)
    const chainIdAfter = await connector.getChainId()
    expect(chainIdAfter).toEqual(4)
  })

  it('watchAsset', async () => {
    await connector.connect()
    await connector.watchAsset({
      address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
      decimals: 18,
      symbol: 'UNI',
    })
    expect(true).toEqual(true)
  })
})

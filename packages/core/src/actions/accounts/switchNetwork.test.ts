import { getSigners, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { allChains } from '../../constants'
import { connect } from './connect'
import { switchNetwork } from './switchNetwork'

const connector = new MockConnector({
  chains: allChains,
  options: { signer: getSigners()[0]! },
})

describe('switchNetwork', () => {
  beforeEach(() => setupClient())

  describe('args', () => {
    it('chainId', async () => {
      await connect({ connector })
      expect(await switchNetwork({ chainId: 69 })).toMatchInlineSnapshot(`
        {
          "blockExplorers": {
            "default": {
              "name": "Etherscan",
              "url": "https://kovan-optimistic.etherscan.io",
            },
            "etherscan": {
              "name": "Etherscan",
              "url": "https://kovan-optimistic.etherscan.io",
            },
          },
          "id": 69,
          "multicall": {
            "address": "0xca11bde05977b3631167028862be2a173976ca11",
            "blockCreated": 1418387,
          },
          "name": "Optimism Kovan",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Kovan Ether",
            "symbol": "KOR",
          },
          "network": "optimism-kovan",
          "rpcUrls": {
            "alchemy": "https://opt-kovan.g.alchemy.com/v2",
            "default": "https://kovan.optimism.io",
            "infura": "https://optimism-kovan.infura.io/v3",
            "public": "https://kovan.optimism.io",
          },
          "testnet": true,
        }
      `)
    })
  })

  describe('behavior', () => {
    it('user rejected request', async () => {
      await connect({
        connector: new MockConnector({
          options: {
            flags: { failSwitchChain: true },
            signer: getSigners()[0]!,
          },
        }),
      })
      await expect(
        switchNetwork({ chainId: 69 }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"User rejected request"`)
    })

    it('not connected', async () => {
      await expect(
        switchNetwork({ chainId: 69 }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('not supported by connector', async () => {
      await connect({
        connector: new MockConnector({
          options: {
            flags: { noSwitchChain: true },
            signer: getSigners()[0]!,
          },
        }),
      })
      await expect(
        switchNetwork({ chainId: 4 }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"\\"Mock\\" does not support programmatic chain switching."`,
      )
      await expect(
        switchNetwork({ chainId: 69 }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"\\"Mock\\" does not support programmatic chain switching."`,
      )
    })
  })
})

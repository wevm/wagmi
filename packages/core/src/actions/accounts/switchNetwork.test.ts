import { getSigners, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { switchNetwork } from './switchNetwork'

const connector = new MockConnector({
  options: { signer: getSigners()[0] },
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
            signer: getSigners()[0],
          },
        }),
      })
      await expect(
        switchNetwork({ chainId: 69 }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"User rejected request"`)
    })

    it('not supported by connector', async () => {
      await connect({
        connector: new MockConnector({
          options: {
            flags: { noSwitchChain: true },
            signer: getSigners()[0],
          },
        }),
      })
      await expect(
        switchNetwork({ chainId: 69 }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Switch chain not supported by connector"`,
      )
    })
  })
})

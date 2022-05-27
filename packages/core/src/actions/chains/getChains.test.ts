import { setupClient } from '../../../test'
import { chain } from '../../constants'
import { getChains } from './getChains'

describe('getChains', () => {
  beforeEach(() => setupClient({ chains: [chain.mainnet, chain.polygon] }))

  it('returns the chains', () => {
    expect(getChains()).toMatchInlineSnapshot(`
      {
        "chains": [
          {
            "blockExplorers": {
              "default": {
                "name": "Etherscan",
                "url": "https://etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://etherscan.io",
              },
            },
            "id": 1,
            "multicall": {
              "address": "0xca11bde05977b3631167028862be2a173976ca11",
              "blockCreated": 14353601,
            },
            "name": "Ethereum",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ether",
              "symbol": "ETH",
            },
            "network": "homestead",
            "rpcUrls": {
              "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
              "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://mainnet.infura.io/v3",
            },
          },
          {
            "blockExplorers": {
              "default": {
                "name": "PolygonScan",
                "url": "https://polygonscan.com",
              },
              "etherscan": {
                "name": "PolygonScan",
                "url": "https://polygonscan.com",
              },
            },
            "id": 137,
            "multicall": {
              "address": "0xca11bde05977b3631167028862be2a173976ca11",
              "blockCreated": 25770160,
            },
            "name": "Polygon",
            "nativeCurrency": {
              "decimals": 18,
              "name": "MATIC",
              "symbol": "MATIC",
            },
            "network": "matic",
            "rpcUrls": {
              "alchemy": "https://polygon-mainnet.g.alchemy.com/v2",
              "default": "https://polygon-rpc.com",
              "infura": "https://polygon-mainnet.infura.io/v3",
            },
          },
        ],
      }
    `)
  })
})

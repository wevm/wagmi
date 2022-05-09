import { getSigners, setupWagmiClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { getNetwork } from './getNetwork'

const connector = new MockConnector({
  options: { signer: getSigners()[0] },
})

describe('getNetwork', () => {
  beforeEach(() => setupWagmiClient())

  describe('behavior', () => {
    it('not connected', async () => {
      expect(getNetwork()).toMatchInlineSnapshot(`
        {
          "chain": undefined,
          "chains": [],
        }
      `)
    })

    it('connected', async () => {
      await connect({ connector })
      expect(getNetwork()).toMatchInlineSnapshot(`
        {
          "chain": {
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
            "displayName": "Ethereum",
            "id": 1,
            "name": "homestead",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ether",
              "symbol": "ETH",
            },
            "rpcUrls": {
              "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
              "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              "infura": "https://mainnet.infura.io/v3",
            },
            "unsupported": false,
          },
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
              "displayName": "Ethereum",
              "id": 1,
              "name": "homestead",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ether",
                "symbol": "ETH",
              },
              "rpcUrls": {
                "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
                "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://mainnet.infura.io/v3",
              },
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://ropsten.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://ropsten.etherscan.io",
                },
              },
              "displayName": "Ropsten",
              "id": 3,
              "name": "ropsten",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ropsten Ether",
                "symbol": "ropETH",
              },
              "rpcUrls": {
                "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
                "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://ropsten.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://rinkeby.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://rinkeby.etherscan.io",
                },
              },
              "displayName": "Rinkeby",
              "id": 4,
              "name": "rinkeby",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Rinkeby Ether",
                "symbol": "rETH",
              },
              "rpcUrls": {
                "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://rinkeby.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://goerli.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://goerli.etherscan.io",
                },
              },
              "displayName": "Goerli",
              "id": 5,
              "name": "goerli",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Goerli Ether",
                "symbol": "gETH",
              },
              "rpcUrls": {
                "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://goerli.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://kovan.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://kovan.etherscan.io",
                },
              },
              "displayName": "Kovan",
              "id": 42,
              "name": "kovan",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Kovan Ether",
                "symbol": "kETH",
              },
              "rpcUrls": {
                "alchemy": "https://eth-kovan.alchemyapi.io/v2",
                "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://kovan.infura.io/v3",
              },
              "testnet": true,
            },
          ],
        }
      `)
    })

    it('unsupported chain', async () => {
      await connect({
        connector: new MockConnector({
          options: {
            network: 69,
            signer: getSigners()[0],
          },
        }),
      })
      expect(getNetwork()).toMatchInlineSnapshot(`
        {
          "chain": {
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
            "displayName": "Optimism Kovan",
            "id": 69,
            "name": "optimism-kovan",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Kovan Ether",
              "symbol": "KOR",
            },
            "rpcUrls": {
              "alchemy": "https://opt-kovan.g.alchemy.com/v2",
              "default": "https://kovan.optimism.io",
              "infura": "https://optimism-kovan.infura.io/v3",
            },
            "testnet": true,
            "unsupported": true,
          },
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
              "displayName": "Ethereum",
              "id": 1,
              "name": "homestead",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ether",
                "symbol": "ETH",
              },
              "rpcUrls": {
                "alchemy": "https://eth-mainnet.alchemyapi.io/v2",
                "default": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://mainnet.infura.io/v3",
              },
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://ropsten.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://ropsten.etherscan.io",
                },
              },
              "displayName": "Ropsten",
              "id": 3,
              "name": "ropsten",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ropsten Ether",
                "symbol": "ropETH",
              },
              "rpcUrls": {
                "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
                "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://ropsten.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://rinkeby.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://rinkeby.etherscan.io",
                },
              },
              "displayName": "Rinkeby",
              "id": 4,
              "name": "rinkeby",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Rinkeby Ether",
                "symbol": "rETH",
              },
              "rpcUrls": {
                "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://rinkeby.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://goerli.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://goerli.etherscan.io",
                },
              },
              "displayName": "Goerli",
              "id": 5,
              "name": "goerli",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Goerli Ether",
                "symbol": "gETH",
              },
              "rpcUrls": {
                "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://goerli.infura.io/v3",
              },
              "testnet": true,
            },
            {
              "blockExplorers": {
                "default": {
                  "name": "Etherscan",
                  "url": "https://kovan.etherscan.io",
                },
                "etherscan": {
                  "name": "Etherscan",
                  "url": "https://kovan.etherscan.io",
                },
              },
              "displayName": "Kovan",
              "id": 42,
              "name": "kovan",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Kovan Ether",
                "symbol": "kETH",
              },
              "rpcUrls": {
                "alchemy": "https://eth-kovan.alchemyapi.io/v2",
                "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://kovan.infura.io/v3",
              },
              "testnet": true,
            },
          ],
        }
      `)
    })
  })
})

import { getSigners, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { getNetwork } from './getNetwork'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

describe('getNetwork', () => {
  beforeEach(() => setupClient())

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
            "ens": {
              "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
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
              "public": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
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
                "public": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 3,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 12063863,
              },
              "name": "Ropsten",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ropsten Ether",
                "symbol": "ROP",
              },
              "network": "ropsten",
              "rpcUrls": {
                "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
                "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://ropsten.infura.io/v3",
                "public": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 4,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 10299530,
              },
              "name": "Rinkeby",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Rinkeby Ether",
                "symbol": "RIN",
              },
              "network": "rinkeby",
              "rpcUrls": {
                "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://rinkeby.infura.io/v3",
                "public": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 5,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 6507670,
              },
              "name": "Goerli",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Goerli Ether",
                "symbol": "GOR",
              },
              "network": "goerli",
              "rpcUrls": {
                "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://goerli.infura.io/v3",
                "public": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
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
              "id": 42,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 30285908,
              },
              "name": "Kovan",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Kovan Ether",
                "symbol": "KOV",
              },
              "network": "kovan",
              "rpcUrls": {
                "alchemy": "https://eth-kovan.alchemyapi.io/v2",
                "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://kovan.infura.io/v3",
                "public": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              },
              "testnet": true,
            },
          ],
        }
      `)
    })

    it('unsupported chain', async () => {
      await connect({
        chainId: 69,
        connector: new MockConnector({
          options: {
            signer: getSigners()[0]!,
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
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
                "public": "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 3,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 12063863,
              },
              "name": "Ropsten",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ropsten Ether",
                "symbol": "ROP",
              },
              "network": "ropsten",
              "rpcUrls": {
                "alchemy": "https://eth-ropsten.alchemyapi.io/v2",
                "default": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://ropsten.infura.io/v3",
                "public": "https://eth-ropsten.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 4,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 10299530,
              },
              "name": "Rinkeby",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Rinkeby Ether",
                "symbol": "RIN",
              },
              "network": "rinkeby",
              "rpcUrls": {
                "alchemy": "https://eth-rinkeby.alchemyapi.io/v2",
                "default": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://rinkeby.infura.io/v3",
                "public": "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
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
              "ens": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "id": 5,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 6507670,
              },
              "name": "Goerli",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Goerli Ether",
                "symbol": "GOR",
              },
              "network": "goerli",
              "rpcUrls": {
                "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                "default": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://goerli.infura.io/v3",
                "public": "https://eth-goerli.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
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
              "id": 42,
              "multicall": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 30285908,
              },
              "name": "Kovan",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Kovan Ether",
                "symbol": "KOV",
              },
              "network": "kovan",
              "rpcUrls": {
                "alchemy": "https://eth-kovan.alchemyapi.io/v2",
                "default": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
                "infura": "https://kovan.infura.io/v3",
                "public": "https://eth-kovan.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
              },
              "testnet": true,
            },
          ],
        }
      `)
    })
  })
})

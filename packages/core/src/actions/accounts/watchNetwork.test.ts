import { describe, expect, it } from 'vitest'

import { setupClient } from '../../../test'
import { connect } from './connect'
import { GetNetworkResult } from './getNetwork'
import { switchNetwork } from './switchNetwork'
import { watchNetwork } from './watchNetwork'

describe('watchNetwork', () => {
  it('callback receives data', async () => {
    const client = setupClient()

    await connect({ connector: client.connectors[0]! })

    const networks: GetNetworkResult[] = []
    const unwatch = watchNetwork((data) => networks.push(data))

    await switchNetwork({ chainId: 5 })
    await switchNetwork({ chainId: 1 })
    unwatch()

    expect(networks).toMatchInlineSnapshot(`
      [
        {
          "chain": {
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
              "symbol": "ETH",
            },
            "network": "goerli",
            "rpcUrls": {
              "alchemy": "https://eth-goerli.alchemyapi.io/v2",
              "default": "https://rpc.ankr.com/eth_goerli",
              "infura": "https://goerli.infura.io/v3",
              "public": "https://rpc.ankr.com/eth_goerli",
            },
            "testnet": true,
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
                "default": "https://cloudflare-eth.com",
                "infura": "https://mainnet.infura.io/v3",
                "public": "https://cloudflare-eth.com",
              },
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
                "symbol": "ETH",
              },
              "network": "goerli",
              "rpcUrls": {
                "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                "default": "https://rpc.ankr.com/eth_goerli",
                "infura": "https://goerli.infura.io/v3",
                "public": "https://rpc.ankr.com/eth_goerli",
              },
              "testnet": true,
            },
          ],
        },
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
              "default": "http://127.0.0.1:8545",
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
                "default": "https://cloudflare-eth.com",
                "infura": "https://mainnet.infura.io/v3",
                "public": "https://cloudflare-eth.com",
              },
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
                "symbol": "ETH",
              },
              "network": "goerli",
              "rpcUrls": {
                "alchemy": "https://eth-goerli.alchemyapi.io/v2",
                "default": "https://rpc.ankr.com/eth_goerli",
                "infura": "https://goerli.infura.io/v3",
                "public": "https://rpc.ankr.com/eth_goerli",
              },
              "testnet": true,
            },
          ],
        },
      ]
    `)
  })
})

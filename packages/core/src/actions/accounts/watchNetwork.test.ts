import { describe, expect, it } from 'vitest'

import { setupConfig } from '../../../test'
import { connect } from './connect'
import type { GetNetworkResult } from './getNetwork'
import { switchNetwork } from './switchNetwork'
import { watchNetwork } from './watchNetwork'

describe('watchNetwork', () => {
  it('callback receives data', async () => {
    const config = setupConfig()

    await connect({ connector: config.connectors[0]! })

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
            "contracts": {
              "ensRegistry": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "ensUniversalResolver": {
                "address": "0x56522D00C410a43BFfDF00a9A569489297385790",
                "blockCreated": 8765204,
              },
              "multicall3": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 6507670,
              },
            },
            "id": 5,
            "name": "Goerli",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Goerli Ether",
              "symbol": "ETH",
            },
            "network": "goerli",
            "rpcUrls": {
              "alchemy": {
                "http": [
                  "https://eth-goerli.g.alchemy.com/v2",
                ],
                "webSocket": [
                  "wss://eth-goerli.g.alchemy.com/v2",
                ],
              },
              "default": {
                "http": [
                  "https://rpc.ankr.com/eth_goerli",
                ],
              },
              "infura": {
                "http": [
                  "https://goerli.infura.io/v3",
                ],
                "webSocket": [
                  "wss://goerli.infura.io/ws/v3",
                ],
              },
              "public": {
                "http": [
                  "https://rpc.ankr.com/eth_goerli",
                ],
              },
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
              "contracts": {
                "ensRegistry": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "ensUniversalResolver": {
                  "address": "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62",
                  "blockCreated": 16966585,
                },
                "multicall3": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 14353601,
                },
              },
              "id": 1,
              "name": "Ethereum",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ether",
                "symbol": "ETH",
              },
              "network": "homestead",
              "rpcUrls": {
                "alchemy": {
                  "http": [
                    "https://eth-mainnet.g.alchemy.com/v2",
                  ],
                  "webSocket": [
                    "wss://eth-mainnet.g.alchemy.com/v2",
                  ],
                },
                "default": {
                  "http": [
                    "https://cloudflare-eth.com",
                  ],
                },
                "infura": {
                  "http": [
                    "https://mainnet.infura.io/v3",
                  ],
                  "webSocket": [
                    "wss://mainnet.infura.io/ws/v3",
                  ],
                },
                "public": {
                  "http": [
                    "https://cloudflare-eth.com",
                  ],
                },
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
              "contracts": {
                "ensRegistry": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "ensUniversalResolver": {
                  "address": "0x56522D00C410a43BFfDF00a9A569489297385790",
                  "blockCreated": 8765204,
                },
                "multicall3": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 6507670,
                },
              },
              "id": 5,
              "name": "Goerli",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Goerli Ether",
                "symbol": "ETH",
              },
              "network": "goerli",
              "rpcUrls": {
                "alchemy": {
                  "http": [
                    "https://eth-goerli.g.alchemy.com/v2",
                  ],
                  "webSocket": [
                    "wss://eth-goerli.g.alchemy.com/v2",
                  ],
                },
                "default": {
                  "http": [
                    "https://rpc.ankr.com/eth_goerli",
                  ],
                },
                "infura": {
                  "http": [
                    "https://goerli.infura.io/v3",
                  ],
                  "webSocket": [
                    "wss://goerli.infura.io/ws/v3",
                  ],
                },
                "public": {
                  "http": [
                    "https://rpc.ankr.com/eth_goerli",
                  ],
                },
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
            "contracts": {
              "ensRegistry": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              },
              "ensUniversalResolver": {
                "address": "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62",
                "blockCreated": 16966585,
              },
              "multicall3": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 14353601,
              },
            },
            "id": 1,
            "name": "Ethereum",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ether",
              "symbol": "ETH",
            },
            "network": "homestead",
            "rpcUrls": {
              "default": {
                "http": [
                  "http://127.0.0.1:8545",
                ],
                "webSocket": [
                  "ws://127.0.0.1:8545",
                ],
              },
              "public": {
                "http": [
                  "http://127.0.0.1:8545",
                ],
                "webSocket": [
                  "ws://127.0.0.1:8545",
                ],
              },
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
              "contracts": {
                "ensRegistry": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "ensUniversalResolver": {
                  "address": "0xc0497E381f536Be9ce14B0dD3817cBcAe57d2F62",
                  "blockCreated": 16966585,
                },
                "multicall3": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 14353601,
                },
              },
              "id": 1,
              "name": "Ethereum",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Ether",
                "symbol": "ETH",
              },
              "network": "homestead",
              "rpcUrls": {
                "alchemy": {
                  "http": [
                    "https://eth-mainnet.g.alchemy.com/v2",
                  ],
                  "webSocket": [
                    "wss://eth-mainnet.g.alchemy.com/v2",
                  ],
                },
                "default": {
                  "http": [
                    "https://cloudflare-eth.com",
                  ],
                },
                "infura": {
                  "http": [
                    "https://mainnet.infura.io/v3",
                  ],
                  "webSocket": [
                    "wss://mainnet.infura.io/ws/v3",
                  ],
                },
                "public": {
                  "http": [
                    "https://cloudflare-eth.com",
                  ],
                },
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
              "contracts": {
                "ensRegistry": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
                },
                "ensUniversalResolver": {
                  "address": "0x56522D00C410a43BFfDF00a9A569489297385790",
                  "blockCreated": 8765204,
                },
                "multicall3": {
                  "address": "0xca11bde05977b3631167028862be2a173976ca11",
                  "blockCreated": 6507670,
                },
              },
              "id": 5,
              "name": "Goerli",
              "nativeCurrency": {
                "decimals": 18,
                "name": "Goerli Ether",
                "symbol": "ETH",
              },
              "network": "goerli",
              "rpcUrls": {
                "alchemy": {
                  "http": [
                    "https://eth-goerli.g.alchemy.com/v2",
                  ],
                  "webSocket": [
                    "wss://eth-goerli.g.alchemy.com/v2",
                  ],
                },
                "default": {
                  "http": [
                    "https://rpc.ankr.com/eth_goerli",
                  ],
                },
                "infura": {
                  "http": [
                    "https://goerli.infura.io/v3",
                  ],
                  "webSocket": [
                    "wss://goerli.infura.io/ws/v3",
                  ],
                },
                "public": {
                  "http": [
                    "https://rpc.ankr.com/eth_goerli",
                  ],
                },
              },
              "testnet": true,
            },
          ],
        },
      ]
    `)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'

import { getSigners, setupClient } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { getNetwork } from './getNetwork'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

describe('getNetwork', () => {
  beforeEach(() => {
    setupClient()
  })

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
            "contracts": {
              "ensRegistry": {
                "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
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
              },
              "testnet": true,
            },
          ],
        }
      `)
    })

    it('unsupported chain', async () => {
      await connect({
        chainId: 10,
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
                "url": "https://optimistic.etherscan.io",
              },
              "etherscan": {
                "name": "Etherscan",
                "url": "https://optimistic.etherscan.io",
              },
            },
            "contracts": {
              "multicall3": {
                "address": "0xca11bde05977b3631167028862be2a173976ca11",
                "blockCreated": 4286263,
              },
            },
            "id": 10,
            "name": "Optimism",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ether",
              "symbol": "ETH",
            },
            "network": "optimism",
            "rpcUrls": {
              "alchemy": {
                "http": [
                  "https://opt-mainnet.g.alchemy.com/v2",
                ],
                "webSocket": [
                  "wss://opt-mainnet.g.alchemy.com/v2",
                ],
              },
              "default": {
                "http": [
                  "https://mainnet.optimism.io",
                ],
              },
              "infura": {
                "http": [
                  "https://optimism-mainnet.infura.io/v3",
                ],
                "webSocket": [
                  "wss://optimism-mainnet.infura.io/ws/v3",
                ],
              },
            },
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
              "contracts": {
                "ensRegistry": {
                  "address": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
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
              },
              "testnet": true,
            },
          ],
        }
      `)
    })
  })
})

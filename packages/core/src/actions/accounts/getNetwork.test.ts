import { setupWagmiClient } from '../../../test'
import { wagmiClient } from '../../client'
import { connect } from './connect'
import { getNetwork } from './getNetwork'

describe('getNetwork', () => {
  it('not connected', () => {
    setupWagmiClient()
    expect(getNetwork()).toMatchInlineSnapshot(`
      {
        "chain": undefined,
        "chains": [],
      }
    `)
  })

  it('connected', async () => {
    setupWagmiClient()
    await connect(wagmiClient.connectors[0])
    expect(getNetwork()).toMatchInlineSnapshot(`
      {
        "chain": {
          "blockExplorers": [
            {
              "name": "Etherscan",
              "url": "https://etherscan.io",
            },
          ],
          "id": 1,
          "name": "Mainnet",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Ether",
            "symbol": "ETH",
          },
          "rpcUrls": [
            "https://mainnet.infura.io/v3",
          ],
          "unsupported": false,
        },
        "chains": [
          {
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://etherscan.io",
              },
            ],
            "id": 1,
            "name": "Mainnet",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ether",
              "symbol": "ETH",
            },
            "rpcUrls": [
              "https://mainnet.infura.io/v3",
            ],
          },
          {
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://ropsten.etherscan.io",
              },
            ],
            "id": 3,
            "name": "Ropsten",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ropsten Ether",
              "symbol": "ropETH",
            },
            "rpcUrls": [
              "https://ropsten.infura.io/v3",
            ],
            "testnet": true,
          },
          {
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://rinkeby.etherscan.io",
              },
            ],
            "id": 4,
            "name": "Rinkeby",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Rinkeby Ether",
              "symbol": "rETH",
            },
            "rpcUrls": [
              "https://rinkeby.infura.io/v3",
            ],
            "testnet": true,
          },
          {
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://goerli.etherscan.io",
              },
            ],
            "id": 5,
            "name": "Goerli",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Goerli Ether",
              "symbol": "gETH",
            },
            "rpcUrls": [
              "https://goerli.infura.io/v3",
            ],
            "testnet": true,
          },
          {
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://kovan.etherscan.io",
              },
            ],
            "id": 42,
            "name": "Kovan",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Kovan Ether",
              "symbol": "kETH",
            },
            "rpcUrls": [
              "https://kovan.infura.io/v3",
            ],
            "testnet": true,
          },
        ],
      }
    `)
  })

  it('unsupported chain', async () => {
    setupWagmiClient({ chainId: 69 })
    await connect(wagmiClient.connectors[0])
    expect(getNetwork()).toMatchInlineSnapshot(`
      {
        "chain": {
          "blockExplorers": [
            {
              "name": "Etherscan",
              "url": "https://kovan-optimistic.etherscan.io",
            },
          ],
          "id": 69,
          "name": "Optimism Kovan",
          "nativeCurrency": {
            "decimals": 18,
            "name": "Kovan Ether",
            "symbol": "KOR",
          },
          "rpcUrls": [
            "https://kovan.optimism.io",
          ],
          "testnet": true,
          "unsupported": true,
        },
        "chains": [
          {
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://etherscan.io",
              },
            ],
            "id": 1,
            "name": "Mainnet",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ether",
              "symbol": "ETH",
            },
            "rpcUrls": [
              "https://mainnet.infura.io/v3",
            ],
          },
          {
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://ropsten.etherscan.io",
              },
            ],
            "id": 3,
            "name": "Ropsten",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Ropsten Ether",
              "symbol": "ropETH",
            },
            "rpcUrls": [
              "https://ropsten.infura.io/v3",
            ],
            "testnet": true,
          },
          {
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://rinkeby.etherscan.io",
              },
            ],
            "id": 4,
            "name": "Rinkeby",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Rinkeby Ether",
              "symbol": "rETH",
            },
            "rpcUrls": [
              "https://rinkeby.infura.io/v3",
            ],
            "testnet": true,
          },
          {
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://goerli.etherscan.io",
              },
            ],
            "id": 5,
            "name": "Goerli",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Goerli Ether",
              "symbol": "gETH",
            },
            "rpcUrls": [
              "https://goerli.infura.io/v3",
            ],
            "testnet": true,
          },
          {
            "blockExplorers": [
              {
                "name": "Etherscan",
                "url": "https://kovan.etherscan.io",
              },
            ],
            "id": 42,
            "name": "Kovan",
            "nativeCurrency": {
              "decimals": 18,
              "name": "Kovan Ether",
              "symbol": "kETH",
            },
            "rpcUrls": [
              "https://kovan.infura.io/v3",
            ],
            "testnet": true,
          },
        ],
      }
    `)
  })
})

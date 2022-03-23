import { Signer } from 'ethers/lib/ethers'

import { getMockConnector, getSigners, setupWagmiClient } from '../../../test'
import { connect } from './connect'
import { getNetwork } from './getNetwork'

describe('getNetwork', () => {
  let signer: Signer
  beforeEach(() => {
    const signers = getSigners()
    signer = signers[0]
  })

  it('not connected', async () => {
    setupWagmiClient()
    expect(getNetwork()).toMatchInlineSnapshot(`
      {
        "chain": undefined,
        "chains": [],
      }
    `)
  })

  it('connected', async () => {
    const client = setupWagmiClient()
    await connect(client.connectors[0])
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
    const client = setupWagmiClient({
      connectors: [
        getMockConnector({
          network: 69,
          signer,
        }),
      ],
    })
    await connect(client.connectors[0])
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

import { setupWagmiClient } from '../../../test'
import { wagmiClient } from '../../client'
import { connect } from './connect'
import { getAccount } from './getAccount'

describe('getAccount', () => {
  it('not connected', () => {
    setupWagmiClient()
    expect(getAccount()).toMatchInlineSnapshot(`
      {
        "address": undefined,
        "connector": undefined,
      }
    `)
  })

  it('connected', async () => {
    setupWagmiClient()
    await connect(wagmiClient.connectors[0])
    expect(getAccount()).toMatchInlineSnapshot(
      `
      {
        "address": "0x012363D61BDC53D0290A0f25e9C89F8257550FB8",
        "connector": MockConnector {
          "_events": {
            "change": EE {
              "context": [Circular],
              "fn": [Function],
              "once": false,
            },
            "disconnect": EE {
              "context": [Circular],
              "fn": [Function],
              "once": false,
            },
            "error": EE {
              "context": [Circular],
              "fn": [Function],
              "once": false,
            },
          },
          "_eventsCount": 3,
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
          "id": "mock",
          "name": "Mock",
          "onAccountsChanged": [Function],
          "onChainChanged": [Function],
          "onDisconnect": [Function],
          "options": {
            "network": 1,
            "privateKey": "0x4c94faa2c558a998d10ee8b2b9b8eb1fbcb8a6ac5fd085c6f95535604fc1bffb",
          },
          "ready": true,
        },
      }
    `,
    )
  })
})

import { setupWagmiClient } from '../test'
import { wagmiClient } from './client'

describe('WagmiClient', () => {
  it('inits', () => {
    setupWagmiClient()
    const { connectors, provider, ...rest } = wagmiClient
    expect(rest).toMatchInlineSnapshot(`
      {
        "config": {
          "connectors": [
            MockConnector {
              "_events": {},
              "_eventsCount": 0,
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
          ],
          "provider": InfuraProvider {
            "_emitted": {
              "block": -2,
            },
            "_events": [],
            "_fastQueryDate": 0,
            "_isProvider": true,
            "_lastBlockNumber": -2,
            "_maxInternalBlockNumber": -1024,
            "_network": {
              "_defaultProvider": [Function],
              "chainId": 1,
              "ensAddress": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
              "name": "homestead",
            },
            "_nextId": 42,
            "_pollingInterval": 4000,
            "anyNetwork": false,
            "apiKey": "mockApiKey",
            "connection": {
              "allowGzip": true,
              "throttleCallback": [Function],
              "url": "https://mainnet.infura.io/v3/mockApiKey",
            },
            "formatter": Formatter {
              "formats": {
                "block": {
                  "baseFeePerGas": [Function],
                  "difficulty": [Function],
                  "extraData": [Function],
                  "gasLimit": [Function],
                  "gasUsed": [Function],
                  "hash": [Function],
                  "miner": [Function],
                  "nonce": [Function],
                  "number": [Function],
                  "parentHash": [Function],
                  "timestamp": [Function],
                  "transactions": [Function],
                },
                "blockWithTransactions": {
                  "baseFeePerGas": [Function],
                  "difficulty": [Function],
                  "extraData": [Function],
                  "gasLimit": [Function],
                  "gasUsed": [Function],
                  "hash": [Function],
                  "miner": [Function],
                  "nonce": [Function],
                  "number": [Function],
                  "parentHash": [Function],
                  "timestamp": [Function],
                  "transactions": [Function],
                },
                "filter": {
                  "address": [Function],
                  "blockHash": [Function],
                  "fromBlock": [Function],
                  "toBlock": [Function],
                  "topics": [Function],
                },
                "filterLog": {
                  "address": [Function],
                  "blockHash": [Function],
                  "blockNumber": [Function],
                  "data": [Function],
                  "logIndex": [Function],
                  "removed": [Function],
                  "topics": [Function],
                  "transactionHash": [Function],
                  "transactionIndex": [Function],
                },
                "receipt": {
                  "blockHash": [Function],
                  "blockNumber": [Function],
                  "confirmations": [Function],
                  "contractAddress": [Function],
                  "cumulativeGasUsed": [Function],
                  "effectiveGasPrice": [Function],
                  "from": [Function],
                  "gasUsed": [Function],
                  "logs": [Function],
                  "logsBloom": [Function],
                  "root": [Function],
                  "status": [Function],
                  "to": [Function],
                  "transactionHash": [Function],
                  "transactionIndex": [Function],
                  "type": [Function],
                },
                "receiptLog": {
                  "address": [Function],
                  "blockHash": [Function],
                  "blockNumber": [Function],
                  "data": [Function],
                  "logIndex": [Function],
                  "topics": [Function],
                  "transactionHash": [Function],
                  "transactionIndex": [Function],
                },
                "transaction": {
                  "accessList": [Function],
                  "blockHash": [Function],
                  "blockNumber": [Function],
                  "confirmations": [Function],
                  "creates": [Function],
                  "data": [Function],
                  "from": [Function],
                  "gasLimit": [Function],
                  "gasPrice": [Function],
                  "hash": [Function],
                  "maxFeePerGas": [Function],
                  "maxPriorityFeePerGas": [Function],
                  "nonce": [Function],
                  "r": [Function],
                  "raw": [Function],
                  "s": [Function],
                  "to": [Function],
                  "transactionIndex": [Function],
                  "type": [Function],
                  "v": [Function],
                  "value": [Function],
                },
                "transactionRequest": {
                  "accessList": [Function],
                  "data": [Function],
                  "from": [Function],
                  "gasLimit": [Function],
                  "gasPrice": [Function],
                  "maxFeePerGas": [Function],
                  "maxPriorityFeePerGas": [Function],
                  "nonce": [Function],
                  "to": [Function],
                  "type": [Function],
                  "value": [Function],
                },
              },
            },
            "projectId": "mockApiKey",
            "projectSecret": null,
          },
          "webSocketProvider": undefined,
        },
        "store": {
          "destroy": [Function],
          "getState": [Function],
          "setState": [Function],
          "subscribe": [Function],
        },
      }
    `)
    expect(connectors).toBeDefined()
    expect(provider).toBeDefined()
  })
})

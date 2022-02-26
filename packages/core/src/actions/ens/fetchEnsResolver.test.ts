import { wallets } from 'wagmi-testing'

import { setupWagmiClient } from '../../../test'
import { fetchEnsResolver } from './fetchEnsResolver'

describe('fetchEnsResolver', () => {
  it('no result', async () => {
    setupWagmiClient()
    const result = await fetchEnsResolver({ name: 'foo.eth' })
    expect(result).toMatchInlineSnapshot(`null`)
  })

  it('has ens resolver', async () => {
    setupWagmiClient()
    const result = await fetchEnsResolver({ name: wallets.ethers3.ensName })
    expect(result).toMatchInlineSnapshot(`
      Resolver {
        "_resolvedAddress": undefined,
        "address": "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
        "name": "meagher.eth",
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
          "_nextId": 43,
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
      }
    `)
  })
})

import { beforeEach, describe, expect, it } from 'vitest'

import { getSigners, setupClient, testChains } from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from './connect'
import { switchNetwork } from './switchNetwork'

const connector = new MockConnector({
  chains: testChains,
  options: { signer: getSigners()[0]! },
})

describe('switchNetwork', () => {
  beforeEach(() => {
    setupClient()
  })

  describe('args', () => {
    it('chainId', async () => {
      await connect({ connector })
      expect(await switchNetwork({ chainId: 5 })).toMatchInlineSnapshot(`
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
        }
      `)
    })
  })

  describe('behavior', () => {
    it('user rejected request', async () => {
      await connect({
        connector: new MockConnector({
          options: {
            flags: { failSwitchChain: true },
            signer: getSigners()[0]!,
          },
        }),
      })
      await expect(
        switchNetwork({ chainId: 69 }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"User rejected request"`)
    })

    it('not connected', async () => {
      await expect(
        switchNetwork({ chainId: 69 }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('not supported by connector', async () => {
      await connect({
        connector: new MockConnector({
          options: {
            flags: { noSwitchChain: true },
            signer: getSigners()[0]!,
          },
        }),
      })
      await expect(
        switchNetwork({ chainId: 4 }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"\\"Mock\\" does not support programmatic chain switching."`,
      )
      await expect(
        switchNetwork({ chainId: 69 }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"\\"Mock\\" does not support programmatic chain switching."`,
      )
    })
  })
})

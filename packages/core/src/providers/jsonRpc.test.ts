import { beforeAll, describe, expect, it } from 'vitest'

import type { Chain } from '../'
import { testChains } from '../../test/utils'
import { jsonRpcProvider } from './jsonRpc'

describe('jsonRpc', () => {
  let foundryChain: Chain
  let foundryChainCustomRegistry: Chain

  beforeAll(() => {
    foundryChain = testChains[0]!
    foundryChainCustomRegistry = {
      ...foundryChain,
      contracts: {
        ...foundryChain.contracts,
        ensRegistry: {
          // An exact copy of the ENS registry deployed by the ENS Deployer that contains no entries
          // Every lookup will return `null` with no error
          address: '0xcc984772c14382b0d429c82d37e6925bffa3ee3c',
        },
      },
    }
  })

  describe('ens lookup', () => {
    it('default', async () => {
      const { provider: providerFactory } = jsonRpcProvider({
        rpc: () => ({
          http: foundryChain.rpcUrls['default'].http[0]!,
        }),
      })(foundryChain)!
      const provider = providerFactory()
      expect(
        await provider.lookupAddress(
          '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        ),
      ).toMatchInlineSnapshot(`"awkweb.eth"`)
    })

    it('custom', async () => {
      const { provider: providerFactory } = jsonRpcProvider({
        rpc: () => ({
          http: foundryChain.rpcUrls['default'].http[0]!,
        }),
      })(foundryChainCustomRegistry)!
      const provider = providerFactory()
      expect(
        await provider.lookupAddress(
          '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        ),
      ).toMatchInlineSnapshot(`null`)
    })
  })
})

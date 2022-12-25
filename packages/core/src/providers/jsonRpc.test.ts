import { describe, expect, it } from 'vitest'

import { foundryMainnet } from '../../test/utils'
import { jsonRpcProvider } from './jsonRpc'

const foundryMainnetWithCustomENS = {
  ...foundryMainnet,
  contracts: {
    ...foundryMainnet.contracts,
    ensRegistry: {
      // An exact copy of the ENS registry deployed by the ENS Deployer that contains no entries
      // Every lookup will return `null` with no error
      address: '0xcc984772c14382b0d429c82d37e6925bffa3ee3c' as const,
    },
  },
}

describe('jsonRpc', () => {
  describe('ens lookup', () => {
    it('default', async () => {
      const { provider: providerFactory } = jsonRpcProvider({
        rpc: () => ({
          http: foundryMainnet.rpcUrls['default'].http[0]!,
        }),
      })(foundryMainnet)!
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
          http: foundryMainnet.rpcUrls['default'].http[0]!,
        }),
      })(foundryMainnetWithCustomENS)!
      const provider = providerFactory()
      expect(
        await provider.lookupAddress(
          '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        ),
      ).toMatchInlineSnapshot(`null`)
    })
  })
})

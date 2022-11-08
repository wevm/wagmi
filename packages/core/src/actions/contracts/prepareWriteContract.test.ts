import { beforeEach, describe, expect, it } from 'vitest'

import {
  getRandomTokenId,
  getSigners,
  setupClient,
  wagmiContractConfig,
} from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from '../accounts'
import { prepareWriteContract } from './prepareWriteContract'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

describe('prepareWriteContract', () => {
  beforeEach(() => {
    setupClient()
  })

  it('default', async () => {
    await connect({ connector })
    const { request } = await prepareWriteContract({
      ...wagmiContractConfig,
      functionName: 'mint',
      args: [getRandomTokenId()],
    })
    const { data, gasLimit, ...rest } = request || {}
    expect(data).toBeDefined()
    expect(gasLimit).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
      {
        "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "to": "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
      }
    `)
  })

  describe('errors', () => {
    it('signer is on different chain', async () => {
      await connect({ connector })

      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          functionName: 'mint',
          chainId: 69,
          args: [getRandomTokenId()],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Chain mismatch: Expected \\"Chain 69\\", received \\"Ethereum\\"."`,
      )
    })

    it('chain not configured for connector', async () => {
      await connect({ connector, chainId: 69_420 })

      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          functionName: 'mint',
          chainId: 69_420,
          args: [getRandomTokenId()],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Chain \\"69420\\" not configured for connector \\"mock\\"."',
      )
    })

    it('contract method error', async () => {
      await connect({ connector })
      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          // @ts-expect-error invalid function name
          functionName: 'claim',
        }),
      ).rejects.toThrowError()
    })

    it('connector not found', async () => {
      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          functionName: 'mint',
          args: [getRandomTokenId()],
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('contract function not found', async () => {
      await connect({ connector })
      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          // @ts-expect-error invalid function name
          functionName: 'wagmi',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Function \\"wagmi\\" on contract \\"0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2\\" does not exist.

        Etherscan: https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2#readContract"
      `)
    })
  })
})

import { beforeEach, describe, expect, it } from 'vitest'

import { getSigners, setupClient, wagmiContractConfig } from '../../../test'
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
    })

    const { data, gasLimit, ...rest } = request || {}
    expect(data).toBeDefined()
    expect(gasLimit).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
      {
        "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "to": "0xaf0326d92b97dF1221759476B072abfd8084f9bE",
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
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Chain mismatch: Expected \\"Chain 69\\", received \\"Ethereum\\"."`,
      )
    })

    it('contract method error', async () => {
      await connect({ connector })
      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          functionName: 'claim',
        }),
      ).rejects.toThrowError()
    })

    it('connector not found', async () => {
      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          functionName: 'mint',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('contract function not found', async () => {
      await connect({ connector })
      await expect(() =>
        prepareWriteContract({
          ...wagmiContractConfig,
          functionName: 'wagmi',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Function \\"wagmi\\" on contract \\"0xfba3912ca04dd458c843e2ee08967fc04f3579c2\\" does not exist.

        Etherscan: https://etherscan.io/address/0xfba3912ca04dd458c843e2ee08967fc04f3579c2#readContract"
      `)
    })
  })
})

import {
  getSigners,
  getUnclaimedTokenId,
  mlootContractConfig,
  setupClient,
} from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from '../accounts'
import { prepareWriteContract } from './prepareWriteContract'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

describe('prepareWriteContract', () => {
  beforeEach(() => setupClient())

  it('default', async () => {
    const tokenId = await getUnclaimedTokenId(
      '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
    )
    if (!tokenId) return

    await connect({ connector })
    const { request } = await prepareWriteContract({
      ...mlootContractConfig,
      functionName: 'claim',
      args: [tokenId],
    })

    const { data, gasLimit, ...rest } = request || {}
    expect(data).toBeDefined()
    expect(gasLimit).toBeDefined()
    expect(rest).toMatchInlineSnapshot(`
      {
        "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "to": "0x1dfe7Ca09e99d10835Bf73044a23B73Fc20623DF",
      }
    `)
  })

  describe('errors', () => {
    it('contract method error', async () => {
      await connect({ connector })
      await expect(() =>
        prepareWriteContract({
          ...mlootContractConfig,
          functionName: 'claim',
          args: 1,
        }),
      ).rejects.toThrowError()
    })

    it('connector not found', async () => {
      await expect(() =>
        prepareWriteContract({
          ...mlootContractConfig,
          functionName: 'claim',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('contract function not found', async () => {
      await connect({ connector })
      await expect(() =>
        prepareWriteContract({
          ...mlootContractConfig,
          functionName: 'wagmi',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
              "Function \\"wagmi\\" on contract \\"0x1dfe7ca09e99d10835bf73044a23b73fc20623df\\" does not exist.

              Etherscan: https://etherscan.io/address/0x1dfe7ca09e99d10835bf73044a23b73fc20623df#readContract"
            `)
    })
  })
})

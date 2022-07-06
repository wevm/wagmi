import {
  getSigners,
  getUnclaimedTokenId,
  mlootContractConfig,
  setupClient,
} from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from '../accounts'
import { writeContractLazy } from './writeContractLazy'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

describe('writeContractLazy', () => {
  beforeEach(() => setupClient())

  it('default', async () => {
    const tokenId = await getUnclaimedTokenId(
      '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
    )
    if (!tokenId) return

    await connect({ connector })
    const result = await writeContractLazy({
      ...mlootContractConfig,
      functionName: 'claim',
      args: [tokenId],
    })
    expect(result.hash).toBeDefined()
  })

  describe('errors', () => {
    it('contract method error', async () => {
      await connect({ connector })
      await expect(() =>
        writeContractLazy({
          ...mlootContractConfig,
          functionName: 'claim',
          args: 1,
        }),
      ).rejects.toThrowError()
    })

    it('connector not found', async () => {
      await expect(() =>
        writeContractLazy({
          ...mlootContractConfig,
          functionName: 'claim',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('contract function not found', async () => {
      await connect({ connector })
      await expect(() =>
        writeContractLazy({
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

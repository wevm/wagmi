import {
  getSigners,
  getUnclaimedTokenId,
  mlootContractConfig,
  setupClient,
} from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from '../accounts'
import { prepareWriteContract } from './prepareWriteContract'
import { writeContract } from './writeContract'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

describe('writeContract', () => {
  beforeEach(() => setupClient())

  it('prepared config', async () => {
    const tokenId = await getUnclaimedTokenId(
      '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
    )
    if (!tokenId) return

    await connect({ connector })
    const config = await prepareWriteContract({
      ...mlootContractConfig,
      functionName: 'claim',
      args: [tokenId],
    })
    const { hash } = await writeContract({ ...config })

    expect(hash).toBeDefined()
  })

  it('unprepared config', async () => {
    const tokenId = await getUnclaimedTokenId(
      '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
    )
    if (!tokenId) return

    await connect({ connector })
    const { hash } = await writeContract({
      ...mlootContractConfig,
      mode: 'dangerouslyUnprepared',
      functionName: 'claim',
      args: [tokenId],
    })

    expect(hash).toBeDefined()
  })

  describe('errors', () => {
    it('signer is on different chain', async () => {
      const tokenId = await getUnclaimedTokenId(
        '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
      )
      if (!tokenId) return

      await connect({ connector })
      const config = await prepareWriteContract({
        ...mlootContractConfig,
        functionName: 'claim',
        args: [tokenId],
      })

      await expect(() =>
        writeContract({
          chainId: 69,
          ...config,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Chain mismatch: Expected \\"Chain 69\\", received \\"Ethereum."`,
      )
    })

    it('contract method error', async () => {
      await connect({ connector })
      await expect(() =>
        writeContract({
          ...mlootContractConfig,
          mode: 'dangerouslyUnprepared',
          functionName: 'claim',
          args: 1,
        }),
      ).rejects.toThrowError()
    })

    it('connector not found', async () => {
      await expect(() =>
        writeContract({
          ...mlootContractConfig,
          mode: 'dangerouslyUnprepared',
          functionName: 'claim',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('contract function not found', async () => {
      await connect({ connector })
      await expect(() =>
        writeContract({
          ...mlootContractConfig,
          mode: 'dangerouslyUnprepared',
          functionName: 'wagmi',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
              "Function \\"wagmi\\" on contract \\"0x1dfe7ca09e99d10835bf73044a23b73fc20623df\\" does not exist.

              Etherscan: https://etherscan.io/address/0x1dfe7ca09e99d10835bf73044a23b73fc20623df#readContract"
            `)
    })
  })
})

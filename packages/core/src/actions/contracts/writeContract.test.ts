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
import { writeContract } from './writeContract'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

describe('writeContract', () => {
  beforeEach(() => {
    setupClient()
  })

  it('prepared config', async () => {
    await connect({ connector })
    const config = await prepareWriteContract({
      ...wagmiContractConfig,
      functionName: 'mint',
      args: [getRandomTokenId()],
    })
    const { hash } = await writeContract(config)

    expect(hash).toBeDefined()
  })

  it('unprepared config', async () => {
    await connect({ connector })
    const { hash } = await writeContract({
      ...wagmiContractConfig,
      mode: 'recklesslyUnprepared',
      functionName: 'mint',
      args: [getRandomTokenId()],
    })

    expect(hash).toBeDefined()
  })

  describe('errors', () => {
    it('signer is on different chain', async () => {
      await connect({ connector })
      const config = await prepareWriteContract({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [getRandomTokenId()],
      })

      await expect(() =>
        writeContract({
          ...config,
          chainId: 69,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Chain mismatch: Expected \\"Chain 69\\", received \\"Ethereum\\"."`,
      )
    })

    it('chain not configured for connector', async () => {
      await connect({ connector, chainId: 69_420 })
      const config = await prepareWriteContract({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [getRandomTokenId()],
      })

      await expect(() =>
        writeContract({
          ...config,
          chainId: 69_420,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Chain \\"69420\\" not configured for connector \\"mock\\"."',
      )
    })

    it('contract method error', async () => {
      await connect({ connector })
      await expect(() =>
        writeContract({
          ...wagmiContractConfig,
          mode: 'recklesslyUnprepared',
          // @ts-expect-error function does not exist
          functionName: 'claim',
        }),
      ).rejects.toThrowError()
    })

    it('connector not found', async () => {
      await expect(() =>
        writeContract({
          ...wagmiContractConfig,
          mode: 'recklesslyUnprepared',
          // @ts-expect-error function does not exist
          functionName: 'claim',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`"Connector not found"`)
    })

    it('contract function not found', async () => {
      await connect({ connector })
      await expect(() =>
        writeContract({
          ...wagmiContractConfig,
          mode: 'recklesslyUnprepared',
          // @ts-expect-error function does not exist
          functionName: 'wagmi',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Function \\"wagmi\\" on contract \\"0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2\\" does not exist.

        Etherscan: https://etherscan.io/address/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2#readContract"
      `)
    })
  })
})

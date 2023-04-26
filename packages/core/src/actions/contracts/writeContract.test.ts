import { beforeEach, describe, expect, it } from 'vitest'

import {
  getRandomTokenId,
  getWalletClients,
  setupClient,
  wagmiContractConfig,
} from '../../../test'
import { mainnet } from '../../chains'
import { MockConnector } from '../../connectors/mock'
import { connect } from '../accounts'
import { prepareWriteContract } from './prepareWriteContract'
import { writeContract } from './writeContract'

const connector = new MockConnector({
  options: { walletClient: getWalletClients()[0]! },
})

describe('writeContract', () => {
  beforeEach(() => {
    setupClient()
  })

  it('prepared', async () => {
    await connect({ connector })
    const { request } = await prepareWriteContract({
      ...wagmiContractConfig,
      functionName: 'mint',
      args: [getRandomTokenId()],
    })
    const { hash } = await writeContract(request)

    expect(hash).toBeDefined()
  })

  it('unprepared', async () => {
    await connect({ connector })
    const { hash } = await writeContract({
      ...wagmiContractConfig,
      functionName: 'mint',
      args: [getRandomTokenId()],
    })

    expect(hash).toBeDefined()
  })

  describe('args', () => {
    describe('chainId', async () => {
      it('prepared', async () => {
        await connect({ connector })
        const { request } = await prepareWriteContract({
          ...wagmiContractConfig,
          functionName: 'mint',
          args: [getRandomTokenId()],
          chainId: mainnet.id,
        })
        expect(request.chainId).toBe(mainnet.id)
        const { hash } = await writeContract(request)

        expect(hash).toBeDefined()
      })

      it('unprepared', async () => {
        await connect({ connector })
        const { hash } = await writeContract({
          ...wagmiContractConfig,
          functionName: 'mint',
          args: [getRandomTokenId()],
          chainId: mainnet.id,
        })

        expect(hash).toBeDefined()
      })
    })

    describe('gas', async () => {
      it('prepared', async () => {
        await connect({ connector })
        const { request } = await prepareWriteContract({
          ...wagmiContractConfig,
          functionName: 'mint',
          args: [getRandomTokenId()],
          gas: 69_420n,
        })
        expect(request.gas).toBe(69_420n)
        const { hash } = await writeContract(request)

        expect(hash).toBeDefined()
      })

      it('unprepared', async () => {
        await connect({ connector })
        const { hash } = await writeContract({
          ...wagmiContractConfig,
          functionName: 'mint',
          args: [getRandomTokenId()],
          gas: 69_420n,
        })

        expect(hash).toBeDefined()
      })
    })
  })

  describe('errors', () => {
    it('wallet is on different chain', async () => {
      await connect({ connector })
      const { request } = await prepareWriteContract({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [getRandomTokenId()],
      })

      await expect(() =>
        writeContract({
          ...request,
          chainId: 69,
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Chain mismatch: Expected \\"Chain 69\\", received \\"Ethereum\\"."`,
      )
    })

    it('chain not configured for connector', async () => {
      await connect({ connector, chainId: 69_420 })
      const { request } = await prepareWriteContract({
        ...wagmiContractConfig,
        functionName: 'mint',
        args: [getRandomTokenId()],
      })

      await expect(() =>
        writeContract({
          ...request,
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
          // @ts-expect-error function does not exist
          functionName: 'claim',
        }),
      ).rejects.toThrowError()
    })

    it('connector not found', async () => {
      await expect(() =>
        writeContract({
          ...wagmiContractConfig,
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
          // @ts-expect-error function does not exist
          functionName: 'wagmi',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        "Function \\"wagmi\\" not found on ABI.
        Make sure you are using the correct ABI and that the function exists on it.

        Docs: https://viem.sh/docs/contract/encodeFunctionData.html
        Version: viem@0.3.12"
      `)
    })
  })
})

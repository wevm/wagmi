import { erc20ABI } from '@wagmi/core'
import { describe, expect, it } from 'vitest'

import { getProvider, renderHook } from '../../../test'
import { UseContractConfig, useContract } from './useContract'

const uniContractAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

describe('useContract', () => {
  it('mounts', async () => {
    const { result } = renderHook(() =>
      useContract({
        address: uniContractAddress,
        abi: erc20ABI,
      }),
    )
    expect(result.current).toBeDefined()
    expect(result.current?.balanceOf).toBeDefined()
  })

  describe('behavior', () => {
    it('changes config', async () => {
      let signerOrProvider: UseContractConfig['signerOrProvider'] = undefined
      const { result, rerender } = renderHook(() =>
        useContract({
          address: uniContractAddress,
          abi: erc20ABI,
          signerOrProvider,
        }),
      )
      expect(result.current?.provider).toBeNull()

      signerOrProvider = getProvider()
      rerender()
      expect(result.current?.provider).not.toBeNull()
    })

    it('no address', async () => {
      const { result } = renderHook(() =>
        useContract({
          abi: erc20ABI,
        }),
      )
      expect(result.current).toBeNull()
    })

    it('no abi', async () => {
      const { result } = renderHook(() =>
        useContract({
          address: uniContractAddress,
        }),
      )
      expect(result.current).toBeNull()
    })
  })
})

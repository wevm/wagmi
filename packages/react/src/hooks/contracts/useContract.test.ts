import { erc20ABI } from '@wagmi/core'
import { describe, expect, it } from 'vitest'

import { getProvider, renderHook } from '../../../test'
import type { UseContractConfig } from './useContract'
import { useContract } from './useContract'

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

    it.each([{ property: 'address' }, { property: 'abi' }])(
      'does not run when $property is undefined',
      async ({ property }) => {
        const baseConfig = {
          address: uniContractAddress,
          abi: erc20ABI,
        } as const
        const config = {
          ...baseConfig,
          address: property === 'address' ? undefined : baseConfig.address,
          abi: property === 'abi' ? undefined : baseConfig.abi,
        } as const
        const utils = renderHook(() => useContract(config))
        const { rerender, result } = utils

        expect(result.current).toBeNull()

        // @ts-expect-error assigning to readonly object
        config[property as keyof typeof config] =
          baseConfig[property as keyof typeof baseConfig]
        rerender()

        expect(result.current).toBeDefined()
      },
    )
  })
})

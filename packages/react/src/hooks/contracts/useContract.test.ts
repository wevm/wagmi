import { Signer } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { erc20ABI } from '@wagmi/core'

import { getProvider, renderHook } from '../../../test'
import { useContract } from './useContract'

const uniContractAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

describe('useContract', () => {
  it('inits', async () => {
    const { result } = renderHook(() =>
      useContract({
        addressOrName: uniContractAddress,
        contractInterface: erc20ABI,
      }),
    )
    expect(result.current).toBeDefined()
    expect(result.current.balanceOf).toBeDefined()
  })

  it('changes config', async () => {
    let signerOrProvider: Signer | Provider | undefined = undefined
    const { result, rerender } = renderHook(() =>
      useContract({
        addressOrName: uniContractAddress,
        contractInterface: erc20ABI,
        signerOrProvider,
      }),
    )
    expect(result.current.provider).toBeNull()

    signerOrProvider = getProvider()
    rerender()
    expect(result.current.provider).not.toBeNull()
  })
})

import { Signer, providers } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { erc20ABI } from '@wagmi/core'
import { contracts, infuraApiKey } from 'wagmi-testing'

import { renderHook } from '../../../test'
import { useContract } from './useContract'

describe('useContract', () => {
  it('inits', async () => {
    const { result } = renderHook(() =>
      useContract({
        addressOrName: contracts.uniToken,
        contractInterface: erc20ABI,
      }),
    )
    expect(result.current).toBeDefined()
  })

  it('changes config', async () => {
    let signerOrProvider: Signer | Provider | undefined = undefined
    const { result, rerender } = renderHook(() =>
      useContract({
        addressOrName: contracts.uniToken,
        contractInterface: erc20ABI,
        signerOrProvider,
      }),
    )
    expect(result.current.provider).toBeNull()

    signerOrProvider = new providers.InfuraProvider(1, infuraApiKey)
    rerender()
    expect(result.current.provider).not.toBeNull()
  })
})

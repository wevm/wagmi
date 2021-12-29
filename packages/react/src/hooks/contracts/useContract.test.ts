import { erc20ABI } from 'wagmi-private'
import { addressLookup } from 'wagmi-private/testing'

import { renderHook } from '../../../test'
import { useContract } from './useContract'

describe('useContract', () => {
  it('inits', async () => {
    const { result } = renderHook(() =>
      useContract({
        addressOrName: addressLookup.uniToken,
        contractInterface: erc20ABI,
      }),
    )
    expect(result.current).toBeDefined()
  })
})

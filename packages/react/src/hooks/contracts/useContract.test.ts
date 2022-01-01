import { erc20ABI } from 'wagmi-private'
import { contracts } from 'wagmi-testing'

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
})

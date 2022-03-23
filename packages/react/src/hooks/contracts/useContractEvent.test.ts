import { erc20ABI } from '@wagmi/core'

import { renderHook } from '../../../test'
import { useContractEvent } from './useContractEvent'

const uniContractAddress = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

describe('useContractEvent', () => {
  describe('on mount', () => {
    it('has token', async () => {
      const listener = jest.fn()
      renderHook(() =>
        useContractEvent(
          {
            addressOrName: uniContractAddress,
            contractInterface: erc20ABI,
          },
          'Transfer',
          listener,
        ),
      )
      expect(listener).toHaveBeenCalledTimes(0)
    })
  })
})

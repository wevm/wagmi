import { erc20ABI } from 'wagmi-private'
import { addressLookup } from 'wagmi-private/testing'

import { renderHook } from '../../../test'
import { useContractEvent } from './useContractEvent'

describe('useContractEvent', () => {
  describe('on mount', () => {
    it('has token', async () => {
      const listener = jest.fn()
      renderHook(() =>
        useContractEvent(
          {
            addressOrName: addressLookup.uniToken,
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

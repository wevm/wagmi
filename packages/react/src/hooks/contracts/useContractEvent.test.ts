import { erc20ABI } from '@wagmi/core'
import { contracts } from 'wagmi-testing'

import { renderHook } from '../../../test'
import { useContractEvent } from './useContractEvent'

describe('useContractEvent', () => {
  describe('on mount', () => {
    it('has token', async () => {
      const listener = jest.fn()
      renderHook(() =>
        useContractEvent(
          {
            addressOrName: contracts.uniToken,
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

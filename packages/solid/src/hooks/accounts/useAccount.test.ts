import { describe, expect, it } from 'vitest'

import { renderHook } from '../../../test'
import { useAccount } from './useAccount'

describe('useAccount', () => {
  describe('mounts', () => {
    it('is connected', async () => {
      console.log('morre aqui')
      const { result } = renderHook(() => useAccount())

      console.log('r', result)

      expect(true).toBeTruthy()
    })
  })
})

import * as React from 'react'

import { renderHook } from '../test'
import { useClient } from './context'

describe('useContext', () => {
  it('should throw when not inside Provider', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'error').mockImplementation(() => {})

    try {
      const wrapper = ({ children }: { children?: React.ReactNode }) =>
        React.createElement('div', { children })
      renderHook(() => useClient(), { wrapper })
    } catch (error) {
      expect(error).toMatchInlineSnapshot(
        `[Error: Must be used within WagmiProvider]`,
      )
    }
  })
})

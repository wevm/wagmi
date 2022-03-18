import * as React from 'react'

import { renderHook } from '../test'
import { useClient } from './context'

describe('useContext', () => {
  it('should throw when not inside Provider', () => {
    const wrapper = ({ children }: { children: React.ReactElement }) =>
      React.createElement('div', { children })
    const { result } = renderHook(() => useClient(), { wrapper })
    expect(() => result.current).toThrowErrorMatchingInlineSnapshot(
      `"Must be used within WagmiProvider"`,
    )
  })
})

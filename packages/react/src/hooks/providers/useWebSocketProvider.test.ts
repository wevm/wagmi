import { ethers } from 'ethers'

import { renderHook } from '../../../test'
import { useWebSocketProvider } from './useWebSocketProvider'

describe('useWebSocketProvider', () => {
  it('inits', async () => {
    const { result } = renderHook(() => useWebSocketProvider())
    expect(result.current).toBeUndefined()
  })

  it('inits', async () => {
    const { result } = renderHook(() => useWebSocketProvider(), {
      initialProps: {
        webSocketProvider: ({ chainId }) =>
          new ethers.providers.InfuraWebSocketProvider(chainId, 'test'),
      },
    })
    expect(result.current).toBeDefined()
  })
})

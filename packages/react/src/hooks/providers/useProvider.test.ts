import { describe, expect, it } from 'vitest'

import { actConnect, actSwitchNetwork, renderHook } from '../../../test'
import { useConnect, useSwitchNetwork } from '../accounts'
import type { UseProviderArgs } from './useProvider'
import { useProvider } from './useProvider'

function useProviderWithConnectAndNetwork(config: UseProviderArgs = {}) {
  return {
    connect: useConnect(),
    switchNetwork: useSwitchNetwork(),
    provider: useProvider(config),
  }
}

describe('useProvider', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useProvider())
    expect(result.current).toMatchInlineSnapshot('"<Provider network={1} />"')
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const { result } = renderHook(() => useProvider({ chainId: 1 }))
      expect(result.current).toMatchInlineSnapshot(`"<Provider network={1} />"`)
    })

    it('switches chainId', () => {
      let chainId = 1
      const { result, rerender } = renderHook(() => useProvider({ chainId }))
      expect(result.current).toMatchInlineSnapshot(`"<Provider network={1} />"`)
      chainId = 5
      rerender()
      expect(result.current).toMatchInlineSnapshot('"<Provider network={5} />"')
    })
  })

  describe('behavior', () => {
    it('switches chain', async () => {
      const utils = renderHook(() => useProviderWithConnectAndNetwork())
      const { result } = utils
      expect(result.current.provider).toMatchInlineSnapshot(
        '"<Provider network={1} />"',
      )

      await actConnect({ utils })
      await actSwitchNetwork({ utils, chainId: 5 })

      expect(result.current.provider).toMatchInlineSnapshot(
        '"<Provider network={5} />"',
      )
    })
  })
})

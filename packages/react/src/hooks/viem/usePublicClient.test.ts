import { describe, expect, it } from 'vitest'

import { actConnect, actSwitchNetwork, renderHook } from '../../../test'
import { useConnect, useSwitchNetwork } from '../accounts'
import type { UsePublicClientArgs } from './usePublicClient'
import { usePublicClient } from './usePublicClient'

function usePublicClientWithConnectAndNetwork(
  config: UsePublicClientArgs = {},
) {
  return {
    connect: useConnect(),
    switchNetwork: useSwitchNetwork(),
    publicClient: usePublicClient(config),
  }
}

describe('usePublicClient', () => {
  it('mounts', () => {
    const { result } = renderHook(() => usePublicClient())
    expect(result.current).toMatchInlineSnapshot(
      '"<PublicClient network={1} />"',
    )
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const { result } = renderHook(() => usePublicClient({ chainId: 1 }))
      expect(result.current).toMatchInlineSnapshot(
        '"<PublicClient network={1} />"',
      )
    })

    it('switches chainId', () => {
      let chainId = 1
      const { result, rerender } = renderHook(() =>
        usePublicClient({ chainId }),
      )
      expect(result.current).toMatchInlineSnapshot(
        '"<PublicClient network={1} />"',
      )
      chainId = 5
      rerender()
      expect(result.current).toMatchInlineSnapshot(
        '"<PublicClient network={5} />"',
      )
    })
  })

  describe('behavior', () => {
    it('switches chain', async () => {
      const utils = renderHook(() => usePublicClientWithConnectAndNetwork())
      const { result } = utils
      expect(result.current.publicClient).toMatchInlineSnapshot(
        '"<PublicClient network={1} />"',
      )

      await actConnect({ utils })
      await actSwitchNetwork({ utils, chainId: 5 })

      expect(result.current.publicClient).toMatchInlineSnapshot(
        '"<PublicClient network={5} />"',
      )
    })
  })
})

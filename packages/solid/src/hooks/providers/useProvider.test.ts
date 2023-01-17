import { waitFor } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'

import { renderHook, switchNetwork } from '../../../test'
import { useAccount, useConnect, useSwitchNetwork } from '../accounts'
import type { UseProviderArgs } from './useProvider'
import { useProvider } from './useProvider'

function useProviderWithConnectAndNetwork(config: UseProviderArgs = {}) {
  return {
    connect: useConnect(),
    switchNetwork: useSwitchNetwork(),
    provider: useProvider(config),
    account: useAccount(),
  }
}

describe('useProvider', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useProvider())
    expect(result()).toMatchInlineSnapshot('"<Provider network={1} />"')
  })

  describe('configuration', () => {
    it('chainId', async () => {
      const { result } = renderHook(() => useProvider({ chainId: 1 }))
      expect(result()).toMatchInlineSnapshot(`"<Provider network={1} />"`)
    })

    it('switches chainId', () => {
      let chainId = 1
      const { result } = renderHook(() => useProvider({ chainId }))
      expect(result()).toMatchInlineSnapshot(`"<Provider network={1} />"`)
      chainId = 5
      expect(result()).toMatchInlineSnapshot('"<Provider network={1} />"')
    })
  })

  describe('behavior', () => {
    it('switches chain', async () => {
      const utils = renderHook(() => useProviderWithConnectAndNetwork())
      const { result } = utils
      expect(result.provider()).toMatchInlineSnapshot(
        '"<Provider network={1} />"',
      )

      await result.connect.connectAsync()
      await waitFor(() => expect(result.account().isConnected).toBeTruthy())

      await switchNetwork({ utils, chainId: () => 5 })

      expect(result.provider()).toMatchInlineSnapshot(
        '"<Provider network={5} />"',
      )
    })
  })
})

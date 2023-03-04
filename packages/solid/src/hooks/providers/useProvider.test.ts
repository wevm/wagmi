import { waitFor } from '@solidjs/testing-library'
import { createSignal } from 'solid-js'
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
      const { result } = renderHook(() => useProvider({ chainId: () => 1 }))
      expect(result()).toMatchInlineSnapshot(`"<Provider network={1} />"`)
    })

    it('switches chainId', () => {
      const [chainId, setChainId] = createSignal(1)
      const { result } = renderHook(() => useProvider({ chainId }))
      expect(result()).toMatchInlineSnapshot(`"<Provider network={1} />"`)
      setChainId(5)
      expect(result()).toMatchInlineSnapshot('"<Provider network={5} />"')
    })
  })

  describe('behavior', () => {
    it('switches chain', async () => {
      const [chainId, setChainId] = createSignal(1)
      const utils = renderHook(() =>
        useProviderWithConnectAndNetwork({ chainId }),
      )
      expect(utils.result.provider()).toMatchInlineSnapshot(
        '"<Provider network={1} />"',
      )

      await utils.result.connect.connectAsync()
      await waitFor(() =>
        expect(utils.result.account().isConnected).toBeTruthy(),
      )

      setChainId(5)
      await switchNetwork({ utils, chainId })

      expect(utils.result.provider()).toMatchInlineSnapshot(
        '"<Provider network={5} />"',
      )
    })
  })
})

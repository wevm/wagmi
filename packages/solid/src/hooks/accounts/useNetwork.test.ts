import { waitFor } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'

import { renderHook, switchNetwork } from '../../../test'
import { useAccount } from './useAccount'
import type { UseConnectArgs, UseConnectConfig } from './useConnect'
import { useConnect } from './useConnect'
import { useDisconnect } from './useDisconnect'
import { useNetwork } from './useNetwork'
import type {
  UseSwitchNetworkArgs,
  UseSwitchNetworkConfig,
} from './useSwitchNetwork'
import { useSwitchNetwork } from './useSwitchNetwork'

function useNetworkWithConnectAndDisconnect(
  config: {
    connect?: UseConnectArgs & UseConnectConfig
    switchNetwork?: UseSwitchNetworkArgs & UseSwitchNetworkConfig
  } = {},
) {
  return {
    connect: useConnect(config.connect),
    disconnect: useDisconnect(),
    network: useNetwork(),
    account: useAccount(),
    switchNetwork: useSwitchNetwork(config.switchNetwork),
  }
}

describe('useNetwork', () => {
  describe('mounts', () => {
    it('is connected', async () => {
      const utils = renderHook(() => useNetworkWithConnectAndDisconnect())
      const { result } = utils

      await result.connect.connectAsync()

      expect(result.network().chains.length).toBe(2)
      expect(result.network().chain?.id).toBe(1)
    })

    it('is not connected', async () => {
      const utils = renderHook(() => useNetworkWithConnectAndDisconnect())
      const { result } = utils

      await result.disconnect.disconnectAsync()

      expect(result.network().chains.length).toBe(0)
      expect(result.network().chain).toBeUndefined()
    })
  })

  describe('behavior', () => {
    it('updates on connect and disconnect', async () => {
      const utils = renderHook(() => useNetworkWithConnectAndDisconnect())
      const { result } = utils

      await result.connect.connectAsync()
      await waitFor(() => expect(result.account().isConnected).toBeTruthy())

      expect(result.network()?.chain?.id).toBe(1)
      await result.disconnect.disconnectAsync()
      await waitFor(() => expect(result.account().isConnected).toBeFalsy())

      expect(result.network()?.chain).toMatchInlineSnapshot(`undefined`)
    })

    it('updates on switch network (supported chain)', async () => {
      const utils = renderHook(() => useNetworkWithConnectAndDisconnect())
      const { result } = utils

      await result.connect.connectAsync()
      await waitFor(() => expect(result.account().isConnected).toBeTruthy())

      expect(result.network()?.chain?.id).toBe(1)
      await switchNetwork({ utils, chainId: () => 5 })
      expect(result.network()?.chain?.id).toBe(5)
      expect(result.network()?.chain?.unsupported).toBe(false)
    })

    it('updates on switch network (unsupported chain)', async () => {
      const utils = renderHook(() => useNetworkWithConnectAndDisconnect())
      const { result } = utils

      await result.connect.connectAsync()
      await waitFor(() => expect(result.account().isConnected).toBeTruthy())

      expect(result.network()?.chain?.id).toBe(1)
      await switchNetwork({ utils, chainId: () => 69 })
      expect(result.network()?.chain?.id).toBe(69)
      expect(result.network()?.chain?.unsupported).toBe(true)
    })
  })
})

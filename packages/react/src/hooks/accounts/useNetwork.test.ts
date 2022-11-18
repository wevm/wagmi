import { connect } from '@wagmi/core'
import { describe, expect, it } from 'vitest'

import {
  actConnect,
  actDisconnect,
  actSwitchNetwork,
  renderHook,
  setupClient,
  useNetwork,
} from '../../../test'
import type { UseConnectArgs, UseConnectConfig } from './useConnect'
import { useConnect } from './useConnect'
import { useDisconnect } from './useDisconnect'
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
    switchNetwork: useSwitchNetwork(config.switchNetwork),
  }
}

describe('useNetwork', () => {
  describe('mounts', () => {
    it('is connected', async () => {
      const client = setupClient()
      await connect({ connector: client.connectors[0]! })

      const { result } = renderHook(() => useNetwork(), {
        initialProps: { client },
      })

      const { chain, chains } = result.current
      expect(chains.length).toBe(2)
      expect(chain?.id).toBe(1)
    })

    it('is not connected', async () => {
      const { result } = renderHook(() => useNetwork())

      const { chain, chains } = result.current
      expect(chains.length).toBe(0)
      expect(chain).toBeUndefined()
    })
  })

  describe('behavior', () => {
    it('updates on connect and disconnect', async () => {
      const utils = renderHook(() => useNetworkWithConnectAndDisconnect())
      const { result } = utils

      await actConnect({ utils })
      expect(result.current.network?.chain?.id).toBe(1)
      await actDisconnect({ utils })
      expect(result.current.network?.chain).toMatchInlineSnapshot(`undefined`)
    })

    it('updates on switch network (supported chain)', async () => {
      const utils = renderHook(() => useNetworkWithConnectAndDisconnect())
      const { result } = utils

      await actConnect({ utils })
      expect(result.current.network?.chain?.id).toBe(1)
      await actSwitchNetwork({ utils, chainId: 5 })
      expect(result.current.network?.chain?.id).toBe(5)
      expect(result.current.network?.chain?.unsupported).toBe(false)
    })

    it('updates on switch network (unsupported chain)', async () => {
      const utils = renderHook(() => useNetworkWithConnectAndDisconnect())
      const { result } = utils

      await actConnect({ utils })
      expect(result.current.network?.chain?.id).toBe(1)
      await actSwitchNetwork({ utils, chainId: 69 })
      expect(result.current.network?.chain?.id).toBe(69)
      expect(result.current.network?.chain?.unsupported).toBe(true)
    })
  })
})

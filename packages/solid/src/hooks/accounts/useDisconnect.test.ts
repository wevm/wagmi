import { waitFor } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'

import { renderHook } from '../../../test'
import { useAccount } from './useAccount'
import { useConnect } from './useConnect'
import type { UseDisconnectConfig } from './useDisconnect'
import { useDisconnect } from './useDisconnect'

function useDisconnectWithAccountAndConnect(config: UseDisconnectConfig = {}) {
  return {
    account: useAccount(),
    connect: useConnect(),
    disconnect: useDisconnect(config),
  }
}

describe('useDisconnect', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useDisconnect())
    expect(result).toMatchInlineSnapshot(`
      {
        "disconnect": [Function],
        "disconnectAsync": [Function],
        "disconnectData": {
          "context": undefined,
          "data": undefined,
          "error": null,
          "failureCount": 0,
          "failureReason": null,
          "isError": false,
          "isIdle": true,
          "isLoading": false,
          "isPaused": false,
          "isSuccess": false,
          "mutate": [Function],
          "mutateAsync": [Function],
          "reset": [Function],
          "status": "idle",
          "variables": undefined,
        },
      }
    `)
  })

  describe('configuration', () => {
    it('onSuccess', async () => {
      const onSuccess = vi.fn()
      const { result } = renderHook(() =>
        useDisconnectWithAccountAndConnect({ onSuccess }),
      )

      await result.connect.connectAsync()
      await waitFor(() => expect(result.account().isConnected).toBeTruthy())

      await result.disconnect.disconnectData.mutateAsync()
      await waitFor(() =>
        expect(result.disconnect.disconnectData.isSuccess).toBeTruthy(),
      )
      expect(onSuccess).toBeCalledWith(undefined)
    })
  })

  describe('return value', () => {
    it('disconnect', async () => {
      const { result } = renderHook(() => useDisconnectWithAccountAndConnect())

      await result.connect.connectAsync()
      await waitFor(() => expect(result.account().isConnected).toBeTruthy())

      expect(result.account().connector).toMatchInlineSnapshot(
        `"<MockConnector>"`,
      )

      result.disconnect.disconnect()

      await waitFor(() => expect(result.account().isConnected).toBeFalsy())
      await waitFor(() =>
        expect(result.connect.connectData.isSuccess).toBeTruthy(),
      )

      expect(result.account().connector).toMatchInlineSnapshot(`undefined`)
      expect(result.disconnect).toMatchInlineSnapshot(`
        {
          "disconnect": [Function],
          "disconnectAsync": [Function],
          "disconnectData": {
            "context": undefined,
            "data": undefined,
            "error": null,
            "failureCount": 0,
            "failureReason": null,
            "isError": false,
            "isIdle": true,
            "isLoading": false,
            "isPaused": false,
            "isSuccess": false,
            "mutate": [Function],
            "mutateAsync": [Function],
            "reset": [Function],
            "status": "idle",
            "variables": undefined,
          },
        }
      `)
    })

    it('disconnectAsync', async () => {
      const { result } = renderHook(() => useDisconnectWithAccountAndConnect())

      await result.connect.connectAsync()
      await waitFor(() => expect(result.account().isConnected).toBeTruthy())

      expect(result.account().connector).toMatchInlineSnapshot(
        `"<MockConnector>"`,
      )

      await result.disconnect.disconnectData.mutateAsync()
      await waitFor(() => expect(result.account().isConnected).toBeFalsy())

      expect(result.account().connector).toMatchInlineSnapshot(`undefined`)
      expect(result.disconnect).toMatchInlineSnapshot(`
        {
          "disconnect": [Function],
          "disconnectAsync": [Function],
          "disconnectData": {
            "context": undefined,
            "data": undefined,
            "error": null,
            "failureCount": 0,
            "failureReason": null,
            "isError": false,
            "isIdle": false,
            "isLoading": false,
            "isPaused": false,
            "isSuccess": true,
            "mutate": [Function],
            "mutateAsync": [Function],
            "reset": [Function],
            "status": "success",
            "variables": undefined,
          },
        }
      `)
    })
  })

  describe('behavior', () => {
    it('clears account cache', async () => {
      const { result } = renderHook(() => useDisconnectWithAccountAndConnect())

      await result.connect.connectAsync()
      await waitFor(() => expect(result.account().isConnected).toBeTruthy())

      expect(result.account().address).toMatchInlineSnapshot(
        `"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"`,
      )
      expect(result.account().connector).toMatchInlineSnapshot(
        `"<MockConnector>"`,
      )

      result.disconnect.disconnect()

      await waitFor(() => expect(result.account().isConnected).toBeFalsy())
      expect(result.account().address).toMatchInlineSnapshot(`undefined`)
      expect(result.account().connector).toMatchInlineSnapshot(`undefined`)
    })
  })
})

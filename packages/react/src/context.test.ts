import * as React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { renderHook } from '../test'
import { useClient } from './context'

describe('useClient', () => {
  describe('mounts', () => {
    it('default', () => {
      const { result } = renderHook(() => useClient())
      expect(result.current).toMatchInlineSnapshot(`
        Client {
          "config": {
            "autoConnect": false,
            "connectors": [
              "<MockConnector>",
            ],
            "logger": {
              "warn": [Function],
            },
            "provider": [Function],
            "storage": {
              "getItem": [Function],
              "removeItem": [Function],
              "setItem": [Function],
            },
            "webSocketProvider": undefined,
          },
          "providers": Map {
            -1 => "<Provider network={1} />",
          },
          "queryClient": QueryClient {
            "defaultOptions": {
              "queries": {
                "cacheTime": Infinity,
                "retry": false,
              },
            },
            "logger": {
              "error": [Function],
              "log": [Function],
              "warn": [Function],
            },
            "mutationCache": MutationCache {
              "config": {},
              "listeners": [],
              "mutationId": 0,
              "mutations": [],
              "subscribe": [Function],
            },
            "mutationDefaults": [],
            "queryCache": QueryCache {
              "config": {},
              "listeners": [],
              "queries": [],
              "queriesMap": {},
              "subscribe": [Function],
            },
            "queryDefaults": [],
            "unsubscribeFocus": [Function],
            "unsubscribeOnline": [Function],
          },
          "storage": {
            "getItem": [Function],
            "removeItem": [Function],
            "setItem": [Function],
          },
          "store": {
            "destroy": [Function],
            "getState": [Function],
            "persist": {
              "clearStorage": [Function],
              "getOptions": [Function],
              "hasHydrated": [Function],
              "onFinishHydration": [Function],
              "onHydrate": [Function],
              "rehydrate": [Function],
              "setOptions": [Function],
            },
            "setState": [Function],
            "subscribe": [Function],
          },
          "webSocketProviders": Map {},
        }
      `)
    })

    it('throws when not inside Provider', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      vi.spyOn(console, 'error').mockImplementation(() => {})

      try {
        const wrapper = ({ children }: { children?: React.ReactNode }) =>
          React.createElement('div', { children })
        renderHook(() => useClient(), { wrapper })
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `
          [Error: \`useClient\` must be used within \`WagmiConfig\`.

          Read more: https://wagmi.sh/react/WagmiConfig]
        `,
        )
      }
    })
  })
})

import { renderHook } from '@solidjs/testing-library'

import { createComponent } from 'solid-js'
import { describe, expect, it, vi } from 'vitest'

import { renderHook as _renderHook } from '../test'

import type { Props } from '../test'
import { useClient } from './context'

describe('useClient', () => {
  describe('mounts', () => {
    it('default', () => {
      const { result } = _renderHook(() => useClient())
      expect(result).toMatchInlineSnapshot(`
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
              "wagmi.store": "{\\"state\\":{},\\"version\\":2}",
            },
            "webSocketProvider": undefined,
          },
          "providers": Map {
            -1 => "<Provider network={1} />",
          },
          "storage": {
            "getItem": [Function],
            "removeItem": [Function],
            "setItem": [Function],
            "wagmi.store": "{\\"state\\":{},\\"version\\":2}",
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
        const wrapper = (props: Props) =>
          createComponent(() => <div />, { children: props.children })
        renderHook(() => useClient(), { wrapper })
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          `
          [Error: \`useClient\` must be used within \`WagmiConfig\`.

          Read more: https://wagmi.sh/solid/WagmiConfig]
        `,
        )
      }
    })
  })
})

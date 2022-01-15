import * as React from 'react'

import { renderHook, wrapper } from '../test'
import { useContext } from './context'

describe('useContext', () => {
  it('should throw when not inside Provider', () => {
    const wrapper = ({ children }: { children: React.ReactElement }) =>
      React.createElement('div', { children })
    const { result } = renderHook(() => useContext(), { wrapper })
    expect(() => result.current).toThrowErrorMatchingInlineSnapshot(
      `"Must be used within Provider"`,
    )
  })

  it('inits', () => {
    const { result } = renderHook(() => useContext())
    const state = result.current.state
    const { connectors, provider, ...rest } = state
    expect(rest).toMatchInlineSnapshot(`
      {
        "cacheBuster": 1,
        "connecting": false,
        "connector": undefined,
        "data": undefined,
        "webSocketProvider": undefined,
      }
    `)
    expect(connectors).toBeDefined()
    expect(provider).toBeDefined()
  })

  it('autoConnect', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useContext(), {
      wrapper,
      initialProps: {
        autoConnect: true,
      },
    })
    expect(result.current.state.connecting).toMatchInlineSnapshot(`true`)
    await waitForNextUpdate()
    expect(result.current.state.connecting).toMatchInlineSnapshot(`false`)
  })
})

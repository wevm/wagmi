import { fireEvent, screen } from '@testing-library/react'
import { act, cleanup, render, renderHook } from '@wagmi/test/react'
import React, { memo, useState } from 'react'
import * as ReactDOM from 'react-dom'
import { afterEach, describe, expect, it } from 'vitest'

import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked.js'

function createExternalStore<State>(initialState: State) {
  const listeners = new Set<() => void>()
  let currentState = initialState
  return {
    set(updater: (state: State) => State) {
      currentState = updater(currentState)
      ReactDOM.unstable_batchedUpdates(() => {
        for (const listener of listeners) {
          listener()
        }
      })
    },
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    getState() {
      return currentState
    },
  }
}

function useExternalStore(
  store: ReturnType<typeof createExternalStore>,
  cb: (state: any) => void,
) {
  const state = useSyncExternalStoreWithTracked(
    store.subscribe,
    store.getState,
    store.getState,
  )
  cb(state)
  return state as any
}

describe('useSyncExternalStoreWithTracked', () => {
  afterEach(() => {
    cleanup()
  })

  it('rerenders only when the tracked value changes', async () => {
    const externalStore = createExternalStore({
      foo: 'bar',
      gm: 'wagmi',
      isGonnaMakeIt: false,
    })

    const renders: any[] = []

    renderHook(() => {
      const { gm } = useExternalStore(externalStore, (state) => {
        renders.push(state)
      })

      return gm
    })

    act(() => {
      externalStore.set((x) => ({ ...x, foo: 'baz', isGonnaMakeIt: true }))
    })

    expect(renders).toMatchInlineSnapshot(`
      [
        {
          "foo": "bar",
          "gm": "wagmi",
          "isGonnaMakeIt": false,
        },
      ]
    `)

    act(() => {
      externalStore.set((x) => ({ ...x, gm: 'ngmi' }))
    })

    expect(renders).toMatchInlineSnapshot(`
      [
        {
          "foo": "bar",
          "gm": "wagmi",
          "isGonnaMakeIt": false,
        },
        {
          "foo": "baz",
          "gm": "ngmi",
          "isGonnaMakeIt": true,
        },
      ]
    `)
  })

  it('rerenders when all values are being tracked', async () => {
    const externalStore = createExternalStore({
      foo: 'bar',
      gm: 'wagmi',
      isGonnaMakeIt: false,
    })

    const renders: any[] = []

    renderHook(() => {
      const { foo, gm, isGonnaMakeIt } = useExternalStore(
        externalStore,
        (state) => {
          renders.push(state)
        },
      )

      return {
        foo,
        gm,
        isGonnaMakeIt,
      }
    })

    act(() => {
      externalStore.set((x) => ({ ...x, isGonnaMakeIt: true }))
    })

    expect(renders).toMatchInlineSnapshot(`
      [
        {
          "foo": "bar",
          "gm": "wagmi",
          "isGonnaMakeIt": false,
        },
        {
          "foo": "bar",
          "gm": "wagmi",
          "isGonnaMakeIt": true,
        },
      ]
    `)
  })

  it('rerenders when no values are being tracked', async () => {
    const externalStore = createExternalStore({
      foo: 'bar',
      gm: 'wagmi',
      isGonnaMakeIt: false,
    })

    const renders: any[] = []

    renderHook(() => {
      useExternalStore(externalStore, (state) => {
        renders.push(state)
      })
    })

    act(() => {
      externalStore.set((x) => ({ ...x, isGonnaMakeIt: true }))
    })

    expect(renders).toMatchInlineSnapshot(`
      [
        {
          "foo": "bar",
          "gm": "wagmi",
          "isGonnaMakeIt": false,
        },
        {
          "foo": "bar",
          "gm": "wagmi",
          "isGonnaMakeIt": true,
        },
      ]
    `)
  })

  it("create store's new object reference when only values changed", async () => {
    const externalStore = createExternalStore({
      foo: 'bar',
      gm: 'wagmi',
      isGonnaMakeIt: false,
    })

    let rerenders = -1

    const TRIGGER_BTN_TEXT = 'Trigger re-render'

    const MemoComponent = memo((props: { store: any }) => {
      rerenders++
      return <div>{props.store.isGonnaMakeIt}</div>
    })

    const Test = () => {
      const store = useExternalStore(externalStore, () => {})
      const [, forceTestRerender] = useState<number>(0)

      return (
        <>
          <MemoComponent store={store} />
          <button onClick={() => forceTestRerender((prev) => prev + 1)}>
            {TRIGGER_BTN_TEXT}
          </button>
        </>
      )
    }

    render(<Test />)
    const forceRerenderBtn = screen.getByText(TRIGGER_BTN_TEXT)

    expect(rerenders).toBe(0)

    fireEvent.click(forceRerenderBtn) // updating other state won't make the store be a new object

    expect(rerenders).toBe(0)

    act(() => {
      externalStore.set((x) => ({ ...x, isGonnaMakeIt: true })) // trigger rerendering when the used value changes
    })

    expect(rerenders).toBe(1)
  })
})

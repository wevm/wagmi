import * as ReactDOM from 'react-dom'
import { afterEach, describe, expect, it } from 'vitest'

import { act, cleanup, renderHook } from '../../../test'
import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked'

function createExternalStore<State>(initialState: State) {
  const listeners = new Set<() => void>()
  let currentState = initialState
  return {
    set(updater: (state: State) => State) {
      currentState = updater(currentState)
      ReactDOM.unstable_batchedUpdates(() => {
        listeners.forEach((listener) => listener())
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
})

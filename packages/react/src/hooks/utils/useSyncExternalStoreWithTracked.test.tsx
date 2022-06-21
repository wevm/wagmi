import { render, unstable_batchedUpdates } from 'react-dom'

import { act, wrapper } from '../../../test'
import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked'

function createExternalStore<State>(initialState: State) {
  const listeners = new Set<() => void>()
  let currentState = initialState
  return {
    set(updater: (state: State) => State) {
      currentState = updater(currentState)
      unstable_batchedUpdates(() => {
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
  it('rerenders when any property changes', async () => {
    const externalStore = createExternalStore({
      foo: 'bar',
      baz: 'wagmi',
      isGonnaMakeIt: false,
    })

    const renders: any[] = []

    function App() {
      const state = useExternalStore(externalStore, (state) =>
        renders.push(state),
      )
      return <div>{JSON.stringify(state)}</div>
    }

    render(wrapper({ children: <App /> }), document.createElement('div'))

    act(() => {
      externalStore.set((x) => ({ ...x, isGonnaMakeIt: true }))
    })

    expect(renders).toMatchInlineSnapshot(`
      [
        {
          "baz": "wagmi",
          "foo": "bar",
          "isGonnaMakeIt": false,
        },
        {
          "baz": "wagmi",
          "foo": "bar",
          "isGonnaMakeIt": true,
        },
      ]
    `)
  })

  it('rerenders only when `baz` changes', async () => {
    const externalStore = createExternalStore({
      foo: 'bar',
      baz: 'wagmi',
      isGonnaMakeIt: false,
    })

    const renders: any[] = []

    function App() {
      const { baz } = useExternalStore(externalStore, (state) =>
        renders.push(state),
      )
      return <div>{baz}</div>
    }

    render(wrapper({ children: <App /> }), document.createElement('div'))

    act(() => {
      externalStore.set((x) => ({ ...x, foo: 'baz', isGonnaMakeIt: true }))
    })

    expect(renders).toMatchInlineSnapshot(`
      [
        {
          "baz": "wagmi",
          "foo": "bar",
          "isGonnaMakeIt": false,
        },
      ]
    `)

    act(() => {
      externalStore.set((x) => ({ ...x, baz: 'ngmi' }))
    })

    expect(renders).toMatchInlineSnapshot(`
      [
        {
          "baz": "wagmi",
          "foo": "bar",
          "isGonnaMakeIt": false,
        },
        {
          "baz": "ngmi",
          "foo": "baz",
          "isGonnaMakeIt": true,
        },
      ]
    `)
  })
})

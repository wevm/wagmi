import { render, renderHook } from '@wagmi/test/react'
import React from 'react'
import * as ReactDOM from 'react-dom'
import { expect, test } from 'vitest'

import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked.js'

function createExternalStore<state>(initialState: state) {
  const listeners = new Set<() => void>()
  let currentState = initialState
  return {
    set(updater: (state: state) => state) {
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

test('rerenders only when the tracked value changes', async () => {
  const externalStore = createExternalStore({
    foo: 'bar',
    gm: 'wagmi',
    isGonnaMakeIt: false,
  })

  const renders: any[] = []

  const { act } = await renderHook(() => {
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

test('rerenders when all values are being tracked', async () => {
  const externalStore = createExternalStore({
    foo: 'bar',
    gm: 'wagmi',
    isGonnaMakeIt: false,
  })

  const renders: any[] = []

  const { act } = await renderHook(() => {
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

test('rerenders when no values are being tracked', async () => {
  const externalStore = createExternalStore({
    foo: 'bar',
    gm: 'wagmi',
    isGonnaMakeIt: false,
  })

  const renders: any[] = []

  const { act } = await renderHook(() => {
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

test('store object reference is stable across rerenders', async () => {
  const externalStore = createExternalStore({
    foo: 'bar',
    gm: 'wagmi',
    isGonnaMakeIt: false,
  })

  let childRenderCount = 0
  const MemoComponent = React.memo((props: { store: any }) => {
    childRenderCount++
    return <div>{props.store.isGonnaMakeIt}</div>
  })

  const renders: any[] = []

  function Test() {
    const store = useExternalStore(externalStore, (state) => {
      renders.push(state)
    })
    const [, rerender] = React.useState(0)

    return (
      <>
        <MemoComponent store={store} />
        <button onClick={() => rerender((prev) => prev + 1)}>rerender</button>
        <button
          onClick={() =>
            externalStore.set((x) => ({ ...x, isGonnaMakeIt: true }))
          }
        >
          update external store
        </button>
      </>
    )
  }

  const screen = await render(<Test />)

  const forceRerenderButton = screen.getByText('rerender')
  expect(childRenderCount).toBe(1)
  expect(renders.length).toBe(1)

  // updating parent state, child should not rerender
  await forceRerenderButton.click()
  expect(childRenderCount).toBe(1)
  expect(renders.length).toBe(2)

  // child and parent both rerender when store changes
  const updateExternalStoreButton = screen.getByText('update')
  await updateExternalStoreButton.click()
  expect(childRenderCount).toBe(2)
  expect(renders.length).toBe(3)
})

test('array', async () => {
  const externalStore = createExternalStore(['foo'])

  const renders: any[] = []

  const { act } = await renderHook(() => {
    const array = useExternalStore(externalStore, (state) => {
      renders.push(state)
    })

    return array
  })

  act(() => {
    externalStore.set((x) => [...x, 'bar'])
  })

  expect(renders).toMatchInlineSnapshot(`
    [
      [
        "foo",
      ],
      [
        "foo",
        "bar",
      ],
    ]
  `)

  act(() => {
    externalStore.set((x) => [...x, 'baz'])
  })

  expect(renders).toMatchInlineSnapshot(`
    [
      [
        "foo",
      ],
      [
        "foo",
        "bar",
      ],
      [
        "foo",
        "bar",
        "baz",
      ],
    ]
  `)
})

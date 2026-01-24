import { chain, config } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { createElement, Fragment } from 'react'
import { expect, test } from 'vitest'

import { useChains } from './useChains.js'

test('default', async () => {
  const { result } = await renderHook(() => useChains())

  expect(result.current.map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)
})

test('parameters: config', async () => {
  const { result } = await renderHook(() => useChains({ config }), {
    wrapper: ({ children }) => createElement(Fragment, { children }),
  })
  expect(result.current.map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)
})

test('behavior: chains updates', async () => {
  const { act, result } = await renderHook(() => useChains())

  const chains = result.current
  expect(
    result.current.map(({ id, name }) => ({
      id,
      name,
    })),
  ).toMatchInlineSnapshot(`
    [
      {
        "id": 1,
        "name": "Ethereum",
      },
      {
        "id": 456,
        "name": "Ethereum",
      },
      {
        "id": 10,
        "name": "OP Mainnet",
      },
    ]
  `)

  await act(() =>
    config._internal.chains.setState([chain.mainnet, chain.mainnet2]),
  )

  expect(
    result.current.map(({ id, name }) => ({
      id,
      name,
    })),
  ).toMatchInlineSnapshot(`
    [
      {
        "id": 1,
        "name": "Ethereum",
      },
      {
        "id": 456,
        "name": "Ethereum",
      },
    ]
  `)

  await act(() => config._internal.chains.setState(chains))

  expect(
    result.current.map(({ id, name }) => ({
      id,
      name,
    })),
  ).toMatchInlineSnapshot(`
    [
      {
        "id": 1,
        "name": "Ethereum",
      },
      {
        "id": 456,
        "name": "Ethereum",
      },
      {
        "id": 10,
        "name": "OP Mainnet",
      },
    ]
  `)
})

import { chain, config } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test } from 'vitest'

import { useChains } from './useChains.js'

test('default', async () => {
  const { result } = renderPrimitive(() => useChains())

  expect(result().map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)
})

test('parameters: config', async () => {
  const { result } = renderPrimitive(() => useChains(() => ({ config })), {
    wrapper: (props) => props.children,
  })
  expect(result().map((x) => x.id)).toMatchInlineSnapshot(`
    [
      1,
      456,
      10,
    ]
  `)
})

test('behavior: chains updates', async () => {
  const { result } = renderPrimitive(() => useChains())

  const chains = result()
  expect(
    result().map(({ id, name }) => ({
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

  config._internal.chains.setState([chain.mainnet, chain.mainnet2])

  expect(
    result().map(({ id, name }) => ({
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

  config._internal.chains.setState(chains)

  expect(
    result().map(({ id, name }) => ({
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

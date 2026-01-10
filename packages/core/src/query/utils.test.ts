import { abi } from '@wagmi/test'
import { expect, expectTypeOf, test } from 'vitest'
import { filterQueryOptions, structuralSharing } from './utils.js'

test('structuralSharing', () => {
  expect(
    structuralSharing({ foo: 'bar' }, { foo: 'bar' }),
  ).toMatchInlineSnapshot(`
    {
      "foo": "bar",
    }
  `)
  expect(
    structuralSharing({ foo: 'bar' }, { foo: 'baz' }),
  ).toMatchInlineSnapshot(`
    {
      "foo": "baz",
    }
  `)
})

test('filterQueryOptions', () => {
  const options = filterQueryOptions({
    foo: 'bar',
    baz: true,
    abi: abi.erc20,
    connector: undefined,
  })
  expectTypeOf(options).toEqualTypeOf<{
    foo: string
    baz: boolean
    connectorUid?: string | undefined
  }>()
  expect(options).toMatchInlineSnapshot(`
    {
      "baz": true,
      "foo": "bar",
    }
  `)
})

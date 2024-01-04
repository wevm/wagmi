import { expect, test } from 'vitest'

import { BaseError } from './base.js'

test('BaseError', () => {
  expect(new BaseError('An error occurred.')).toMatchInlineSnapshot(`
    [WagmiCoreError: An error occurred.

    Version: @wagmi/core@x.y.z]
  `)

  expect(
    new BaseError('An error occurred.', { details: 'details' }),
  ).toMatchInlineSnapshot(`
    [WagmiCoreError: An error occurred.

    Details: details
    Version: @wagmi/core@x.y.z]
  `)

  expect(new BaseError('', { details: 'details' })).toMatchInlineSnapshot(`
    [WagmiCoreError: An error occurred.

    Details: details
    Version: @wagmi/core@x.y.z]
  `)
})

test('BaseError (w/ docsPath)', () => {
  expect(
    new BaseError('An error occurred.', {
      details: 'details',
      docsPath: '/lol',
    }),
  ).toMatchInlineSnapshot(`
    [WagmiCoreError: An error occurred.

    Docs: https://wagmi.sh/core/lol.html
    Details: details
    Version: @wagmi/core@x.y.z]
  `)
  expect(
    new BaseError('An error occurred.', {
      cause: new BaseError('error', { docsPath: '/docs' }),
    }),
  ).toMatchInlineSnapshot(`
    [WagmiCoreError: An error occurred.

    Docs: https://wagmi.sh/core/docs.html
    Version: @wagmi/core@x.y.z]
  `)
  expect(
    new BaseError('An error occurred.', {
      cause: new BaseError('error'),
      docsPath: '/lol',
    }),
  ).toMatchInlineSnapshot(`
    [WagmiCoreError: An error occurred.

    Docs: https://wagmi.sh/core/lol.html
    Version: @wagmi/core@x.y.z]
  `)
  expect(
    new BaseError('An error occurred.', {
      details: 'details',
      docsPath: '/lol',
      docsSlug: 'test',
    }),
  ).toMatchInlineSnapshot(`
    [WagmiCoreError: An error occurred.

    Docs: https://wagmi.sh/core/lol.html#test
    Details: details
    Version: @wagmi/core@x.y.z]
  `)
})

test('BaseError (w/ metaMessages)', () => {
  expect(
    new BaseError('An error occurred.', {
      details: 'details',
      metaMessages: ['Reason: idk', 'Cause: lol'],
    }),
  ).toMatchInlineSnapshot(`
    [WagmiCoreError: An error occurred.

    Reason: idk
    Cause: lol

    Details: details
    Version: @wagmi/core@x.y.z]
  `)
})

test('inherited BaseError', () => {
  const err = new BaseError('An error occurred.', {
    details: 'details',
    docsPath: '/lol',
  })
  expect(
    new BaseError('An internal error occurred.', {
      cause: err,
    }),
  ).toMatchInlineSnapshot(`
    [WagmiCoreError: An internal error occurred.

    Docs: https://wagmi.sh/core/lol.html
    Details: details
    Version: @wagmi/core@x.y.z]
  `)
})

test('inherited Error', () => {
  const err = new Error('details')
  expect(
    new BaseError('An internal error occurred.', {
      cause: err,
      docsPath: '/lol',
    }),
  ).toMatchInlineSnapshot(`
    [WagmiCoreError: An internal error occurred.

    Docs: https://wagmi.sh/core/lol.html
    Details: details
    Version: @wagmi/core@x.y.z]
  `)
})

test('walk: no predicate fn (walks to leaf)', () => {
  class FooError extends BaseError {}
  class BarError extends BaseError {}

  const err = new BaseError('test1', {
    cause: new FooError('test2', { cause: new BarError('test3') }),
  })
  expect(err.walk()).toMatchInlineSnapshot(`
    [WagmiCoreError: test3

    Version: @wagmi/core@x.y.z]
  `)
})

test('walk: predicate fn', () => {
  class FooError extends BaseError {}
  class BarError extends BaseError {}

  const err = new BaseError('test1', {
    cause: new FooError('test2', { cause: new BarError('test3') }),
  })
  expect(err.walk((err) => err instanceof FooError)).toMatchInlineSnapshot(`
    [WagmiCoreError: test2

    Version: @wagmi/core@x.y.z]
  `)
})

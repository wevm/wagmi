import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { Readable } from 'node:stream'
import { test } from 'node:test'

test('stream-json preserves JSON properties without changing object prototypes', async () => {
  const connectors = createRequire(
    new URL('../packages/connectors/package.json', import.meta.url),
  )
  const account = createRequire(connectors.resolve('@base-org/account'))
  const cdp = createRequire(account.resolve('@coinbase/cdp-sdk'))
  const solana = createRequire(cdp.resolve('@solana/web3.js'))
  const jayson = createRequire(solana.resolve('jayson'))
  const StreamValues = jayson('stream-json/streamers/StreamValues')
  const source =
    '{"__proto__":{"isAdmin":true},"nested":{"__proto__":["admin"],"name":"alice"},"nullPrototype":{"__proto__":null},"values":[{"__proto__":"value"}],"duplicate":1,"duplicate":2,"drop":3}'

  for (const reviver of [
    undefined,
    (key: string, value: unknown) =>
      key === 'drop'
        ? undefined
        : typeof value === 'number'
          ? value * 2
          : value,
  ]) {
    const stream = Readable.from([source.slice(0, 31), source.slice(31)]).pipe(
      StreamValues.withParser({ reviver }),
    )
    const results = []
    for await (const { value } of stream) results.push(value)

    assert.deepStrictEqual(results, [JSON.parse(source, reviver)])
    assert.equal(Object.getPrototypeOf(results[0]), Object.prototype)
    assert.equal(results[0].isAdmin, undefined)
    assert.equal(Object.hasOwn(results[0], '__proto__'), true)
  }
})

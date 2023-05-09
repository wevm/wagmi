import { describe, expect, it } from 'vitest'

import { serialize } from './serialize'

class Foo {
  value: string

  constructor(value: string) {
    this.value = value
  }
}

const simpleObject = {
  boolean: true,
  fn() {
    return 'foo'
  },
  nan: NaN,
  nil: null,
  number: 123,
  string: 'foo',
  undef: undefined,
  [Symbol('key')]: 'value',
}

const bigintObject = Object.assign({}, simpleObject, {
  bigint: 123n,
  nested: {
    bigint: {
      value: 69n,
    },
  },
})

const complexObject = Object.assign({}, simpleObject, {
  array: ['foo', { bar: 'baz' }],
  buffer: new Buffer('this is a test buffer'),
  error: new Error('boom'),
  foo: new Foo('value'),
  map: new Map().set('foo', { bar: 'baz' }),
  object: { foo: { bar: 'baz' } },
  promise: Promise.resolve('foo'),
  regexp: /foo/,
  set: new Set().add('foo').add({ bar: 'baz' }),
  weakmap: new WeakMap([
    [{}, 'foo'],
    [{}, 'bar'],
  ]),
  weakset: new WeakSet([{}, {}]),
})

const circularObject = Object.assign({}, complexObject, {
  deeply: {
    nested: {
      reference: {},
    },
  },
})

circularObject.deeply.nested.reference = circularObject

describe('stringify', () => {
  describe('handling of object types', () => {
    it('should handle simple objects', () => {
      const result = serialize(simpleObject)

      expect(result).toMatchInlineSnapshot(
        '"{\\"boolean\\":true,\\"nan\\":null,\\"nil\\":null,\\"number\\":123,\\"string\\":\\"foo\\"}"',
      )
    })

    it('should handle objects with bigints', () => {
      const result = serialize(bigintObject)

      expect(result).toMatchInlineSnapshot(
        '"{\\"boolean\\":true,\\"nan\\":null,\\"nil\\":null,\\"number\\":123,\\"string\\":\\"foo\\",\\"bigint\\":\\"#bigint.123\\",\\"nested\\":{\\"bigint\\":{\\"value\\":\\"#bigint.69\\"}}}"',
      )
    })

    it('should handle simple objects with a custom replacer', () => {
      const replacer = (_key: string, value: any) =>
        value && typeof value === 'object' ? value : `primitive-${value}`

      const result = serialize(simpleObject, replacer)

      expect(result).toMatchInlineSnapshot(
        '"{\\"boolean\\":\\"primitive-true\\",\\"fn\\":\\"primitive-fn() {\\\\n    return \\\\\\"foo\\\\\\";\\\\n  }\\",\\"nan\\":\\"primitive-NaN\\",\\"nil\\":\\"primitive-null\\",\\"number\\":\\"primitive-123\\",\\"string\\":\\"primitive-foo\\",\\"undef\\":\\"primitive-undefined\\"}"',
      )
    })

    it('should handle simple objects with indentation', () => {
      const result = serialize(simpleObject, null, 2)

      expect(result).toMatchInlineSnapshot(`
        "{
          \\"boolean\\": true,
          \\"nan\\": null,
          \\"nil\\": null,
          \\"number\\": 123,
          \\"string\\": \\"foo\\"
        }"
      `)
    })

    it('should handle bigint objects with indentation', () => {
      const result = serialize(bigintObject, null, 2)

      expect(result).toMatchInlineSnapshot(`
        "{
          \\"boolean\\": true,
          \\"nan\\": null,
          \\"nil\\": null,
          \\"number\\": 123,
          \\"string\\": \\"foo\\",
          \\"bigint\\": \\"#bigint.123\\",
          \\"nested\\": {
            \\"bigint\\": {
              \\"value\\": \\"#bigint.69\\"
            }
          }
        }"
      `)
    })

    it('should handle complex objects', () => {
      const result = serialize(complexObject)

      expect(result).toMatchInlineSnapshot(
        '"{\\"boolean\\":true,\\"nan\\":null,\\"nil\\":null,\\"number\\":123,\\"string\\":\\"foo\\",\\"array\\":[\\"foo\\",{\\"bar\\":\\"baz\\"}],\\"buffer\\":{\\"type\\":\\"Buffer\\",\\"data\\":[116,104,105,115,32,105,115,32,97,32,116,101,115,116,32,98,117,102,102,101,114]},\\"error\\":{},\\"foo\\":{\\"value\\":\\"value\\"},\\"map\\":{},\\"object\\":{\\"foo\\":{\\"bar\\":\\"baz\\"}},\\"promise\\":{},\\"regexp\\":{},\\"set\\":{},\\"weakmap\\":{},\\"weakset\\":{}}"',
      )
    })

    it('should handle complex objects with a custom replacer', () => {
      const replacer = (_key: string, value: any) =>
        value && typeof value === 'object' ? value : `primitive-${value}`

      const result = serialize(complexObject, replacer)

      expect(result).toMatchInlineSnapshot(
        '"{\\"boolean\\":\\"primitive-true\\",\\"fn\\":\\"primitive-fn() {\\\\n    return \\\\\\"foo\\\\\\";\\\\n  }\\",\\"nan\\":\\"primitive-NaN\\",\\"nil\\":\\"primitive-null\\",\\"number\\":\\"primitive-123\\",\\"string\\":\\"primitive-foo\\",\\"undef\\":\\"primitive-undefined\\",\\"array\\":[\\"primitive-foo\\",{\\"bar\\":\\"primitive-baz\\"}],\\"buffer\\":{\\"type\\":\\"primitive-Buffer\\",\\"data\\":[\\"primitive-116\\",\\"primitive-104\\",\\"primitive-105\\",\\"primitive-115\\",\\"primitive-32\\",\\"primitive-105\\",\\"primitive-115\\",\\"primitive-32\\",\\"primitive-97\\",\\"primitive-32\\",\\"primitive-116\\",\\"primitive-101\\",\\"primitive-115\\",\\"primitive-116\\",\\"primitive-32\\",\\"primitive-98\\",\\"primitive-117\\",\\"primitive-102\\",\\"primitive-102\\",\\"primitive-101\\",\\"primitive-114\\"]},\\"error\\":{},\\"foo\\":{\\"value\\":\\"primitive-value\\"},\\"map\\":{},\\"object\\":{\\"foo\\":{\\"bar\\":\\"primitive-baz\\"}},\\"promise\\":{},\\"regexp\\":{},\\"set\\":{},\\"weakmap\\":{},\\"weakset\\":{}}"',
      )
    })

    it('should handle circular objects', () => {
      const result = serialize(circularObject)

      expect(result).toEqual(
        JSON.stringify(
          circularObject,
          (() => {
            const cache: any[] = []

            return (_key, value) => {
              if (value && typeof value === 'object' && ~cache.indexOf(value)) {
                return `[ref=.]`
              }

              cache.push(value)

              return value
            }
          })(),
        ),
      )
    })

    it('should handle circular objects with a custom circular replacer', () => {
      const result = serialize(
        circularObject,
        null,
        null,
        (_key: string, _value: string, referenceKey: string) => referenceKey,
      )
      const circularReplacer = (() => {
        const cache: any[] = []

        return (_key: string, value: any) => {
          if (value && typeof value === 'object' && ~cache.indexOf(value)) {
            return '.'
          }

          cache.push(value)

          return value
        }
      })()

      expect(result).toEqual(JSON.stringify(circularObject, circularReplacer))
    })
  })

  describe('key references', () => {
    it('should point to the top level object when it is referenced', () => {
      const object = {
        foo: 'bar',
        deeply: {
          recursive: {
            object: {},
          },
        },
      }

      object.deeply.recursive.object = object

      expect(serialize(object)).toEqual(
        `{"foo":"bar","deeply":{"recursive":{"object":"[ref=.]"}}}`,
      )
    })

    it('should point to the nested object when it is referenced', () => {
      const object = {
        foo: 'bar',
        deeply: {
          recursive: {
            object: {},
          },
        },
      }

      object.deeply.recursive.object = object.deeply.recursive

      expect(serialize(object)).toEqual(
        `{"foo":"bar","deeply":{"recursive":{"object":"[ref=.deeply.recursive]"}}}`,
      )
    })
  })
})

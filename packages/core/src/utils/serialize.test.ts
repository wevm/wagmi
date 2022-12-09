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

      expect(result).toEqual(JSON.stringify(simpleObject))
    })

    it('should handle simple objects with a custom replacer', () => {
      const replacer = (_key: string, value: any) =>
        value && typeof value === 'object' ? value : `primitive-${value}`

      const result = serialize(simpleObject, replacer)

      expect(result).toEqual(JSON.stringify(simpleObject, replacer))
    })

    it('should handle simple objects with indentation', () => {
      const result = serialize(simpleObject, null, 2)

      expect(result).toEqual(JSON.stringify(simpleObject, null, 2))
    })

    it('should handle complex objects', () => {
      const result = serialize(complexObject)

      expect(result).toEqual(JSON.stringify(complexObject))
    })

    it('should handle complex objects with a custom replacer', () => {
      const replacer = (_key: string, value: any) =>
        value && typeof value === 'object' ? value : `primitive-${value}`

      const result = serialize(complexObject, replacer)

      expect(result).toEqual(JSON.stringify(complexObject, replacer))
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

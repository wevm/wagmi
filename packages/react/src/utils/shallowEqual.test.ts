import { shallowEqual } from './shallowEqual'

describe('shallowEqual', () => {
  it('compares primitive values', () => {
    expect(shallowEqual(true, true)).toBe(true)
    expect(shallowEqual(true, false)).toBe(false)

    expect(shallowEqual(1, 1)).toBe(true)
    expect(shallowEqual(1, 2)).toBe(false)

    expect(shallowEqual('zustand', 'zustand')).toBe(true)
    expect(shallowEqual('zustand', 'redux')).toBe(false)
  })

  it('compares objects', () => {
    expect(
      shallowEqual({ foo: 'bar', asd: 123 }, { foo: 'bar', asd: 123 }),
    ).toBe(true)

    expect(
      shallowEqual({ foo: 'bar', asd: 123 }, { foo: 'bar', foobar: true }),
    ).toBe(false)

    expect(
      shallowEqual(
        { foo: 'bar', asd: 123 },
        { foo: 'bar', asd: 123, foobar: true },
      ),
    ).toBe(false)
  })

  it('compares arrays', () => {
    expect(shallowEqual([1, 2, 3], [1, 2, 3])).toBe(true)

    expect(shallowEqual([1, 2, 3], [2, 3, 4])).toBe(false)

    expect(
      shallowEqual(
        [{ foo: 'bar' }, { asd: 123 }],
        [{ foo: 'bar' }, { asd: 123 }],
      ),
    ).toBe(false)

    expect(shallowEqual([{ foo: 'bar' }], [{ foo: 'bar', asd: 123 }])).toBe(
      false,
    )
  })
})

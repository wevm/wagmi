import { describe, expect, it } from 'vitest'

import { createStorage } from './storage'

describe('createStorage', () => {
  it('inits', () => {
    const storage = createStorage({ storage: window.localStorage })
    expect(storage).toBeDefined()
  })

  it('getItem', () => {
    const storage = createStorage({ storage: window.localStorage })
    storage.getItem('foo')
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1)
    expect(window.localStorage.getItem).toHaveBeenCalledWith('wagmi.foo')
  })

  it('setItem', () => {
    const storage = createStorage({ storage: window.localStorage })
    storage.setItem('foo', 'bar')
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'wagmi.foo',
      '"bar"',
    )
  })

  it('removeItem', () => {
    const storage = createStorage({ storage: window.localStorage })
    storage.removeItem('foo')
    expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('wagmi.foo')
  })
})

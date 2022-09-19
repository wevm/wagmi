import { describe, expect, it, vi } from 'vitest'

import { debounce } from './debounce'

describe('debounce', () => {
  it('invokes once', async () => {
    const listener = vi.fn()
    const debouncedListener = debounce(listener, 200)

    debouncedListener()
    await new Promise((res) => setTimeout(res, 10))
    debouncedListener()
    await new Promise((res) => setTimeout(res, 20))
    debouncedListener()
    debouncedListener()
    await new Promise((res) => setTimeout(res, 40))
    debouncedListener()

    await new Promise((res) => setTimeout(res, 200))

    expect(listener).toBeCalledTimes(1)
  })

  it('invokes after wait time', async () => {
    const listener = vi.fn()
    const debouncedListener = debounce(listener, 100)

    debouncedListener()
    debouncedListener()
    await new Promise((res) => setTimeout(res, 200))
    debouncedListener()
    debouncedListener()
    debouncedListener()

    await new Promise((res) => setTimeout(res, 200))

    expect(listener).toBeCalledTimes(2)
  })
})

import { afterEach, describe, expect, it, vi } from 'vitest'

import { createFixture } from '../../test'
import { getIsUsingTypeScript } from './getIsUsingTypeScript'

describe('getIsUsingTypeScript', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('true', async () => {
    const { dir } = await createFixture({
      files: {
        ['tsconfig.json']: '',
      },
    })

    const spy = vi.spyOn(process, 'cwd')
    spy.mockImplementation(() => dir)

    await expect(getIsUsingTypeScript()).resolves.toBe(true)
  })

  it('false', async () => {
    const { dir } = await createFixture()

    const spy = vi.spyOn(process, 'cwd')
    spy.mockImplementation(() => dir)

    await expect(getIsUsingTypeScript()).resolves.toBe(false)
  })
})

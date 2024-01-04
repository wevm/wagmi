import { afterEach, expect, test, vi } from 'vitest'

import { createFixture } from '../../test/utils.js'
import { getIsUsingTypeScript } from './getIsUsingTypeScript.js'

afterEach(() => {
  vi.restoreAllMocks()
})

test('true', async () => {
  const { dir } = await createFixture({
    files: {
      'tsconfig.json': '',
    },
  })

  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  await expect(getIsUsingTypeScript()).resolves.toBe(true)
})

test('false', async () => {
  const { dir } = await createFixture()

  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  await expect(getIsUsingTypeScript()).resolves.toBe(false)
})

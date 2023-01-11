import { default as fse } from 'fs-extra'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { mockCwd } from '../../test'
import { getIsUsingTypeScript } from './getIsUsingTypeScript'

describe('getIsUsingTypeScript', () => {
  let temp: string
  beforeEach(() => {
    temp = mockCwd()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('true', async () => {
    const configPath = `${temp}/tsconfig.json`
    fse.writeFile(configPath, '')
    await expect(getIsUsingTypeScript()).resolves.toBe(true)
  })

  it('false', async () => {
    await expect(getIsUsingTypeScript()).resolves.toBe(false)
  })
})

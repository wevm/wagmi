import fixtures from 'fixturez'
import { default as fse } from 'fs-extra'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getIsUsingTypeScript } from './getIsUsingTypeScript'

const f = fixtures(__dirname)

describe('getIsUsingTypeScript', () => {
  let temp: string
  beforeEach(() => {
    temp = f.temp()

    const spy = vi.spyOn(process, 'cwd')
    spy.mockImplementationOnce(() => temp)
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

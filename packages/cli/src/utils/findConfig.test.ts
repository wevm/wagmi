import fixtures from 'fixturez'
import { default as fse } from 'fs-extra'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { findConfig } from './findConfig'

const f = fixtures(__dirname)

describe('findConfig', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('finds config file', async () => {
    const temp = f.temp()

    const spy = vi.spyOn(process, 'cwd')
    spy.mockImplementationOnce(() => temp)

    const configPath = `${temp}/wagmi.config.ts`
    fse.writeFile(configPath, '')
    expect(await findConfig()).toContain(configPath)
  })

  it('finds config file at location', async () => {
    const temp = f.temp()
    const configPath = `${temp}/wagmi.config.ts`
    fse.writeFile(configPath, '')
    expect(await findConfig({ config: configPath })).toEqual(configPath)
  })

  it('finds config file at root', async () => {
    const temp = f.temp()
    const configPath = `${temp}/wagmi.config.ts`
    fse.writeFile(configPath, '')
    expect(await findConfig({ root: temp })).toContain(configPath)
    fse.rm(configPath)
  })
})

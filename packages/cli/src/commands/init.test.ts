import fixtures from 'fixturez'
import { default as fse } from 'fs-extra'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { defaultConfig } from '../config'

import * as logger from '../logger'
import { init } from './init'

const f = fixtures(__dirname)

const mockLog = vi.fn()

describe('init', () => {
  let temp: string
  beforeEach(() => {
    temp = f.temp()
    const spy = vi.spyOn(process, 'cwd')
    spy.mockImplementation(() => temp)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates config file', async () => {
    const spyLoggerLog = vi.spyOn(logger, 'log')
    spyLoggerLog.mockImplementation(mockLog)
    const spyLoggerSuccess = vi.spyOn(logger, 'success')
    spyLoggerSuccess.mockImplementation(mockLog)

    const configFile = `${temp}/wagmi.config.js`
    await init()

    expect(spyLoggerLog).toHaveBeenCalledWith('Creating config…')
    expect(spyLoggerSuccess).toHaveBeenCalledWith(
      `Config created at "${configFile}"`,
    )
    expect(fse.existsSync(configFile)).toBeTruthy()
    expect(await fse.readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
      "// @ts-check

      /** @type {import('@wagmi/cli').Config} */
      export default { out: 'src/generated.js', contracts: [], plugins: [] }
      "
    `)
  })

  it('creates config file in TypeScript format', async () => {
    const spyLoggerLog = vi.spyOn(logger, 'log')
    spyLoggerLog.mockImplementation(mockLog)
    const spyLoggerSuccess = vi.spyOn(logger, 'success')
    spyLoggerSuccess.mockImplementation(mockLog)

    fse.writeFile(`${temp}/tsconfig.json`, '{}')
    const configFile = `${temp}/wagmi.config.ts`
    await init()

    expect(spyLoggerLog).toHaveBeenCalledWith('Creating config…')
    expect(spyLoggerSuccess).toHaveBeenCalledWith(
      `Config created at "${configFile}"`,
    )
    expect(fse.existsSync(configFile)).toBeTruthy()
    expect(await fse.readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
      "import { defineConfig } from '@wagmi/cli'

      export default defineConfig({
        out: 'src/generated.ts',
        contracts: [],
        plugins: [],
      })
      "
    `)
  })

  it('creates config file with content', async () => {
    const spyLoggerLog = vi.spyOn(logger, 'log')
    spyLoggerLog.mockImplementation(mockLog)
    const spyLoggerSuccess = vi.spyOn(logger, 'success')
    spyLoggerSuccess.mockImplementation(mockLog)

    fse.writeFile(`${temp}/tsconfig.json`, '{}')
    const configFile = `${temp}/wagmi.config.ts`
    await init({
      config: {
        ...defaultConfig,
        out: 'foo/bar/baz.ts',
      },
    })

    expect(spyLoggerLog).toHaveBeenCalledWith('Creating config…')
    expect(spyLoggerSuccess).toHaveBeenCalledWith(
      `Config created at "${configFile}"`,
    )
    expect(fse.existsSync(configFile)).toBeTruthy()
    expect(await fse.readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
      "import { defineConfig } from '@wagmi/cli'

      export default defineConfig({
        out: 'foo/bar/baz.ts',
        contracts: [],
        plugins: [],
      })
      "
    `)
  })

  it('displays config file location when config exists', async () => {
    const spyLoggerLog = vi.spyOn(logger, 'log')
    spyLoggerLog.mockImplementation(mockLog)
    const spyLoggerInfo = vi.spyOn(logger, 'info')
    spyLoggerInfo.mockImplementation(mockLog)

    const configFile = `${temp}/wagmi.config.ts`
    fse.writeFile(configFile, '')
    await init()
    expect(spyLoggerLog).toHaveBeenCalledWith('Creating config…')
    expect(spyLoggerInfo).toHaveBeenCalledWith(
      `Config already exists at "${configFile}"`,
    )
  })
})

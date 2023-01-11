import { default as fse } from 'fs-extra'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createFixture, mockCwd, mockLogger } from '../../test'
import { defaultConfig } from '../config'

import { init } from './init'

describe('init', () => {
  let logger: ReturnType<typeof mockLogger>
  let temp: string
  beforeEach(() => {
    logger = mockLogger()
    temp = mockCwd()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates config file', async () => {
    await init()

    expect(logger.log).toHaveBeenCalledWith('Creating config…')
    const configFile = `${temp}/wagmi.config.js`
    expect(logger.success).toHaveBeenCalledWith(
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
    const { projectDir } = await createFixture({
      dir: temp,
      files: {
        'tsconfig.json': '{}',
      },
    })

    await init()

    const configFile = `${projectDir}/wagmi.config.ts`
    expect(logger.log).toHaveBeenCalledWith('Creating config…')
    expect(logger.success).toHaveBeenCalledWith(
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
    const { projectDir } = await createFixture({
      dir: temp,
      files: {
        'tsconfig.json': '{}',
      },
    })

    await init({
      config: {
        ...defaultConfig,
        out: 'foo/bar/baz.ts',
      },
    })

    const configFile = `${projectDir}/wagmi.config.ts`
    expect(logger.log).toHaveBeenCalledWith('Creating config…')
    expect(logger.success).toHaveBeenCalledWith(
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
    const { filePaths } = await createFixture({
      dir: temp,
      files: {
        'wagmi.config.ts': '',
      },
    })

    await init()

    expect(logger.log).toHaveBeenCalledWith('Creating config…')
    expect(logger.info).toHaveBeenCalledWith(
      `Config already exists at "${filePaths['wagmi.config.ts']}"`,
    )
  })
})

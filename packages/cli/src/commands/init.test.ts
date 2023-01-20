import { default as fse } from 'fs-extra'
import { resolve } from 'pathe'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createFixture, mockConsole, mockCwd } from '../../test'
import { defaultConfig } from '../config'

import { init } from './init'

describe('init', () => {
  let mockedConsole: ReturnType<typeof mockConsole>
  let temp: string
  beforeEach(() => {
    mockedConsole = mockConsole()
    temp = mockCwd()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates config file', async () => {
    const configFile = await init()

    expect(fse.existsSync(configFile)).toBeTruthy()
    expect(await fse.readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
      "// @ts-check

      /** @type {import('@wagmi/cli').Config} */
      export default { out: 'src/generated.js', contracts: [], plugins: [] }
      "
    `)
    expect(mockedConsole.formatted.replaceAll(temp, 'path/to/project'))
      .toMatchInlineSnapshot(`
        "⠏ Creating config
        ✔ Creating config
        Config created at wagmi.config.js"
      `)
  })

  describe('options', () => {
    it('config', async () => {
      const configFile = await init({
        config: 'foo.config.ts',
      })

      expect(fse.existsSync(configFile)).toBeTruthy()
      expect(await fse.readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
        "// @ts-check

        /** @type {import('@wagmi/cli').Config} */
        export default { out: 'src/generated.js', contracts: [], plugins: [] }
        "
      `)
      expect(mockedConsole.formatted.replaceAll(temp, 'path/to/project'))
        .toMatchInlineSnapshot(`
        "⠏ Creating config
        ✔ Creating config
        Config created at foo.config.ts"
      `)
    })

    it('content', async () => {
      const { projectDir } = await createFixture({
        dir: temp,
        files: {
          'tsconfig.json': '{}',
        },
      })

      const configFile = await init({
        content: {
          ...defaultConfig,
          out: 'foo/bar/baz.ts',
        },
      })

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
      expect(mockedConsole.formatted.replaceAll(projectDir, 'path/to/project'))
        .toMatchInlineSnapshot(`
        "⠏ Creating config
        ✔ Creating config
        Config created at wagmi.config.ts"
      `)
    })

    it('root', async () => {
      fse.mkdir(resolve(temp, 'foo'))
      const configFile = await init({
        root: 'foo/',
      })

      expect(fse.existsSync(configFile)).toBeTruthy()
      expect(await fse.readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
        "// @ts-check

        /** @type {import('@wagmi/cli').Config} */
        export default { out: 'src/generated.js', contracts: [], plugins: [] }
        "
      `)
      expect(mockedConsole.formatted.replaceAll(temp, 'path/to/project'))
        .toMatchInlineSnapshot(`
          "⠏ Creating config
          ✔ Creating config
          Config created at foo/wagmi.config.js"
        `)
    })
  })

  describe('behavior', () => {
    it('creates config file in TypeScript format', async () => {
      const { projectDir } = await createFixture({
        dir: temp,
        files: {
          'tsconfig.json': '{}',
        },
      })

      const configFile = await init()

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
      expect(mockedConsole.formatted.replaceAll(projectDir, 'path/to/project'))
        .toMatchInlineSnapshot(`
        "⠏ Creating config
        ✔ Creating config
        Config created at wagmi.config.ts"
      `)
    })

    it('displays config file location when config exists', async () => {
      await createFixture({
        dir: temp,
        files: {
          'wagmi.config.ts': '',
        },
      })

      const configFile = await init()

      expect(
        mockedConsole.formatted.replaceAll(
          configFile,
          'path/to/project/wagmi.config.ts',
        ),
      ).toMatchInlineSnapshot('"Config already exists at wagmi.config.ts"')
    })
  })
})

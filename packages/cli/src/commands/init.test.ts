import { default as fse } from 'fs-extra'
import { resolve } from 'pathe'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createFixture, watchConsole } from '../../test'
import { defaultConfig } from '../config'

import { init } from './init'

describe('init', () => {
  let console: ReturnType<typeof watchConsole>
  beforeEach(() => {
    console = watchConsole()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates config file', async () => {
    const { dir } = await createFixture()
    const spy = vi.spyOn(process, 'cwd')
    spy.mockImplementation(() => dir)

    const configFile = await init()

    expect(fse.existsSync(configFile)).toBeTruthy()
    expect(await fse.readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
      "// @ts-check

      /** @type {import('@wagmi/cli').Config} */
      export default { out: 'src/generated.js', contracts: [], plugins: [] }
      "
    `)
    expect(console.formatted.replaceAll(dir, 'path/to/project'))
      .toMatchInlineSnapshot(`
        "- Creating config
        ✔ Creating config
        Config created at wagmi.config.js"
      `)
  })

  describe('options', () => {
    it('config', async () => {
      const { dir } = await createFixture()
      const spy = vi.spyOn(process, 'cwd')
      spy.mockImplementation(() => dir)

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
      expect(console.formatted.replaceAll(dir, 'path/to/project'))
        .toMatchInlineSnapshot(`
          "- Creating config
          ✔ Creating config
          Config created at foo.config.ts"
        `)
    })

    it('content', async () => {
      const { dir } = await createFixture({
        files: {
          'tsconfig.json': '{}',
        },
      })
      const spy = vi.spyOn(process, 'cwd')
      spy.mockImplementation(() => dir)

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
      expect(console.formatted.replaceAll(dir, 'path/to/project'))
        .toMatchInlineSnapshot(`
          "- Creating config
          ✔ Creating config
          Config created at wagmi.config.ts"
        `)
    })

    it('root', async () => {
      const { dir } = await createFixture()
      const spy = vi.spyOn(process, 'cwd')
      spy.mockImplementation(() => dir)
      fse.mkdir(resolve(dir, 'foo'))

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
      expect(console.formatted.replaceAll(dir, 'path/to/project'))
        .toMatchInlineSnapshot(`
          "- Creating config
          ✔ Creating config
          Config created at foo/wagmi.config.js"
        `)
    })
  })

  describe('behavior', () => {
    it('creates config file in TypeScript format', async () => {
      const { dir } = await createFixture({
        files: {
          'tsconfig.json': '{}',
        },
      })
      const spy = vi.spyOn(process, 'cwd')
      spy.mockImplementation(() => dir)

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
      expect(console.formatted.replaceAll(dir, 'path/to/project'))
        .toMatchInlineSnapshot(`
          "- Creating config
          ✔ Creating config
          Config created at wagmi.config.ts"
        `)
    })

    it('displays config file location when config exists', async () => {
      const { dir } = await createFixture({
        files: {
          'wagmi.config.ts': '',
        },
      })
      const spy = vi.spyOn(process, 'cwd')
      spy.mockImplementation(() => dir)

      const configFile = await init()

      expect(
        console.formatted.replaceAll(
          configFile,
          'path/to/project/wagmi.config.ts',
        ),
      ).toMatchInlineSnapshot('"Config already exists at wagmi.config.ts"')
    })
  })
})

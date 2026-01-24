import { existsSync } from 'node:fs'
import { mkdir, readFile } from 'node:fs/promises'
import { resolve } from 'pathe'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import { createFixture, watchConsole } from '../../test/utils.js'
import { defaultConfig } from '../config.js'
import { init } from './init.js'

let console: ReturnType<typeof watchConsole>
beforeEach(() => {
  console = watchConsole()
})

afterEach(() => {
  vi.restoreAllMocks()
})

test('creates config file', async () => {
  const { dir } = await createFixture()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  const configFile = await init()

  expect(existsSync(configFile)).toBeTruthy()
  expect(await readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
      "// @ts-check

      /** @type {import('@wagmi/cli').Config} */
      export default {
        out: 'src/generated.js',
        contracts: [],
        plugins: [],
      }
      "
    `)
  expect(
    console.formatted.replaceAll(dir, 'path/to/project'),
  ).toMatchInlineSnapshot(`
    "- Creating config
    √ Creating config
    Config created at wagmi.config.js"
  `)
})

test('parameters: config', async () => {
  const { dir } = await createFixture()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  const configFile = await init({
    config: 'foo.config.ts',
  })

  expect(existsSync(configFile)).toBeTruthy()
  expect(await readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
        "// @ts-check

        /** @type {import('@wagmi/cli').Config} */
        export default {
          out: 'src/generated.js',
          contracts: [],
          plugins: [],
        }
        "
      `)
  expect(
    console.formatted.replaceAll(dir, 'path/to/project'),
  ).toMatchInlineSnapshot(`
    "- Creating config
    √ Creating config
    Config created at foo.config.ts"
  `)
})

test('parameters: content', async () => {
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

  expect(existsSync(configFile)).toBeTruthy()
  expect(await readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
      "import { defineConfig } from '@wagmi/cli'

      export default defineConfig({
        out: 'foo/bar/baz.ts',
        contracts: [],
        plugins: [],
      })
      "
    `)
  expect(
    console.formatted.replaceAll(dir, 'path/to/project'),
  ).toMatchInlineSnapshot(`
    "- Creating config
    √ Creating config
    Config created at wagmi.config.ts"
  `)
})

test('parameters: root', async () => {
  const { dir } = await createFixture()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)
  mkdir(resolve(dir, 'foo'))

  const configFile = await init({
    root: 'foo/',
  })

  expect(existsSync(configFile)).toBeTruthy()
  expect(await readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
        "// @ts-check

        /** @type {import('@wagmi/cli').Config} */
        export default {
          out: 'src/generated.js',
          contracts: [],
          plugins: [],
        }
        "
      `)
  expect(
    console.formatted.replaceAll(dir, 'path/to/project'),
  ).toMatchInlineSnapshot(`
    "- Creating config
    √ Creating config
    Config created at foo/wagmi.config.js"
  `)
})

test('behavior: creates config file in TypeScript format', async () => {
  const { dir } = await createFixture({
    files: {
      'tsconfig.json': '{}',
    },
  })
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  const configFile = await init()

  expect(existsSync(configFile)).toBeTruthy()
  expect(await readFile(configFile, 'utf-8')).toMatchInlineSnapshot(`
      "import { defineConfig } from '@wagmi/cli'

      export default defineConfig({
        out: 'src/generated.ts',
        contracts: [],
        plugins: [],
      })
      "
    `)
  expect(
    console.formatted.replaceAll(dir, 'path/to/project'),
  ).toMatchInlineSnapshot(`
    "- Creating config
    √ Creating config
    Config created at wagmi.config.ts"
  `)
})

test('behavior: displays config file location when config exists', async () => {
  const { dir } = await createFixture({
    files: {
      'wagmi.config.ts': '',
    },
  })
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => dir)

  const configFile = await init()

  expect(
    console.formatted.replaceAll(configFile, 'path/to/project/wagmi.config.ts'),
  ).toMatchInlineSnapshot('"Config already exists at wagmi.config.ts"')
})

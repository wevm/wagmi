import { join } from 'node:path'
import type { ExecaSyncReturnValue, SyncOptions } from 'execa'
import { execaCommandSync } from 'execa'
import fs from 'fs-extra'
import { afterEach, beforeAll, expect, test } from 'vitest'

import { version } from './version.js'

const projectName = 'test-app'
const genPath = join(__dirname, projectName)

const run = (
  args: string[],
  options: SyncOptions = {},
): ExecaSyncReturnValue => {
  return execaCommandSync(
    `bun packages/create-wagmi/src/cli.ts ${args.join(' ')}`,
    options,
  )
}

beforeAll(() => fs.remove(genPath))
afterEach(() => fs.remove(genPath))

test('help', () => {
  const { stdout } = run(['--help'])
  expect(stdout.replace(version, 'x.y.z')).toMatchInlineSnapshot(`
    "create-wagmi/x.y.z

    Usage:
      $ create-wagmi <project-directory> [options]

    Options:
      -t, --template [name]  Template to bootstrap with. Available: vite-react, next, vite-vanilla 
      --npm                  Use npm as your package manager 
      --pnpm                 Use pnpm as your package manager 
      --yarn                 Use yarn as your package manager 
      -h, --help             Display this message 
      -v, --version          Display version number "
  `)
})

test('version', () => {
  const { stdout } = run(['--version'])
  expect(stdout).toContain(`create-wagmi/${version} `)
})

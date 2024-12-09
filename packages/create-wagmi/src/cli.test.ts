import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { join } from 'node:path'
import type { ExecaSyncReturnValue, SyncOptions } from 'execa'
import { execaCommandSync } from 'execa'
import pc from 'picocolors'
import { afterEach, beforeAll, expect, test } from 'vitest'

import { version } from './version.js'

const cliPath = join(__dirname, '../dist/esm/cli.js')

const projectName = 'test-app'
const genPath = join(__dirname, projectName)

function run(args: string[], options: SyncOptions = {}): ExecaSyncReturnValue {
  return execaCommandSync(`node ${cliPath} ${args.join(' ')}`, options)
}

function createNonEmptyDir() {
  mkdirSync(genPath, { recursive: true })
  const file = join(genPath, 'foo')
  writeFileSync(file, 'bar')
}

beforeAll(async () => {
  execaCommandSync('pnpm --filter create-wagmi build')
  await rm(genPath, { recursive: true, force: true })
})
afterEach(async () => {
  await rm(genPath, { recursive: true, force: true })
})

test('prompts for the project name if none supplied', () => {
  const { stdout } = run([])
  expect(stdout).toContain('Project name:')
})

test('prompts for the framework if none supplied when target dir is current directory', () => {
  mkdirSync(genPath)
  const { stdout } = run(['.'], { cwd: genPath })
  expect(stdout).toContain('Select a framework:')
})

test('prompts for the framework if none supplied', () => {
  const { stdout } = run([projectName])
  expect(stdout).toContain('Select a framework:')
})

test('prompts for the framework on not supplying a value for --template', () => {
  const { stdout } = run([projectName, '--template'])
  expect(stdout).toContain('Select a framework:')
})

test('prompts for the framework on supplying an invalid template', () => {
  const { stdout } = run([projectName, '--template', 'unknown'])
  expect(stdout).toContain(
    `"unknown" isn't a valid template. Please choose from below:`,
  )
})

test('asks to overwrite non-empty target directory', () => {
  createNonEmptyDir()
  const { stdout } = run([projectName], { cwd: __dirname })
  expect(stdout).toContain(`Target directory "${projectName}" is not empty.`)
})

test('asks to overwrite non-empty current directory', () => {
  createNonEmptyDir()
  const { stdout } = run(['.'], { cwd: genPath })
  expect(stdout).toContain('Current directory is not empty.')
})

const templateFiles = readdirSync(
  join(cliPath, '../../../templates/vite-react'),
)
  .map((filePath) => {
    if (filePath === '_gitignore') return '.gitignore'
    if (filePath === '_env.local') return '.env.local'
    if (filePath === '_npmrc') return '.npmrc'
    return filePath
  })
  .sort()

test('successfully scaffolds a project based on vite-react starter template', () => {
  mkdirSync(genPath, { recursive: true })
  const { stdout } = run([projectName, '--template', 'vite-react'], {
    cwd: __dirname,
  })
  const generatedFiles = readdirSync(genPath).sort()

  expect(stdout).toContain(`Scaffolding project in ${genPath}`)
  expect(templateFiles).toEqual(generatedFiles)
})

test('works with the -t alias', () => {
  mkdirSync(genPath, { recursive: true })
  const { stdout } = run([projectName, '-t', 'vite-react'], {
    cwd: __dirname,
  })
  const generatedFiles = readdirSync(genPath).sort()

  expect(stdout).toContain(`Scaffolding project in ${genPath}`)
  expect(templateFiles).toEqual(generatedFiles)
})

test('uses different package manager', () => {
  mkdirSync(genPath, { recursive: true })
  const { stdout } = run([projectName, '--bun', '-t', 'vite-react'], {
    cwd: __dirname,
  })

  expect(stdout).toContain('bun install')
})

test('shows help', () => {
  const { stdout } = run(['--help'])
  expect(
    stdout
      .replace(version, 'x.y.z')
      .replace(pc.green('<project-directory>'), '<project-directory>'),
  ).toMatchInlineSnapshot(`
    "create-wagmi/x.y.z

    Usage:
      $ create-wagmi <project-directory> [options]

    Options:
      -t, --template [name]  Template to bootstrap with. Available: vite-react, next, vite-vue, nuxt, vite-vanilla 
      --bun                  Use bun as your package manager 
      --npm                  Use npm as your package manager 
      --pnpm                 Use pnpm as your package manager 
      --yarn                 Use yarn as your package manager 
      -h, --help             Display this message 
      -v, --version          Display version number "
  `)
})

test('shows version', () => {
  const { stdout } = run(['--version'])
  expect(stdout).toContain(`create-wagmi/${version} `)
})

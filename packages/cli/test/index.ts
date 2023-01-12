import fixtures from 'fixturez'
import { default as fse } from 'fs-extra'
import * as path from 'pathe'
import { vi } from 'vitest'

const f = fixtures(__dirname)

type Json =
  | string
  | number
  | boolean
  | null
  | { [property: string]: Json }
  | Json[]

export async function createFixture<
  TFiles extends { [filename: string]: string | Json },
>(config: { files: TFiles; dir?: string; includeNodeModules?: boolean }) {
  const projectDir = config.dir ?? f.temp()
  await fse.ensureDir(projectDir)

  // Create test files
  const filePaths: { [_ in keyof TFiles]: string } = {} as any
  await Promise.all(
    (Object.keys(config.files ?? {}) as (keyof TFiles)[]).map(
      async (filename) => {
        const filePath = path.join(projectDir, filename.toString())
        await fse.ensureDir(path.dirname(filePath))
        const file = config.files![filename]
        await fse.writeFile(
          filePath,
          typeof file === 'string' ? file : JSON.stringify(file, null, 2),
        )
        filePaths[filename] = filePath
      },
    ),
  )

  return {
    projectDir,
    filePaths,
  }
}

export function mockCwd(config: { dir?: string } = {}) {
  const mocked = config.dir ?? f.temp()
  const spy = vi.spyOn(process, 'cwd')
  spy.mockImplementation(() => mocked)
  return mocked
}

export function mockConsole() {
  type Console = 'info' | 'log' | 'warn' | 'error'
  const output: { [_ in Console | 'all']: string[] } = {
    info: [],
    log: [],
    warn: [],
    error: [],
    all: [],
  }
  function handleOutput(method: Console) {
    return (message: string) => {
      output[method].push(message)
      output.all.push(message)
    }
  }
  const info = vi
    .spyOn(console, 'info')
    .mockImplementation(handleOutput('info'))

  const log = vi.spyOn(console, 'log').mockImplementation(handleOutput('log'))

  const warn = vi
    .spyOn(console, 'warn')
    .mockImplementation(handleOutput('warn'))

  const error = vi
    .spyOn(console, 'error')
    .mockImplementation(handleOutput('error'))

  return {
    info,
    log,
    warn,
    error,
    output,
    get formatted() {
      return output.all.join('\n')
    },
  }
}

export { wagmiAbi } from './constants'

import fixtures from 'fixturez'
import { default as fse } from 'fs-extra'
import * as path from 'pathe'
import { vi } from 'vitest'

import * as logger from '../src/logger'

const f = fixtures(__dirname)

export async function createFixture<
  TFiles extends { [filename: string]: string },
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
        await fse.writeFile(filePath, file)
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

export function mockLogger() {
  const mocked = vi.fn()

  const success = vi.spyOn(logger, 'success')
  success.mockImplementation(mocked)

  const info = vi.spyOn(logger, 'info')
  info.mockImplementation(mocked)

  const log = vi.spyOn(logger, 'log')
  log.mockImplementation(mocked)

  const warn = vi.spyOn(logger, 'warn')
  warn.mockImplementation(mocked)

  const error = vi.spyOn(logger, 'error')
  error.mockImplementation(mocked)

  return {
    log,
    info,
    success,
    warn,
    error,
  }
}

export { wagmiAbi } from './constants'

import { findUp } from 'find-up'
import { default as fse } from 'fs-extra'
import { resolve } from 'pathe'

// Do not reorder
// In order of preference files are checked
const configFiles = [
  'wagmi.config.ts',
  'wagmi.config.js',
  'wagmi.config.mjs',
  'wagmi.config.mts',
]

type FindConfig = {
  /** Config file name */
  config?: string
  /** Config file directory */
  root?: string
}

/**
 * Resolves path to wagmi CLI config file.
 */
export async function findConfig({ config, root }: FindConfig = {}) {
  const rootDir = resolve(root || process.cwd())
  if (config) {
    const path = resolve(rootDir, config)
    if (fse.pathExistsSync(path)) return path
    return
  }
  return await findUp(configFiles, { cwd: rootDir })
}

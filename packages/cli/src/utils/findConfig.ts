import { existsSync } from 'node:fs'
import escalade from 'escalade'
import { resolve } from 'pathe'

// Do not reorder
// In order of preference files are checked
const configFiles = [
  'wagmi.config.ts',
  'wagmi.config.js',
  'wagmi.config.mjs',
  'wagmi.config.mts',
]

type FindConfigParameters = {
  /** Config file name */
  config?: string | undefined
  /** Config file directory */
  root?: string | undefined
}

/**
 * Resolves path to wagmi CLI config file.
 */
export async function findConfig(parameters: FindConfigParameters = {}) {
  const { config, root } = parameters
  const rootDir = resolve(root || process.cwd())
  if (config) {
    const path = resolve(rootDir, config)
    if (existsSync(path)) return path
    return
  }
  const configPath = await escalade(rootDir, (_dir, names) => {
    for (const name of names) {
      if (configFiles.includes(name)) return name
    }
    return undefined
  })
  return configPath
}

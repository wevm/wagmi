import { findUp } from 'find-up'
import { resolve } from 'pathe'

const configFiles = [
  'wagmi.config.js',
  'wagmi.config.mjs',
  'wagmi.config.mts',
  'wagmi.config.ts',
]

type FindConfig = {
  config?: string
  root?: string
}

export async function findConfig({ config, root }: FindConfig = {}) {
  const rootDir = resolve(root || process.cwd())
  if (config) return resolve(rootDir, config)
  return await findUp(configFiles, { cwd: rootDir })
}

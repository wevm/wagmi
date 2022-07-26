import { findUp } from 'find-up'
import { resolve } from 'pathe'

import { CliOptions } from '../cli'
import { configFiles } from '../constants'

export async function findConfig(
  options: {
    config?: CliOptions['config']
    root?: CliOptions['root']
  } = {},
) {
  const root = resolve(options.root || process.cwd())
  const configPath = options.config
    ? resolve(root, options.config)
    : await findUp(configFiles, { cwd: root } as any)

  return configPath
}

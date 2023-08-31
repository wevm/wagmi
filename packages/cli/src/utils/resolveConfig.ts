import { bundleRequire } from 'bundle-require'

import type { Config } from '../config'
import type { MaybeArray } from '../types'

type ResolveConfig = {
  /** Path to config file */
  configPath: string
}

/**
 * Bundles and returns wagmi config object from path.
 */
export async function resolveConfig({
  configPath,
}: ResolveConfig): Promise<MaybeArray<Config>> {
  const res = await bundleRequire({
    filepath: configPath,
  })
  let config = res.mod.default
  if (config.default) config = config.default
  if (typeof config !== 'function') return config
  return await config()
}

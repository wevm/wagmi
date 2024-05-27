import type { Config } from '../createConfig.js'

// biome-ignore lint/complexity/noBannedTypes:
export type Register = {}
export type ResolvedRegister = {
  config: Register extends { config: infer config extends Config }
    ? config
    : Config
}

import { type Config } from '../createConfig.js'

export type Register = {}
export type ResolvedRegister = {
  config: Register extends { config: infer config extends Config }
    ? config
    : Config
}

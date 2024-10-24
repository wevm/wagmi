import type { Config } from '@wagmi/core'

export type RuneParameters<T> = T | (() => T)
export type RuneReturnType<T> = () => T

export type ConfigParameter<config extends Config = Config> = {
  config?: Config | config | undefined
}

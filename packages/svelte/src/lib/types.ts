import type { Config } from '@wagmi/core'

export type RuneReturnType<T> = () => T

export type ConfigParameter<config extends Config = Config> = {
  config?: Config | config | undefined
}

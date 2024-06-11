import type { Config } from '../createConfig.js'
import { deepEqual } from '../utils/deepEqual.js'
import { type GetAccountReturnType, getAccount } from './getAccount.js'

export type WatchAccountParameters<config extends Config = Config> = {
  onChange(
    account: GetAccountReturnType<config>,
    prevAccount: GetAccountReturnType<config>,
  ): void
}

export type WatchAccountReturnType = () => void

/** https://wagmi.sh/core/api/actions/watchAccount */
export function watchAccount<config extends Config>(
  config: config,
  parameters: WatchAccountParameters<config>,
): WatchAccountReturnType {
  const { onChange } = parameters

  return config.subscribe(() => getAccount(config), onChange, {
    equalityFn(a, b) {
      const { connector: aConnector, ...aRest } = a
      const { connector: bConnector, ...bRest } = b
      return (
        deepEqual(aRest, bRest) &&
        // check connector separately
        aConnector?.id === bConnector?.id &&
        aConnector?.uid === bConnector?.uid
      )
    },
  })
}

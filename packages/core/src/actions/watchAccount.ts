import { type Config } from '../createConfig.js'
import { deepEqual } from '../utils/deepEqual.js'
import { type GetAccountReturnType, getAccount } from './getAccount.js'

export type WatchAccountParameters = {
  onChange(data: GetAccountReturnType, prevData: GetAccountReturnType): void
}

export type WatchAccountReturnType = () => void

/** https://alpha.wagmi.sh/core/actions/watchAccount */
export function watchAccount(
  config: Config,
  parameters: WatchAccountParameters,
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

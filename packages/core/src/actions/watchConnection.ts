import type { Config } from '../createConfig.js'
import { deepEqual } from '../utils/deepEqual.js'
import { type GetConnectionReturnType, getConnection } from './getConnection.js'

export type WatchConnectionParameters<config extends Config = Config> = {
  onChange(
    connection: GetConnectionReturnType<config>,
    prevConnection: GetConnectionReturnType<config>,
  ): void
}

export type WatchConnectionReturnType = () => void

/** https://wagmi.sh/core/api/actions/watchConnection */
export function watchConnection<config extends Config>(
  config: config,
  parameters: WatchConnectionParameters<config>,
): WatchConnectionReturnType {
  const { onChange } = parameters

  return config.subscribe(() => getConnection(config), onChange, {
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

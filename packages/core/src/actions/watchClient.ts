import type { Config } from '../createConfig.js'
import { type GetClientReturnType, getClient } from './getClient.js'

export type WatchClientParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = {
  onChange(
    publicClient: GetClientReturnType<config, chainId>,
    prevClient: GetClientReturnType<config, chainId>,
  ): void
}

export type WatchClientReturnType = () => void

/** https://wagmi.sh/core/api/actions/watchClient */
export function watchClient<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: WatchClientParameters<config, chainId>,
): WatchClientReturnType {
  const { onChange } = parameters
  return config.subscribe(
    () => getClient(config) as GetClientReturnType<config, chainId>,
    onChange,
    {
      equalityFn(a, b) {
        return a?.uid === b?.uid
      },
    },
  )
}

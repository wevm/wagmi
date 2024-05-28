import type { Config } from '../createConfig.js'
import {
  type GetPublicClientReturnType,
  getPublicClient,
} from './getPublicClient.js'

export type WatchPublicClientParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = {
  onChange(
    publicClient: GetPublicClientReturnType<config, chainId>,
    prevPublicClient: GetPublicClientReturnType<config, chainId>,
  ): void
}

export type WatchPublicClientReturnType = () => void

/** https://wagmi.sh/core/api/actions/watchPublicClient */
export function watchPublicClient<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: WatchPublicClientParameters<config, chainId>,
): WatchPublicClientReturnType {
  const { onChange } = parameters
  return config.subscribe(
    () => getPublicClient(config) as GetPublicClientReturnType<config, chainId>,
    onChange,
    {
      equalityFn(a, b) {
        return a?.uid === b?.uid
      },
    },
  )
}

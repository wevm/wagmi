import { Actions } from 'viem/tempo'
import type { Config } from '../../createConfig.js'
import type { ChainIdParameter } from '../../types/properties.js'

export function getNonce<config extends Config>(
  config: config,
  parameters: getNonce.Parameters<config>,
): Promise<getNonce.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.nonce.getNonce(client, rest)
}

export namespace getNonce {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.nonce.getNonce.Parameters

  export type ReturnValue = Actions.nonce.getNonce.ReturnValue
}

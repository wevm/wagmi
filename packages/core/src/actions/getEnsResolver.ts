import {
  type GetEnsResolverParameters as viem_GetEnsResolverParameters,
  type GetEnsResolverReturnType as viem_GetEnsResolverReturnType,
  getEnsResolver as viem_getEnsResolver,
} from 'viem/actions'

import { type Config } from '../config.js'
import { type Evaluate } from '../internal.js'
import type { ChainId } from '../types/properties.js'

export type GetEnsResolverParameters<config extends Config = Config> = Evaluate<
  viem_GetEnsResolverParameters & ChainId<config>
>

export type GetEnsResolverReturnType = viem_GetEnsResolverReturnType

export type GetEnsResolverError = Error

/** https://wagmi.sh/core/actions/getEnsResolver */
export function getEnsResolver<config extends Config>(
  config: config,
  parameters: GetEnsResolverParameters<config>,
): Promise<GetEnsResolverReturnType> {
  const { chainId } = parameters
  const client = config.getClient({ chainId })
  return viem_getEnsResolver(client, parameters)
}

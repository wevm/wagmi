import {
  type GetEnsAddressParameters as viem_GetEnsAddressParameters,
  type GetEnsAddressReturnType as viem_GetEnsAddressReturnType,
  getEnsAddress as viem_getEnsAddress,
} from 'viem/actions'

import { type Config } from '../config.js'
import { type Evaluate } from '../internal.js'
import type { ChainId } from '../types/properties.js'

export type GetEnsAddressParameters<config extends Config = Config> = Evaluate<
  viem_GetEnsAddressParameters & ChainId<config>
>

export type GetEnsAddressReturnType = viem_GetEnsAddressReturnType

export type GetEnsAddressError = Error

/** https://wagmi.sh/core/actions/getEnsAddress */
export function getEnsAddress<config extends Config>(
  config: config,
  parameters: GetEnsAddressParameters<config>,
): Promise<GetEnsAddressReturnType> {
  const { chainId } = parameters
  const client = config.getClient({ chainId })
  return viem_getEnsAddress(client, parameters)
}

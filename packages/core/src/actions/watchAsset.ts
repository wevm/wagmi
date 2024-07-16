import {
  type WatchAssetErrorType as viem_WatchAssetErrorType,
  type WatchAssetParameters as viem_WatchAssetParameters,
  type WatchAssetReturnType as viem_WatchAssetReturnType,
  watchAsset as viem_watchAsset,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { ConnectorParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type WatchAssetParameters = Compute<
  viem_WatchAssetParameters & ConnectorParameter
>

export type WatchAssetReturnType = viem_WatchAssetReturnType

export type WatchAssetErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_WatchAssetErrorType

/** https://wagmi.sh/core/api/actions/watchAsset */
export async function watchAsset(
  config: Config,
  parameters: WatchAssetParameters,
): Promise<WatchAssetReturnType> {
  const { connector, ...rest } = parameters

  const client = await getConnectorClient(config, { connector })

  const action = getAction(client, viem_watchAsset, 'watchAsset')
  return action(rest as viem_WatchAssetParameters)
}

import {
  type WatchAssetErrorType as viem_WatchAssetErrorType,
  type WatchAssetParameters as viem_WatchAssetParameters,
  type WatchAssetReturnType as viem_WatchAssetReturnType,
  watchAsset as viem_watchAsset,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { ConnectorParameter } from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type WatchAssetParameters = Evaluate<
  viem_WatchAssetParameters & ConnectorParameter
>

export type WatchAssetReturnType = viem_WatchAssetReturnType

export type WatchAssetErrorType =
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

  const client = config.getClient()

  const action = getAction(client, viem_watchAsset, 'watchAsset')
  return action(rest as viem_WatchAssetParameters)
}

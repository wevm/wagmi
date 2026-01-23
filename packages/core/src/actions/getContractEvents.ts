import type { Abi, BlockNumber, BlockTag, ContractEventName } from 'viem'
import {
  type GetContractEventsErrorType as viem_GetContractEventsErrorType,
  type GetContractEventsParameters as viem_GetContractEventsParameters,
  type GetContractEventsReturnType as viem_GetContractEventsReturnType,
  getContractEvents as viem_getContractEvents,
} from 'viem/actions'
import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type GetContractEventsParameters<
  abi extends Abi | readonly unknown[] = Abi,
  eventName extends ContractEventName<abi> | undefined =
    | ContractEventName<abi>
    | undefined,
  strict extends boolean | undefined = undefined,
  fromBlock extends BlockNumber | BlockTag | undefined = undefined,
  toBlock extends BlockNumber | BlockTag | undefined = undefined,
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<
  viem_GetContractEventsParameters<abi, eventName, strict, fromBlock, toBlock> &
    ChainIdParameter<config, chainId>
>

export type GetContractEventsReturnType<
  abi extends Abi | readonly unknown[] = Abi,
  eventName extends ContractEventName<abi> | undefined =
    | ContractEventName<abi>
    | undefined,
  strict extends boolean | undefined = undefined,
  fromBlock extends BlockNumber | BlockTag | undefined = undefined,
  toBlock extends BlockNumber | BlockTag | undefined = undefined,
> = viem_GetContractEventsReturnType<abi, eventName, strict, fromBlock, toBlock>

export type GetContractEventsErrorType = viem_GetContractEventsErrorType

/** https://wagmi.sh/core/actions/getContractEvents */
export async function getContractEvents<
  config extends Config,
  chainId extends config['chains'][number]['id'],
  const abi extends Abi | readonly unknown[],
  eventName extends ContractEventName<abi> | undefined,
  strict extends boolean | undefined = undefined,
  fromBlock extends BlockNumber | BlockTag | undefined = undefined,
  toBlock extends BlockNumber | BlockTag | undefined = undefined,
>(
  config: config,
  parameters: GetContractEventsParameters<
    abi,
    eventName,
    strict,
    fromBlock,
    toBlock,
    config,
    chainId
  >,
): Promise<
  GetContractEventsReturnType<abi, eventName, strict, fromBlock, toBlock>
> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  const action = getAction(client, viem_getContractEvents, 'getContractEvents')
  return action(rest)
}

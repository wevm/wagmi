import type {
  Abi,
  Account,
  Chain,
  Client,
  ContractFunctionArgs,
  ContractFunctionName,
} from 'viem'
import {
  type WriteContractSyncErrorType as viem_WriteContractSyncErrorType,
  type WriteContractSyncParameters as viem_WriteContractSyncParameters,
  type WriteContractSyncReturnType as viem_WriteContractSyncReturnType,
  writeContractSync as viem_writeContractSync,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Compute, UnionCompute } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type WriteContractSyncParameters<
  abi extends Abi | readonly unknown[] = Abi,
  functionName extends ContractFunctionName<
    abi,
    'nonpayable' | 'payable'
  > = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  > = ContractFunctionArgs<abi, 'nonpayable' | 'payable', functionName>,
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = UnionCompute<
  {
    [key in keyof chains]: viem_WriteContractSyncParameters<
      abi,
      functionName,
      args,
      chains[key],
      Account,
      chains[key]
    >
  }[number] &
    Compute<ChainIdParameter<config, chainId>> &
    ConnectorParameter
>

export type WriteContractSyncReturnType = viem_WriteContractSyncReturnType

export type WriteContractSyncErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_WriteContractSyncErrorType

/** https://wagmi.sh/core/api/actions/writeContractSync */
export async function writeContractSync<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: WriteContractSyncParameters<
    abi,
    functionName,
    args,
    config,
    chainId
  >,
): Promise<WriteContractSyncReturnType> {
  const { account, chainId, connector, ...request } = parameters

  let client: Client
  if (typeof account === 'object' && account?.type === 'local')
    client = config.getClient({ chainId })
  else
    client = await getConnectorClient(config, {
      account: account ?? undefined,
      assertChainId: false,
      chainId,
      connector,
    })

  const chain = (() => {
    if (!chainId || client.chain?.id === chainId) return client.chain
    return { id: chainId }
  })()

  const action = getAction(client, viem_writeContractSync, 'writeContractSync')
  const receipt = await action({
    ...(request as any),
    ...(account ? { account } : {}),
    assertChainId: !!chainId,
    chain,
  })

  return receipt
}

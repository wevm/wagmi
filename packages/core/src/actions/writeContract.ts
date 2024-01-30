import type {
  Abi,
  Account,
  Chain,
  ContractFunctionArgs,
  ContractFunctionName,
} from 'viem'
import {
  type WriteContractErrorType as viem_WriteContractErrorType,
  type WriteContractParameters as viem_WriteContractParameters,
  type WriteContractReturnType as viem_WriteContractReturnType,
  writeContract as viem_writeContract,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import { type BaseErrorType, type ErrorType } from '../errors/base.js'
import { type SelectChains } from '../types/chain.js'
import {
  type ChainIdParameter,
  type ConnectorParameter,
} from '../types/properties.js'
import type { Evaluate, UnionEvaluate, UnionOmit } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'
import {
  type SimulateContractErrorType,
  simulateContract,
} from './simulateContract.js'

export type WriteContractParameters<
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
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  allFunctionNames = ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = UnionEvaluate<
  {
    [key in keyof chains]: UnionOmit<
      viem_WriteContractParameters<
        abi,
        functionName,
        args,
        chains[key],
        Account,
        chains[key],
        allFunctionNames
      >,
      'chain'
    >
  }[number] &
    Evaluate<ChainIdParameter<config, chainId>> &
    ConnectorParameter & { __mode?: 'prepared' }
>

export type WriteContractReturnType = viem_WriteContractReturnType

export type WriteContractErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // simulateContract()
  | SimulateContractErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_WriteContractErrorType

/** https://wagmi.sh/core/api/actions/writeContract */
export async function writeContract<
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
  parameters: WriteContractParameters<abi, functionName, args, config, chainId>,
): Promise<WriteContractReturnType> {
  const { account, chainId, connector, __mode, ...rest } = parameters

  let client
  if (typeof account === 'object' && account.type === 'local')
    client = config.getClient({ chainId })
  else
    client = await getConnectorClient(config, { account, chainId, connector })

  let request
  if (__mode === 'prepared') request = rest
  else {
    const { request: simulateRequest } = await simulateContract(config, {
      ...rest,
      account,
    } as any)
    request = simulateRequest
  }

  const action = getAction(client, viem_writeContract, 'writeContract')
  const hash = await action({
    ...(request as any),
    ...(account ? { account } : {}),
    chain: chainId ? { id: chainId } : null,
  })

  return hash
}

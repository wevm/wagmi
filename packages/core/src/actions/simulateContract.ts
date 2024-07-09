import type {
  Abi,
  Account,
  Address,
  Chain,
  ContractFunctionArgs,
  ContractFunctionName,
} from 'viem'
import {
  type SimulateContractErrorType as viem_SimulateContractErrorType,
  type SimulateContractParameters as viem_SimulateContractParameters,
  type SimulateContractReturnType as viem_SimulateContractReturnType,
  simulateContract as viem_simulateContract,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type {
  Compute,
  PartialBy,
  UnionCompute,
  UnionStrictOmit,
} from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type SimulateContractParameters<
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
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: UnionCompute<
    UnionStrictOmit<
      viem_SimulateContractParameters<
        abi,
        functionName,
        args,
        chains[key],
        chains[key],
        Account | Address
      >,
      'chain'
    >
  > &
    ChainIdParameter<config, chainId> &
    ConnectorParameter
}[number]

export type SimulateContractReturnType<
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
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: viem_SimulateContractReturnType<
    abi,
    functionName,
    args,
    chains[key],
    Account,
    chains[key]
  > & {
    chainId: chains[key]['id']
    request: Compute<
      PartialBy<
        { __mode: 'prepared'; chainId: chainId; chain: chains[key] },
        chainId extends config['chains'][number]['id'] ? never : 'chainId'
      >
    >
  }
}[number]

export type SimulateContractErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SimulateContractErrorType

/** https://wagmi.sh/core/api/actions/simulateContract */
export async function simulateContract<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  functionName extends ContractFunctionName<abi, 'nonpayable' | 'payable'>,
  args extends ContractFunctionArgs<
    abi,
    'nonpayable' | 'payable',
    functionName
  >,
  chainId extends config['chains'][number]['id'] | undefined = undefined,
>(
  config: config,
  parameters: SimulateContractParameters<
    abi,
    functionName,
    args,
    config,
    chainId
  >,
): Promise<
  SimulateContractReturnType<abi, functionName, args, config, chainId>
> {
  const { abi, chainId, connector, ...rest } =
    parameters as SimulateContractParameters

  let account: Address | Account
  if (parameters.account) account = parameters.account
  else {
    const connectorClient = await getConnectorClient(config, {
      chainId,
      connector,
    })
    account = connectorClient.account
  }

  const client = config.getClient({ chainId })
  const action = getAction(client, viem_simulateContract, 'simulateContract')
  const { result, request } = await action({ ...rest, abi, account })

  return {
    chainId: client.chain.id,
    result,
    request: { __mode: 'prepared', ...request, chainId },
  } as unknown as SimulateContractReturnType<
    abi,
    functionName,
    args,
    config,
    chainId
  >
}

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

import { type Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { PartialBy, UnionEvaluate, UnionOmit } from '../types/utils.js'
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
  [key in keyof chains]: UnionEvaluate<
    UnionOmit<
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
    chains[key]
  > extends infer type extends viem_SimulateContractReturnType<
    abi,
    functionName,
    args
  >
    ? UnionEvaluate<
        UnionOmit<type, 'request'> & {
          request: UnionEvaluate<
            UnionOmit<type['request'], 'chain'> &
              PartialBy<
                { __mode: 'prepared'; chainId: chainId },
                chainId extends config['chains'][number]['id']
                  ? never
                  : 'chainId'
              >
          >
        }
      >
    : never
}[number]

export type SimulateContractErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_SimulateContractErrorType

/** https://alpha.wagmi.sh/core/api/actions/simulateContract */
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
  const { result, request } = await viem_simulateContract(client, {
    ...rest,
    abi,
    account,
  })

  return {
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

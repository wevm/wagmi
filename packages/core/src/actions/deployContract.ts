import type { Abi, Account, Chain, Client, ContractConstructorArgs } from 'viem'
import {
  type DeployContractErrorType as viem_DeployContractErrorType,
  type DeployContractParameters as viem_DeployContractParameters,
  type DeployContractReturnType as viem_DeployContractReturnType,
  deployContract as viem_deployContract,
} from 'viem/actions'
import type { Config } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import type { SelectChains } from '../types/chain.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../types/properties.js'
import type { Evaluate } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from './getConnectorClient.js'

export type DeployContractParameters<
  abi extends Abi | readonly unknown[] = Abi,
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  allArgs = ContractConstructorArgs<abi>,
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = {
  [key in keyof chains]: Evaluate<
    Omit<
      viem_DeployContractParameters<
        abi,
        chains[key],
        Account,
        chains[key],
        allArgs
      >,
      'chain'
    > &
      ChainIdParameter<config, chainId> &
      ConnectorParameter
  >
}[number]

export type DeployContractReturnType = viem_DeployContractReturnType

export type DeployContractErrorType =
  // getConnectorClient()
  | GetConnectorClientErrorType
  // base
  | BaseErrorType
  | ErrorType
  // viem
  | viem_DeployContractErrorType

/** https://wagmi.sh/core/api/actions/deployContract */
export async function deployContract<
  config extends Config,
  const abi extends Abi | readonly unknown[],
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: DeployContractParameters<abi, config, chainId>,
): Promise<DeployContractReturnType> {
  const { account, chainId, connector, ...rest } = parameters

  let client: Client
  if (typeof account === 'object' && account.type === 'local')
    client = config.getClient({ chainId })
  else
    client = await getConnectorClient(config, { account, chainId, connector })

  const action = getAction(client, viem_deployContract, 'deployContract')
  const hash = await action({
    ...(rest as any),
    ...(account ? { account } : {}),
    chain: chainId ? { id: chainId } : null,
  })

  return hash
}

import type { Chain } from 'viem'
import {
  type GetTransactionParameters as viem_GetTransactionParameters,
  type GetTransactionReturnType as viem_GetTransactionReturnType,
  getTransaction as viem_getTransaction,
} from 'viem/actions'

import { type Config } from '../config.js'
import type { ChainId } from '../types/properties.js'
import { type Evaluate } from '../types/utils.js'

export type GetTransactionParameters<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
> = Evaluate<viem_GetTransactionParameters & ChainId<config, chainId>>

export type GetTransactionReturnType<
  config extends Config = Config,
  chainId extends
    | config['chains'][number]['id']
    | undefined = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = chainId extends config['chains'][number]['id']
    ? [Extract<config['chains'][number], { id: chainId }>]
    : config['chains'],
> = Evaluate<
  {
    [key in keyof chains]: viem_GetTransactionReturnType<chains[key]>
  }[number]
>

export type GetTransactionError = Error

/** https://wagmi.sh/core/actions/getTransaction */
export function getTransaction<
  config extends Config,
  chainId extends config['chains'][number]['id'] | undefined,
>(
  config: config,
  parameters: GetTransactionParameters<config, chainId>,
): Promise<GetTransactionReturnType<config, chainId>> {
  const { chainId } = parameters
  const client = config.getClient({ chainId })
  return viem_getTransaction(client, parameters) as Promise<
    GetTransactionReturnType<config, chainId>
  >
}

import type {
  ContractFunctionConfig,
  MulticallParameters,
  MulticallReturnType,
} from 'viem'

import { ChainNotConfiguredError, ClientChainsNotFound } from '../../errors'
import { getPublicClient } from '../viem'

export type MulticallConfig<
  TContracts extends ContractFunctionConfig[] = ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
> = MulticallParameters<TContracts, TAllowFailure> & {
  /** Chain id to use for Public Client. */
  chainId?: number
}

export type MulticallResult<
  TContracts extends ContractFunctionConfig[] = ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
> = MulticallReturnType<TContracts, TAllowFailure>

export async function multicall<
  TContracts extends ContractFunctionConfig[],
  TAllowFailure extends boolean = true,
>({
  chainId,
  contracts,
  blockNumber,
  blockTag,
  ...args
}: MulticallConfig<TContracts, TAllowFailure>): Promise<
  MulticallResult<TContracts, TAllowFailure>
> {
  const publicClient = getPublicClient({ chainId })
  if (!publicClient.chains) throw new ClientChainsNotFound()

  if (chainId && publicClient.chain.id !== chainId)
    throw new ChainNotConfiguredError({ chainId })

  return publicClient.multicall({
    allowFailure: args.allowFailure ?? true,
    blockNumber,
    blockTag,
    contracts,
  } as MulticallParameters<TContracts, TAllowFailure>)
}

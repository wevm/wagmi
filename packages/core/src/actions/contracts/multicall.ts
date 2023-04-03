import type {
  ContractConfig,
  MulticallParameters,
  MulticallReturnType,
} from 'viem'

import { ProviderChainsNotFound } from '../../errors'
import { getProvider } from '../providers'

export type MulticallConfig<
  TContracts extends ContractConfig[] = ContractConfig[],
  TAllowFailure extends boolean = true,
> = MulticallParameters<TContracts, TAllowFailure> & {
  /** Chain id to use for provider */
  chainId?: number
}

export type MulticallResult<
  TContracts extends ContractConfig[] = ContractConfig[],
  TAllowFailure extends boolean = true,
> = MulticallReturnType<TContracts, TAllowFailure>

export async function multicall<
  TContracts extends ContractConfig[],
  TAllowFailure extends boolean,
>({
  chainId,
  contracts,
  blockNumber,
  blockTag,
  ...args
}: MulticallConfig<TContracts, TAllowFailure>): Promise<
  MulticallResult<TContracts, TAllowFailure>
> {
  const provider = getProvider({ chainId })
  if (!provider.chains) throw new ProviderChainsNotFound()

  return provider.multicall({
    allowFailure: args.allowFailure ?? true,
    blockNumber,
    blockTag,
    contracts,
  } as MulticallParameters<TContracts, TAllowFailure>)
}

import type { Abi } from 'abitype'
import type {
  Account,
  Chain,
  GetContractParameters,
  GetContractReturnType,
  PublicClient,
  Transport,
} from 'viem'
import { getContract as getContract_ } from 'viem'

import type { WalletClient } from '../../types'

import { getPublicClient } from '../viem'

export type GetContractArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TWalletClient extends WalletClient | unknown = unknown,
> = Omit<
  GetContractParameters<
    Transport,
    Chain,
    Account,
    TAbi,
    PublicClient,
    TWalletClient
  >,
  'publicClient' | 'walletClient'
> & {
  chainId?: number
  walletClient?: NonNullable<TWalletClient>
}

export type GetContractResult<
  TAbi extends Abi | readonly unknown[] = Abi,
  TWalletClient extends WalletClient | unknown = unknown,
> = GetContractReturnType<TAbi, PublicClient, TWalletClient>

export function getContract<
  TAbi extends Abi | readonly unknown[],
  TWalletClient extends WalletClient | unknown,
>({
  address,
  abi,
  chainId,
  walletClient,
}: GetContractArgs<TAbi, TWalletClient>): GetContractResult<
  TAbi,
  TWalletClient
> {
  const publicClient = getPublicClient({ chainId })
  return getContract_({
    address,
    abi,
    publicClient,
    walletClient,
  } as any) as GetContractResult<TAbi, TWalletClient>
}

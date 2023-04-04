import {
  Account,
  Chain,
  GetContractParameters,
  GetContractReturnType,
  PublicClient,
  Transport,
  getContract as getContract_,
} from 'viem'
import { Signer } from '../../types'
import { Abi } from 'abitype'
import { getProvider } from '../providers'

export type GetContractArgs<
  TAbi extends Abi | readonly unknown[] = Abi,
  TSigner extends Signer | unknown = unknown,
> = Omit<
  GetContractParameters<Transport, Chain, Account, TAbi, PublicClient, TSigner>,
  'publicClient' | 'walletClient'
> & {
  chainId?: number
  signer?: NonNullable<TSigner>
}

export type GetContractResult<
  TAbi extends Abi | readonly unknown[],
  TSigner extends Signer | unknown,
> = GetContractReturnType<TAbi, PublicClient, TSigner>

export function getContract<
  TAbi extends Abi | readonly unknown[],
  TSigner extends Signer | unknown,
>({
  address,
  abi,
  chainId,
  signer,
}: GetContractArgs<TAbi, TSigner>): GetContractResult<TAbi, TSigner> {
  const provider = getProvider({ chainId })
  return getContract_({
    address,
    abi,
    publicClient: provider,
    walletClient: signer,
  } as any) as GetContractResult<TAbi, TSigner>
}

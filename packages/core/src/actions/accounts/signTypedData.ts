import type { TypedData, TypedDataDomain } from 'abitype'
import type {
  Account,
  SignTypedDataParameters,
  SignTypedDataReturnType,
} from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import { assertActiveChain } from '../../utils'
import { getWalletClient } from '../viem'

export type SignTypedDataArgs<
  TTypedData extends
    | TypedData
    | {
        [key: string]: unknown
      } = TypedData,
  TPrimaryType extends string = string,
> = SignTypedDataParameters<TTypedData, TPrimaryType, Account>

export type SignTypedDataResult = SignTypedDataReturnType

export async function signTypedData<
  TTypedData extends
    | TypedData
    | {
        [key: string]: unknown
      },
  TPrimaryType extends string,
>({
  domain,
  message,
  primaryType,
  types,
}: SignTypedDataArgs<TTypedData, TPrimaryType>): Promise<SignTypedDataResult> {
  const walletClient = await getWalletClient()
  if (!walletClient) throw new ConnectorNotFoundError()

  const { chainId } = domain as TypedDataDomain
  if (chainId) assertActiveChain({ chainId, walletClient })

  return walletClient.signTypedData({
    message,
    primaryType,
    types,
    domain,
  } as SignTypedDataParameters)
}

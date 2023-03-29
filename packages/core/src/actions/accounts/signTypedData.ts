import type { TypedData, TypedDataDomain } from 'abitype'
import type {
  Account,
  SignTypedDataParameters,
  SignTypedDataReturnType,
} from 'viem'

import { ConnectorNotFoundError } from '../../errors'
import { assertActiveChain, normalizeChainId } from '../../utils'
import { fetchSigner } from './fetchSigner'

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
  const signer = await fetchSigner()
  if (!signer) throw new ConnectorNotFoundError()

  const { chainId: chainId_ } = domain as TypedDataDomain
  const chainId = chainId_ ? normalizeChainId(chainId_) : undefined
  if (chainId) assertActiveChain({ chainId, signer })

  return signer.signTypedData({
    message,
    primaryType,
    types,
    domain,
  } as SignTypedDataParameters)
}

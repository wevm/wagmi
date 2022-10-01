import { BlockTag } from '@ethersproject/providers'
import { Abi } from 'abitype'

import {
  DefaultOptions,
  GetConfig,
  GetReturnType,
  Options,
} from '../../types/events'
import { getProvider } from '../providers'
import { getContract } from './getContract'

export type QueryFilterConfig<
  TAbi = Abi,
  TEventName = string,
  TOptions extends Options = DefaultOptions,
> = GetConfig<
  {
    /** Contract ABI */
    contractInterface: TAbi
    /** Event to listen for */
    eventName: TEventName
    /** Chain id to use for provider */
    chainId?: number
    /** Optional block limit */
    fromBlockOrBlockhash?: BlockTag
    /** Optional block limit */
    toBlock?: BlockTag
  },
  TOptions
>

export type QueryFilterResult<TAbi = Abi, TEventName = string> = GetReturnType<{
  contractInterface: TAbi
  eventName: TEventName
}>

export async function queryFilter<
  TAbi extends Abi | readonly unknown[],
  TEventName extends string,
>({
  addressOrName,
  args,
  chainId,
  contractInterface,
  eventName,
  fromBlockOrBlockhash,
  toBlock,
}: QueryFilterConfig<TAbi, TEventName>) {
  const provider = getProvider({ chainId })
  const contract = getContract({
    addressOrName,
    contractInterface,
    signerOrProvider: provider,
  })

  const eventFilterFn = contract.filters[eventName]
  const eventFilter = eventFilterFn?.(...(args ?? [])) ?? eventName

  const response = await contract.queryFilter(
    eventFilter,
    fromBlockOrBlockhash,
    toBlock,
  )
  return <QueryFilterResult<TAbi, TEventName>>response
}

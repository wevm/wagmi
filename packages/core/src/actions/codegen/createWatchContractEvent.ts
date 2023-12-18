import { type Abi, type Address, type ContractEventName } from 'viem'

import { type Config } from '../../createConfig.js'
import { type UnionEvaluate, type UnionOmit } from '../../types/utils.js'
import { getAccount } from '../getAccount.js'
import { getChainId } from '../getChainId.js'
import {
  type WatchContractEventParameters,
  type WatchContractEventReturnType,
  watchContractEvent,
} from '../watchContractEvent.js'

export type CreateWatchContractEventParameters<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[]
  address?: address | Address | Record<number, Address> | undefined
}

export type CreateWatchContractEventReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
  ///
  omittedProperties extends 'abi' | 'address' | 'chainId' =
    | 'abi'
    | (address extends undefined ? never : 'address')
    | (address extends Record<number, Address> ? 'chainId' : never),
> = <
  config extends Config,
  eventName extends ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  config: config,
  parameters: UnionEvaluate<
    UnionOmit<
      WatchContractEventParameters<abi, eventName, strict, config, chainId>,
      omittedProperties
    >
  > &
    (address extends Record<number, Address>
      ? { chainId?: keyof address | undefined }
      : unknown),
) => WatchContractEventReturnType

export function createWatchContractEvent<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
>(
  c: CreateWatchContractEventParameters<abi, address>,
): CreateWatchContractEventReturnType<abi, address> {
  if (c.address !== undefined && typeof c.address === 'object')
    return (config, parameters) => {
      const configChainId = getChainId(config)
      const account = getAccount(config)
      const chainId =
        (parameters as { chainId?: number })?.chainId ??
        account.chainId ??
        configChainId
      const address = c.address?.[chainId]
      return watchContractEvent(config, {
        ...(parameters as any),
        ...c,
        address,
      })
    }

  return (config, parameters) => {
    return watchContractEvent(config, { ...(parameters as any), ...c })
  }
}

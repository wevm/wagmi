import type { Abi, Address, ContractEventName } from 'viem'

import type { Config } from '../../createConfig.js'
import type { UnionCompute, UnionStrictOmit } from '../../types/utils.js'
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
  eventName extends ContractEventName<abi> | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[]
  address?: address | Address | Record<number, Address> | undefined
  eventName?: eventName | ContractEventName<abi> | undefined
}

export type CreateWatchContractEventReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
  eventName extends ContractEventName<abi> | undefined,
  ///
  omittedProperties extends 'abi' | 'address' | 'chainId' | 'eventName' =
    | 'abi'
    | (address extends undefined ? never : 'address')
    | (address extends Record<number, Address> ? 'chainId' : never)
    | (eventName extends undefined ? never : 'eventName'),
> = <
  config extends Config,
  name extends eventName extends ContractEventName<abi>
    ? eventName
    : ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  config: config,
  parameters: UnionCompute<
    UnionStrictOmit<
      WatchContractEventParameters<abi, name, strict, config, chainId>,
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
  eventName extends ContractEventName<abi> | undefined = undefined,
>(
  c: CreateWatchContractEventParameters<abi, address, eventName>,
): CreateWatchContractEventReturnType<abi, address, eventName> {
  if (c.address !== undefined && typeof c.address === 'object')
    return (config, parameters) => {
      const configChainId = getChainId(config)
      const account = getAccount(config)
      const chainId =
        (parameters as { chainId?: number })?.chainId ??
        account.chainId ??
        configChainId
      return watchContractEvent(config, {
        ...(parameters as any),
        ...(c.eventName ? { functionName: c.eventName } : {}),
        address: c.address?.[chainId],
        abi: c.abi,
      })
    }

  return (config, parameters) => {
    return watchContractEvent(config, {
      ...(parameters as any),
      ...(c.address ? { address: c.address } : {}),
      ...(c.eventName ? { functionName: c.eventName } : {}),
      abi: c.abi,
    })
  }
}

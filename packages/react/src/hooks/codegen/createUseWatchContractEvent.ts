import {
  type Config,
  type ResolvedRegister,
  type WatchContractEventParameters,
} from '@wagmi/core'
import {
  type UnionEvaluate,
  type UnionOmit,
  type UnionPartial,
} from '@wagmi/core/internal'
import { type Abi, type Address, type ContractEventName } from 'viem'

import {
  type ConfigParameter,
  type EnabledParameter,
} from '../../types/properties.js'
import { useAccount } from '../useAccount.js'
import { useChainId } from '../useChainId.js'
import { useWatchContractEvent } from '../useWatchContractEvent.js'

export type CreateUseWatchContractEventParameters<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined = undefined,
> = {
  abi: abi | Abi | readonly unknown[]
  address?: address | Address | Record<number, Address> | undefined
}

export type CreateUseWatchContractEventReturnType<
  abi extends Abi | readonly unknown[],
  address extends Address | Record<number, Address> | undefined,
  ///
  omittedProperties extends 'abi' | 'address' | 'chainId' =
    | 'abi'
    | (address extends undefined ? never : 'address')
    | (address extends Record<number, Address> ? 'chainId' : never),
> = <
  eventName extends ContractEventName<abi>,
  strict extends boolean | undefined = undefined,
  config extends Config = ResolvedRegister['config'],
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
>(
  parameters?: UnionEvaluate<
    UnionPartial<
      UnionOmit<
        WatchContractEventParameters<abi, eventName, strict, config, chainId>,
        omittedProperties
      >
    > &
      ConfigParameter<config> &
      EnabledParameter
  > &
    (address extends Record<number, Address>
      ? { chainId?: keyof address | undefined }
      : unknown),
) => void

export function createUseWatchContractEvent<
  const abi extends Abi | readonly unknown[],
  const address extends
    | Address
    | Record<number, Address>
    | undefined = undefined,
>(
  config: CreateUseWatchContractEventParameters<abi, address>,
): CreateUseWatchContractEventReturnType<abi, address> {
  if (config.address !== undefined && typeof config.address === 'object')
    return (parameters) => {
      const configChainId = useChainId()
      const account = useAccount()
      const chainId =
        (parameters as { chainId?: number })?.chainId ??
        account.chainId ??
        configChainId
      const address = config.address?.[chainId]
      return useWatchContractEvent({
        ...(parameters as any),
        ...config,
        address,
      })
    }

  return (parameters) => {
    return useWatchContractEvent({ ...(parameters as any), ...config })
  }
}

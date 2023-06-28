import {
  type SwitchAccountError,
  type SwitchAccountParameters,
  type SwitchAccountReturnType,
  switchAccount,
} from '../actions/switchAccount.js'
import { type Config, type Connector } from '../config.js'
import type { Evaluate, Omit, PartialBy } from '../types/utils.js'
import type { Mutate, MutateAsync, MutationOptions } from './types.js'

export type SwitchAccountOptions<connector extends Connector | undefined> =
  Evaluate<
    Omit<SwitchAccountParameters, 'connector'> & {
      connector?: connector | SwitchAccountParameters['connector'] | undefined
    }
  >

export function switchAccountMutationOptions<
  config extends Config,
  connector extends Connector | undefined,
>(config: config, options: SwitchAccountOptions<connector> = {}) {
  return {
    getVariables(variables) {
      return {
        connector: (variables?.connector ?? options.connector)!,
      }
    },
    mutationFn(variables) {
      return switchAccount(config, variables)
    },
    mutationKey: ['switchAccount', options],
  } as const satisfies MutationOptions<
    SwitchAccountData<config>,
    SwitchAccountError,
    SwitchAccountVariables<undefined>,
    SwitchAccountParameters
  >
}

export type SwitchAccountData<config extends Config> = Evaluate<
  SwitchAccountReturnType<config>
>

export type SwitchAccountVariables<connector extends Connector | undefined> =
  | Evaluate<
      PartialBy<
        SwitchAccountParameters,
        connector extends Connector ? 'connector' : never
      >
    >
  | (connector extends Connector ? undefined : never)

export type SwitchAccountMutate<
  config extends Config,
  connector extends Connector | undefined,
  context = unknown,
> = Mutate<
  SwitchAccountData<config>,
  SwitchAccountError,
  SwitchAccountVariables<undefined>,
  context,
  SwitchAccountVariables<connector>
>

export type SwitchAccountMutateAsync<
  config extends Config,
  connector extends Connector | undefined,
  context = unknown,
> = MutateAsync<
  SwitchAccountData<config>,
  SwitchAccountError,
  SwitchAccountVariables<undefined>,
  context,
  SwitchAccountVariables<connector>
>

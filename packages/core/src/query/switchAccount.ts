import {
  type SwitchAccountError,
  type SwitchAccountParameters,
  type SwitchAccountReturnType,
  switchAccount,
} from '../actions/switchAccount.js'
import { type Config, type Connector } from '../config.js'
import type { Evaluate, IsUndefined } from '../types/utils.js'
import type { Mutate, MutateAsync, MutationOptions } from './types.js'

export type SwitchAccountOptions<connector extends Connector | undefined> =
  Evaluate<{
    connector?: connector | Connector | undefined
  }>

export const switchAccountMutationOptions = <
  connector extends Connector | undefined,
>(
  config: Config,
  options: SwitchAccountOptions<connector> = {},
) =>
  ({
    getVariables(variables) {
      return {
        connector: (variables?.connector ?? options.connector)!,
      }
    },
    mutationFn(variables) {
      return switchAccount(config, variables)
    },
    mutationKey: ['switchAccount', options],
  }) as const satisfies MutationOptions<
    SwitchAccountData,
    SwitchAccountError,
    SwitchAccountParameters,
    SwitchAccountParameters
  >

export type SwitchAccountData = SwitchAccountReturnType

export type SwitchAccountVariables<connector extends Connector | undefined> =
  Evaluate<
    IsUndefined<connector> extends false
      ? { connector?: Connector | undefined }
      : { connector: Connector | undefined }
  >

export type SwitchAccountMutate<
  connector extends Connector | undefined,
  context = unknown,
> = Mutate<
  SwitchAccountData,
  SwitchAccountError,
  SwitchAccountVariables<undefined>,
  context,
  SwitchAccountVariables<connector>
>

export type SwitchAccountMutateAsync<
  connector extends Connector | undefined,
  context = unknown,
> = MutateAsync<
  SwitchAccountData,
  SwitchAccountError,
  SwitchAccountVariables<undefined>,
  context,
  SwitchAccountVariables<connector>
>

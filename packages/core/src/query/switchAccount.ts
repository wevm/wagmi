import type { MutationOptions } from '@tanstack/query-core'

import {
  type SwitchAccountErrorType,
  type SwitchAccountParameters,
  type SwitchAccountReturnType,
  switchAccount,
} from '../actions/switchAccount.js'
import type { Config } from '../createConfig.js'
import type { Compute } from '../types/utils.js'
import type { Mutate, MutateAsync } from './types.js'

export function switchAccountMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return switchAccount(config, variables)
    },
    mutationKey: ['switchAccount'],
  } as const satisfies MutationOptions<
    SwitchAccountData<config>,
    SwitchAccountErrorType,
    SwitchAccountVariables
  >
}

export type SwitchAccountData<config extends Config> = Compute<
  SwitchAccountReturnType<config>
>

export type SwitchAccountVariables = Compute<SwitchAccountParameters>

export type SwitchAccountMutate<
  config extends Config,
  context = unknown,
> = Mutate<
  SwitchAccountData<config>,
  SwitchAccountErrorType,
  SwitchAccountVariables,
  context
>

export type SwitchAccountMutateAsync<
  config extends Config,
  context = unknown,
> = MutateAsync<
  SwitchAccountData<config>,
  SwitchAccountErrorType,
  SwitchAccountVariables,
  context
>

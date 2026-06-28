import type { MutationOptions } from '@tanstack/query-core'

import {
  type AddChainErrorType,
  type AddChainParameters,
  addChain,
} from '../actions/addChain.js'
import type { Config } from '../createConfig.js'
import type { MutationParameter } from '../types/query.js'
import type { Compute } from '../types/utils.js'
import type { Mutate, MutateAsync } from './types.js'

export type AddChainOptions<context = unknown> = MutationParameter<
  AddChainData,
  AddChainErrorType,
  AddChainVariables,
  context
>

export function addChainMutationOptions<context>(
  config: Config,
  options: AddChainOptions<context> = {},
): AddChainMutationOptions {
  return {
    ...(options.mutation as any),
    mutationFn(variables) {
      return addChain(config, variables)
    },
    mutationKey: ['addChain'],
  }
}

export type AddChainMutationOptions = MutationOptions<
  AddChainData,
  AddChainErrorType,
  AddChainVariables
>

export type AddChainData = void

export type AddChainVariables = Compute<AddChainParameters>

export type AddChainMutate<context = unknown> = Mutate<
  AddChainData,
  AddChainErrorType,
  AddChainVariables,
  context
>

export type AddChainMutateAsync<context = unknown> = MutateAsync<
  AddChainData,
  AddChainErrorType,
  AddChainVariables,
  context
>

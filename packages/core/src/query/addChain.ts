import type { MutationOptions } from '@tanstack/query-core'

import {
  type AddChainErrorType,
  type AddChainParameters,
  addChain,
} from '../actions/addChain.js'
import type { Config } from '../createConfig.js'
import type { Mutate, MutateAsync } from './types.js'

export function addChainMutationOptions(config: Config) {
  return {
    mutationFn(variables) {
      return addChain(config, variables)
    },
    mutationKey: ['addChain'],
  } as const satisfies MutationOptions<
    AddChainData,
    AddChainErrorType,
    AddChainVariables
  >
}

export type AddChainData = void

export type AddChainVariables = AddChainParameters

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

import type { MutateOptions, MutationOptions } from '@tanstack/query-core'

import type { Config } from '../../createConfig.js'
import type { Compute } from '../../types/utils.js'
import {
  type ShowCallsStatusErrorType,
  type ShowCallsStatusParameters,
  type ShowCallsStatusReturnType,
  showCallsStatus,
} from '../actions/showCallsStatus.js'

export function showCallsStatusMutationOptions<config extends Config>(
  config: config,
) {
  return {
    mutationFn(variables) {
      return showCallsStatus(config, variables)
    },
    mutationKey: ['showCallsStatus'],
  } as const satisfies MutationOptions<
    ShowCallsStatusData,
    ShowCallsStatusErrorType,
    ShowCallsStatusVariables
  >
}

export type ShowCallsStatusData = Compute<ShowCallsStatusReturnType>

export type ShowCallsStatusVariables = ShowCallsStatusParameters

export type ShowCallsStatusMutate<context = unknown> = (
  variables: ShowCallsStatusVariables,
  options?:
    | Compute<
        MutateOptions<
          ShowCallsStatusData,
          ShowCallsStatusErrorType,
          Compute<ShowCallsStatusVariables>,
          context
        >
      >
    | undefined,
) => void

export type ShowCallsStatusMutateAsync<context = unknown> = (
  variables: ShowCallsStatusVariables,
  options?:
    | Compute<
        MutateOptions<
          ShowCallsStatusData,
          ShowCallsStatusErrorType,
          Compute<ShowCallsStatusVariables>,
          context
        >
      >
    | undefined,
) => Promise<ShowCallsStatusData>

import { useMutation } from '@tanstack/react-query'
import {
  type DisconnectMutationOptions,
  disconnectMutationOptions,
} from '@wagmi/core'

import { useConfig } from './useConfig.js'

export type UseDisconnectParameters = DisconnectMutationOptions

export function useDisconnect(parameters: UseDisconnectParameters = {}) {
  const config = useConfig()
  const { mutate, mutateAsync, ...rest } = useMutation(
    disconnectMutationOptions(config, parameters),
  )
  return {
    ...rest,
    disconnect: mutate,
    disconnectAsync: mutateAsync,
  }
}

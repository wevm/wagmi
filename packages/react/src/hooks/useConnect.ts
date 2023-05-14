import { useMutation } from '@tanstack/react-query'
import {
  type ConnectMutationOptions,
  connectMutationOptions,
} from '@wagmi/core'

import { useConfig } from './useConfig.js'

export type UseConnectParameters = ConnectMutationOptions

export function useConnect(parameters: UseConnectParameters = {}) {
  const config = useConfig()
  const { mutate, mutateAsync, ...rest } = useMutation(
    connectMutationOptions(config, parameters),
  )
  return {
    ...rest,
    connect: mutate,
    connectAsync: mutateAsync,
    connectors: config.connectors,
  }
}

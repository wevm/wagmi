'use client'

import {
  type GetConnectionsReturnType,
  getConnections,
  watchConnections,
} from '@wagmi/core'

import type { ConfigParameter } from '../types/properties.ts'
import { createConfig } from './createConfig.ts'
import { createStore } from 'solid-js/store'
import { onCleanup } from 'solid-js'
import type { FunctionedParams } from '@tanstack/solid-query'

export type UseConnectionsParameters = FunctionedParams<ConfigParameter>

export type UseConnectionsReturnType = GetConnectionsReturnType

/** https://wagmi.sh/react/api/hooks/useConnections */
export function useConnections(
  parameters: UseConnectionsParameters = ()=>({}),
): { connections: UseConnectionsReturnType } {
  const config = createConfig(parameters)

  const [connections, setConnections] = createStore(getConnections(config))

  function onChange(_account: GetConnectionsReturnType){
    setConnections(_account)
  }

  const unsubscribe = watchConnections(config, { onChange })

  onCleanup(unsubscribe)


  return { connections }
}

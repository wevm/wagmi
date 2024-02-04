'use client'

import {
  type GetConnectionsReturnType,
  getConnections,
  watchConnections,
} from '@wagmi/core'

import type { ConfigParameter } from '../types/properties.js'
import { createConfig } from './createConfig.js'
import { createStore } from 'solid-js/store'
import { onCleanup } from 'solid-js'
import type { FunctionedParams } from '@tanstack/solid-query'

export type CreateConnectionsParameters = FunctionedParams<ConfigParameter>

export type CreateConnectionsReturnType = GetConnectionsReturnType

/** https://wagmi.sh/react/api/hooks/useConnections */
export function createConnections(
  parameters: CreateConnectionsParameters = ()=>({}),
): { connections: CreateConnectionsReturnType } {
  const { config: _config } = createConfig(parameters)

  const [connections, setConnections] = createStore(getConnections(_config))

  function onChange(_account: GetConnectionsReturnType){
    setConnections(_account)
  }

  const unsubscribe = watchConnections(_config, { onChange })

  onCleanup(unsubscribe)


  return { connections }
}

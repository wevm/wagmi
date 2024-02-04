'use client'

import {
  type GetConnectorsReturnType,
  getConnectors,
  watchConnectors,
} from '@wagmi/core'

import type { ConfigParameter } from '../types/properties.js'
import { createConfig } from './createConfig.js'
import type { FunctionedParams } from '@tanstack/solid-query'
import { createStore } from 'solid-js/store'
import { onCleanup } from 'solid-js'

export type CreateConnectorsParameters = FunctionedParams<ConfigParameter>

export type CreateConnectorsReturnType = { connectors: GetConnectorsReturnType }

/** https://wagmi.sh/react/api/hooks/useConnectors */
export function createConnectors(
  parameters: CreateConnectorsParameters = ()=>({}),
): CreateConnectorsReturnType {
  const { config: _config } = createConfig(parameters)

  const [connectors, setConnectors] = createStore(getConnectors(_config))

  function onChange(_connectors: GetConnectorsReturnType){
    setConnectors(_connectors)
  }

  const unsubscribe = watchConnectors(_config, { onChange })

  onCleanup(unsubscribe)

  return { connectors }
}

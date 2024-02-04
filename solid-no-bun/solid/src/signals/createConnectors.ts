'use client'

import {
  type GetConnectorsReturnType,
  getConnectors,
  watchConnectors,
} from '@wagmi/core'

import type { ConfigParameter } from '../types/properties.ts'
import { createConfig } from './createConfig.ts'
import type { FunctionedParams } from '@tanstack/solid-query'
import { createStore } from 'solid-js/store'
import { onCleanup } from 'solid-js'

export type CreateConnectorsParameters = FunctionedParams<ConfigParameter>

export type CreateConnectorsReturnType = { connectors: GetConnectorsReturnType }

/** https://wagmi.sh/react/api/hooks/useConnectors */
export function createConnectors(
  parameters: CreateConnectorsParameters = ()=>({}),
): CreateConnectorsReturnType {
  const config = createConfig(parameters)

  const [connectors, setConnectors] = createStore(getConnectors(config))

  function onChange(_connectors: GetConnectorsReturnType){
    setConnectors(_connectors)
  }

  const unsubscribe = watchConnectors(config, { onChange })

  onCleanup(unsubscribe)

  return { connectors }
}

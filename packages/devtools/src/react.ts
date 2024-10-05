/** @jsxImportSource react */
'use client'

import { type QueryClient, useQueryClient } from '@tanstack/react-query'
import { Devtools, version } from '@wagmi/devtools-ui'
import React from 'react'
import { type Config, useConfig } from 'wagmi'

export function WagmiDevtools(
  props: WagmiDevtools.Props,
): React.ReactElement | null {
  const config = useConfig(props)

  const tanstack_queryClient = useQueryClient()
  const queryClient = (props.queryClient ||
    tanstack_queryClient) as unknown as Devtools.Props['queryClient']

  const ref = React.useRef<HTMLDivElement>(null)
  const [devtools] = React.useState(
    new Devtools({
      config,
      framework: 'react',
      queryClient,
      version,
    }),
  )

  React.useEffect(() => {
    devtools.setConfig(config)
  }, [config, devtools])

  React.useEffect(() => {
    devtools.setQueryClient(
      tanstack_queryClient as unknown as Devtools.Props['queryClient'],
    )
  }, [tanstack_queryClient, devtools])

  React.useEffect(() => {
    if (ref.current) devtools.mount(ref.current)
    return () => {
      devtools.unmount()
    }
  }, [devtools])

  return React.createElement('div', { id: 'wagmi-devtools-root', ref })
}

export declare namespace WagmiDevtools {
  type Props = {
    config?: Config | undefined
    queryClient?: QueryClient | undefined
  }
}

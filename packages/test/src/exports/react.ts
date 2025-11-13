import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react'
import {
  type RenderHookOptions,
  type RenderHookResult,
  type RenderResult,
  render as vbr_render,
  renderHook as vbr_renderHook,
} from 'vitest-browser-react'
import { WagmiProvider } from 'wagmi'

import { config } from '../config.js'

export const queryClient = new QueryClient()

export function createWrapper<component extends React.FunctionComponent<any>>(
  Wrapper: component,
  props: Parameters<component>[0],
) {
  type Props = { children?: React.ReactNode | undefined }
  return function CreatedWrapper({ children }: Props) {
    return React.createElement(
      Wrapper,
      props,
      React.createElement(
        QueryClientProvider,
        { client: queryClient },
        children,
      ),
    )
  }
}

export function renderHook<result, props>(
  renderCallback: (initialProps?: props) => result,
  options?: RenderHookOptions<props>,
): Promise<RenderHookResult<result, props>> {
  queryClient.clear()
  return vbr_renderHook(renderCallback, {
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: false }),
    ...options,
  })
}

export function render(
  ...args: Parameters<typeof vbr_render>
): Promise<RenderResult> {
  queryClient.clear()
  return vbr_render(args[0], {
    ...args[1],
    wrapper: createWrapper(WagmiProvider, { config, reconnectOnMount: false }),
  })
}

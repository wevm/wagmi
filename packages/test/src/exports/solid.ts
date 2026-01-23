import { renderHook } from '@solidjs/testing-library'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { WagmiProvider } from '@wagmi/solid'
import { type Component, createComponent, type ParentProps } from 'solid-js'

import { config } from '../config.js'

export const queryClient = new QueryClient()

export function createWrapper<component extends Component<any>>(
  Wrapper: component,
  props: Parameters<component>[0],
) {
  return function CreatedWrapper(wrapperProps: ParentProps) {
    return createComponent(Wrapper, {
      ...props,
      get children() {
        return createComponent(QueryClientProvider, {
          client: queryClient,
          get children() {
            return wrapperProps.children
          },
        })
      },
    })
  }
}

export type RenderPrimitiveReturnType<primitive extends () => unknown> = {
  result: ReturnType<primitive>
  cleanup: () => void
}

export function renderPrimitive<primitive extends () => unknown>(
  primitive: primitive,
  options?: {
    wrapper?: Component<ParentProps>
  },
): RenderPrimitiveReturnType<primitive> {
  queryClient.clear()

  const wrapper =
    options?.wrapper ??
    createWrapper(WagmiProvider, {
      config,
      reconnectOnMount: false,
    })

  const { result, cleanup } = renderHook(primitive, { wrapper })

  return {
    result: result as ReturnType<primitive>,
    cleanup,
  }
}

import * as React from 'react'
import {
  RenderHookOptions,
  WrapperComponent,
  renderHook as defaultRenderHook,
} from '@testing-library/react-hooks'
import { MockConnector } from '@wagmi/private/testing'

import { Provider, ProviderProps } from '../src'

import '@testing-library/jest-dom/extend-expect'

type Props = {
  children:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode
  providerProps?: ProviderProps
}
export const Providers = ({ children, providerProps }: Props) => {
  return (
    <Provider connectors={[new MockConnector()]} {...providerProps}>
      {children}
    </Provider>
  )
}

export const renderHook = <TProps, TResult>(
  hook: (props: TProps) => TResult,
  {
    wrapper,
    ...options
  }: RenderHookOptions<TProps & ProviderProps> | undefined = {},
) => {
  if (!wrapper) wrapper = Providers as WrapperComponent<TProps>
  return defaultRenderHook<TProps, TResult>(hook, { wrapper, ...options })
}

export { act as actHook } from '@testing-library/react-hooks'

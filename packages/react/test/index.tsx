import * as React from 'react'
import {
  RenderHookOptions,
  WrapperComponent,
  renderHook as defaultRenderHook,
} from '@testing-library/react-hooks'
import '@testing-library/jest-dom/extend-expect'

import { Provider, ProviderProps } from '../src'
import { setupWagmiClient } from './utils'

type Props = ProviderProps & {
  children?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode
}
export const wrapper = (props: Props) => {
  return <Provider client={setupWagmiClient()} {...props} />
}

export const renderHook = <TProps, TResult>(
  hook: (props: TProps) => TResult,
  {
    wrapper: wrapper_,
    ...options
  }: RenderHookOptions<TProps & ProviderProps> | undefined = {},
) => {
  if (wrapper_ == undefined) wrapper_ = wrapper as WrapperComponent<TProps>
  return defaultRenderHook<TProps, TResult>(hook, {
    wrapper: wrapper_,
    ...options,
  })
}

export { act as actHook } from '@testing-library/react-hooks'
export {
  setupWagmiClient,
  getMockConnector,
  getProvider,
  getSigners,
} from './utils'

import * as React from 'react'
import {
  RenderHookOptions,
  WrapperComponent,
  renderHook as defaultRenderHook,
} from '@testing-library/react-hooks'
import { providers } from 'ethers'
import {
  MockConnector,
  defaultChains,
  infuraApiKey,
  wallets,
} from 'wagmi-testing'

import { Provider, ProviderProps } from '../src'

import '@testing-library/jest-dom/extend-expect'

type Props = ProviderProps & {
  children?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactNode
}
export const wrapper = (props: Props) => {
  return (
    <Provider
      connectors={[
        new MockConnector({
          chains: defaultChains,
          options: {
            network: 1,
            privateKey: wallets.ethers1.privateKey,
          },
        }),
      ]}
      provider={new providers.InfuraProvider(1, infuraApiKey)}
      {...props}
    />
  )
}

export const renderHook = <TProps, TResult>(
  hook: (props: TProps) => TResult,
  {
    wrapper: _wrapper,
    ...options
  }: RenderHookOptions<TProps & ProviderProps> | undefined = {},
) => {
  if (_wrapper == undefined) _wrapper = wrapper as WrapperComponent<TProps>
  return defaultRenderHook<TProps, TResult>(hook, {
    wrapper: _wrapper,
    ...options,
  })
}

export { act as actHook } from '@testing-library/react-hooks'

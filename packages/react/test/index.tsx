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
  defaultMnemonic,
} from '@wagmi/private/testing'

import { Provider, ProviderProps } from '../src'

import '@testing-library/jest-dom/extend-expect'

export const infuraApiKey = 'mockApiKey'

export const addressLookup = {
  ensDefaultReverseResolver: '0xa2c122be93b0074270ebee7f6b7292c7deb45047',
  ensPublicResolver: '0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41',
  ensRegistryWithFallback: '0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e',
  uniToken: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  addressWithEns: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  addressWithoutEns: '0x5FE6C3F8d12D5Ad1480F6DC01D8c7864Aa58C523',
}

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
            mnemonic: defaultMnemonic,
            network: 1,
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

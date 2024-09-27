import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { http, createConfig } from '@wagmi/core'
import { config, mainnet } from '@wagmi/test'
import React from 'react'
import { expect, test } from 'vitest'

import { WagmiProvider } from './context.js'
import { useAccount } from './hooks/useAccount.js'
import { useConnectorClient } from './hooks/useConnectorClient.js'

test('default', () => {
  function Component() {
    const { address } = useAccount()
    const { data } = useConnectorClient()
    return (
      <div>
        <h1>wevm</h1>
        <div>useAccount: {address}</div>
        <div>useConnectorClient: {data?.account?.address}</div>
      </div>
    )
  }

  const queryClient = new QueryClient()
  render(
    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    </WagmiProvider>,
  )
  expect(screen.getByRole('heading').innerText).toMatchInlineSnapshot(`"wevm"`)
})

test('fake ssr config', () => {
  const config = createConfig({
    chains: [mainnet],
    pollingInterval: 100,
    ssr: true,
    transports: {
      [mainnet.id]: http(),
    },
  })
  const queryClient = new QueryClient()

  render(
    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <h1>wevm</h1>
      </QueryClientProvider>
    </WagmiProvider>,
  )
  expect(screen.getAllByRole('heading')).toMatchInlineSnapshot(`
    [
      <h1>
        wevm
      </h1>,
      <h1>
        wevm
      </h1>,
    ]
  `)
})

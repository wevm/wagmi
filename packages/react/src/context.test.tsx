import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, waitFor } from '@testing-library/react'
import { http, connect, createConfig, mock } from '@wagmi/core'
import { accounts, addressRegex, config, mainnet } from '@wagmi/test'
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
  const result = render(
    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    </WagmiProvider>,
  )
  expect(result.getByRole('heading').innerText).toMatchInlineSnapshot(`"wevm"`)
  result.unmount()
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

  const result = render(
    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <h1>wevm</h1>
      </QueryClientProvider>
    </WagmiProvider>,
  )
  expect(result.getAllByRole('heading')).toMatchInlineSnapshot(`
    [
      <h1>
        wevm
      </h1>,
    ]
  `)
  result.unmount()
})

test('mock reconnect', async () => {
  function Component() {
    const { address } = useAccount()
    return (
      <div>
        <h1>{address}</h1>
      </div>
    )
  }

  const connector = mock({
    accounts,
    features: { reconnect: true },
  })
  const config = createConfig({
    chains: [mainnet],
    connectors: [connector],
    storage: null,
    transports: {
      [mainnet.id]: http(),
    },
  })
  await connect(config, { connector })

  const queryClient = new QueryClient()
  const result = render(
    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider client={queryClient}>
        <Component />
      </QueryClientProvider>
    </WagmiProvider>,
  )
  await waitFor(() =>
    expect(result.getByRole('heading').innerText).toMatch(addressRegex),
  )
  result.unmount()
})

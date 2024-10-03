import { disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/solid'
import { afterEach, expect, test } from 'vitest'

import { useAccount } from './useAccount.js'
import { useConnect } from './useConnect.js'
import { useConnectors } from './useConnectors.js'

const connector = config.connectors[0]!

afterEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test('default', async () => {
  const { result } = renderHook(() => ({
    account: useAccount(),
    connect: useConnect(),
    connectors: useConnectors(),
  }))

  expect(result.account.address).not.toBeDefined()
  expect(result.account.status).toEqual('disconnected')

  result.connect.mutate({
    connector: result.connectors[0]!,
  })

  await waitFor(() => expect(result.account.isConnected).toBeTruthy())

  expect(result.account.address).toBeDefined()
  expect(result.account.status).toEqual('connected')
})

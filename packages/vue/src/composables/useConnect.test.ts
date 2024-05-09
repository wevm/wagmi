import { disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { afterEach, expect, test } from 'vitest'

import { useAccount } from './useAccount.js'
import { useConnect } from './useConnect.js'

const connector = config.connectors[0]!

afterEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test('default', async () => {
  const [account] = renderComposable(() => useAccount())
  const [connect] = renderComposable(() => useConnect())

  expect(account.value.address).not.toBeDefined()
  expect(account.value.status).toEqual('disconnected')

  connect.connect({
    connector: connect.connectors[0]!,
  })

  await waitFor(account, (account) => account.isConnected)

  expect(account.value.address).toBeDefined()
  expect(account.value.status).toEqual('connected')
})

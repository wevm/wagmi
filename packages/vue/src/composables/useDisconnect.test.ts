import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { beforeEach, expect, test } from 'vitest'

import { useAccount } from './useAccount.js'
import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await connect(config, { connector })
})

test('default', async () => {
  const [account] = renderComposable(() => useAccount())
  const [disconnect] = renderComposable(() => useDisconnect())

  expect(account.value.address).toBeDefined()
  expect(account.value.status).toEqual('connected')

  disconnect.disconnect()

  await waitFor(account, (account) => account.isDisconnected)

  expect(account.value.address).not.toBeDefined()
  expect(account.value.status).toEqual('disconnected')
})

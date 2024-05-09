import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderComposable } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { useAccount } from './useAccount.js'

test('default', async () => {
  const [account] = renderComposable(() => useAccount())

  expect(account.value.address).not.toBeDefined()
  expect(account.value.status).toEqual('disconnected')

  await connect(config, { connector: config.connectors[0]! })

  expect(account.value.address).toBeDefined()
  expect(account.value.status).toEqual('connected')

  await disconnect(config)
})

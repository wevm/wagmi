import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { useAccount } from './useAccount.js'
import { useSwitchAccount } from './useSwitchAccount.js'

const connector1 = config.connectors[0]!
const connector2 = config.connectors[1]!

test('default', async () => {
  const [account] = renderComposable(() => useAccount())
  const [switchAccount] = renderComposable(() => useSwitchAccount())

  expect(switchAccount.connectors.value).toEqual([])

  await connect(config, { connector: connector2 })
  await connect(config, { connector: connector1 })

  expect(switchAccount.connectors.value.length).toEqual(2)

  const address1 = account.address.value
  expect(address1).toBeDefined()

  switchAccount.switchAccount({ connector: connector2 })
  await waitFor(switchAccount.isSuccess)

  const address2 = account.address.value
  expect(address2).toBeDefined()
  expect(address1).not.toBe(address2)

  switchAccount.switchAccount({ connector: connector1 })
  await waitFor(switchAccount.isSuccess)

  const address3 = account.address.value
  expect(address3).toBeDefined()
  expect(address1).toBe(address3)

  await disconnect(config, { connector: connector1 })
  await disconnect(config, { connector: connector2 })
})

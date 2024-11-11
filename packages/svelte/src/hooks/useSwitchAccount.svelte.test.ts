import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { expect, test } from 'vitest'
import { testHook } from './test.svelte.js'
import { useAccount } from './useAccount.svelte.js'
import { useSwitchAccount } from './useSwitchAccount.svelte.js'

const connector1 = config.connectors[0]!
const connector2 = config.connectors[1]!

test(
  'default',
  testHook(
    async () => {
      const account = $derived.by(useAccount())
      const switchAccount = $derived.by(useSwitchAccount())

      const address1 = account.address
      expect(address1).toBeDefined()

      switchAccount.switchAccount({ connector: connector2 })
      await expect.poll(() => switchAccount.isSuccess).toBeTruthy()

      const address2 = account.address
      expect(address2).toBeDefined()
      expect(address1).not.toBe(address2)

      switchAccount.switchAccount({ connector: connector1 })
      await expect.poll(() => switchAccount.isSuccess).toBeTruthy()

      const address3 = account.address
      expect(address3).toBeDefined()
      expect(address1).toBe(address3)
    },
    {},
    async () => {
      await connect(config, { connector: connector2 })
      await connect(config, { connector: connector1 })
    },
    async () => {
      await disconnect(config, { connector: connector1 })
      await disconnect(config, { connector: connector2 })
    },
  ),
)

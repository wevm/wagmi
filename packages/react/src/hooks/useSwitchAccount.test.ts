import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { renderHook } from '../../test-utils.js'
import { useAccount } from './useAccount.js'
import { useSwitchAccount } from './useSwitchAccount.js'

const connector1 = config.connectors[0]!
const connector2 = config.connectors[1]!

test('default', async () => {
  await connect(config, { connector: connector1 })
  await connect(config, { connector: connector2 })

  const { result, rerender } = renderHook(() => ({
    useAccount: useAccount(),
    useSwitchAccount: useSwitchAccount(),
  }))

  const address1 = result.current.useAccount.address
  expect(address1).toBeDefined()

  result.current.useSwitchAccount.switchAccount({ connector: connector1 })
  rerender()

  const address2 = result.current.useAccount.address
  expect(address2).toBeDefined()
  expect(address1).not.toBe(address2)

  result.current.useSwitchAccount.switchAccount({ connector: connector2 })
  rerender()

  const address3 = result.current.useAccount.address
  expect(address3).toBeDefined()
  expect(address1).toBe(address3)

  disconnect(config, { connector: connector1 })
  disconnect(config, { connector: connector2 })
})

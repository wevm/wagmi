import { connect, disconnect } from '@wagmi/core'
import { config, wait } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useAccount } from './useAccount.js'
import { useSwitchAccount } from './useSwitchAccount.js'

const connector1 = config.connectors[0]!
const connector2 = config.connectors[1]!

test('default', async () => {
  await connect(config, { connector: connector2 })
  await connect(config, { connector: connector1 })

  const { result } = await renderHook(() => ({
    useAccount: useAccount(),
    useSwitchAccount: useSwitchAccount(),
  }))

  const address1 = result.current.useAccount.address
  expect(address1).toBeDefined()

  result.current.useSwitchAccount.switchAccount({ connector: connector2 })
  await vi.waitFor(() =>
    expect(result.current.useSwitchAccount.isSuccess).toBeTruthy(),
  )
  await wait(0)

  const address2 = result.current.useAccount.address
  expect(address2).toBeDefined()
  expect(address1).not.toBe(address2)

  result.current.useSwitchAccount.switchAccount({ connector: connector1 })
  await vi.waitFor(() =>
    expect(result.current.useSwitchAccount.isSuccess).toBeTruthy(),
  )
  await wait(0)

  const address3 = result.current.useAccount.address
  expect(address3).toBeDefined()
  expect(address1).toBe(address3)

  await disconnect(config, { connector: connector1 })
  await disconnect(config, { connector: connector2 })
})

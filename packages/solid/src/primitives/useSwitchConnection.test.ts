import { connect, disconnect } from '@wagmi/core'
import { config, wait } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test, vi } from 'vitest'

import { useConnection } from './useConnection.js'
import { useSwitchConnection } from './useSwitchConnection.js'

const connector1 = config.connectors[0]!
const connector2 = config.connectors[1]!

test('default', async () => {
  await connect(config, { connector: connector2 })
  await connect(config, { connector: connector1 })

  const { result } = renderPrimitive(() => ({
    useConnection: useConnection(),
    useSwitchConnection: useSwitchConnection(),
  }))

  const address1 = result.useConnection().address
  expect(address1).toBeDefined()

  result.useSwitchConnection.mutate({ connector: connector2 })
  await vi.waitFor(() =>
    expect(result.useSwitchConnection.isSuccess).toBeTruthy(),
  )
  await wait(0)

  const address2 = result.useConnection().address
  expect(address2).toBeDefined()
  expect(address1).not.toBe(address2)

  result.useSwitchConnection.mutate({ connector: connector1 })
  await vi.waitFor(() =>
    expect(result.useSwitchConnection.isSuccess).toBeTruthy(),
  )
  await wait(0)

  const address3 = result.useConnection().address
  expect(address3).toBeDefined()
  expect(address1).toBe(address3)

  await disconnect(config, { connector: connector1 })
  await disconnect(config, { connector: connector2 })
})

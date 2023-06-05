import { config } from '@wagmi/test'
import { describe, expect, test } from 'vitest'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { getAccount } from './getAccount.js'
import { switchAccount, switchAccountMutationOptions } from './switchAccount.js'

const connector1 = config.connectors[0]!
const connector2 = config.connectors[1]!

describe('switchAccount', () => {
  test('default', async () => {
    await connect(config, { connector: connector2 })
    await connect(config, { connector: connector1 })

    const address1 = getAccount(config).address

    switchAccount(config, { connector: connector2 })

    const address2 = getAccount(config).address
    expect(address2).toBeDefined()
    expect(address1).not.toBe(address2)

    switchAccount(config, { connector: connector1 })

    const address3 = getAccount(config).address
    expect(address3).toBeDefined()
    expect(address1).toBe(address3)

    await disconnect(config, { connector: connector1 })
    await disconnect(config, { connector: connector2 })
  })
})

describe('switchAccountMutationOptions', () => {
  test('default', () => {
    expect(
      switchAccountMutationOptions(config, { connector: connector1 }),
    ).toMatchObject(
      expect.objectContaining({
        mutationFn: expect.any(Function),
        mutationKey: [
          'switchAccount',
          expect.objectContaining({
            connector: expect.any(Object),
          }),
        ],
      }),
    )
  })
})

import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { testHook } from '@wagmi/test/svelte'
import { beforeEach, expect, test } from 'vitest'
import { useAccount } from './useAccount.svelte.js'
import { useDisconnect } from './useDisconnect.svelte.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await connect(config, { connector })
})

test(
  'default',
  testHook(async () => {
    const account = $derived.by(useAccount())
    const disconnect = $derived.by(useDisconnect())

    expect(account.address).toBeDefined()
    expect(account.status).toEqual('connected')

    disconnect.disconnect()

    await expect.poll(() => account.isDisconnected).toBeTruthy()

    expect(account.address).not.toBeDefined()
    expect(account.status).toEqual('disconnected')
  }),
)

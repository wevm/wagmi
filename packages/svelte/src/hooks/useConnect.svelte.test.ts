import { disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { testHook } from '@wagmi/test/svelte'
import { afterEach, expect, test } from 'vitest'
import { useAccount } from './useAccount.svelte.js'
import { useConnect } from './useConnect.svelte.js'

const connector = config.connectors[0]!

afterEach(async () => {
  if (config.state.current === connector.uid)
    await disconnect(config, { connector })
})

test(
  'default',
  testHook(async () => {
    const account = $derived.by(useAccount())
    const connect = $derived.by(useConnect())

    expect(account.address).not.toBeDefined()
    expect(account.status).toEqual('disconnected')

    connect.connect({
      connector: connect.connectors[0]!,
    })

    await expect.poll(() => account.isConnected).toBeTruthy()

    expect(account.address).toBeDefined()
    expect(account.status).toEqual('connected')
  }),
)

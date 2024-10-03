import { connect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/solid'
import { beforeEach, expect, test } from 'vitest'

import { useAccount } from './useAccount.js'
import { useDisconnect } from './useDisconnect.js'

const connector = config.connectors[0]!

beforeEach(async () => {
  await connect(config, { connector })
})

test('default', async () => {
  const { result } = renderHook(() => ({
    account: useAccount(),
    disconnect: useDisconnect(),
  }))

  expect(result.account.address).toBeDefined()
  expect(result.account.status).toEqual('connected')

  // TODO: `CreateMutationFunction` accept `void`
  // https://github.com/TanStack/query/blob/69476f0ce5778afad4520ed42485b4110993afed/packages/solid-query/src/types.ts#L170
  result.disconnect.mutate({})

  await waitFor(() => expect(result.account.isDisconnected).toBeTruthy())

  expect(result.account.address).not.toBeDefined()
  expect(result.account.status).toEqual('disconnected')
})

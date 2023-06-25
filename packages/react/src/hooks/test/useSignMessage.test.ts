import { connect, disconnect } from '@wagmi/core'
import { config } from '@wagmi/test'
import { renderHook, waitFor } from '@wagmi/test/react'
import { expect, test } from 'vitest'

import { useSignMessage } from '../useSignMessage.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderHook(() => useSignMessage())

  result.current.signMessage({ message: 'foo bar baz' })
  await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

  expect(result.current.data).toMatchInlineSnapshot(
    '"0xbbfaf80b48f1067feb22abdff88464ae345ac1aa54b275c82847eb07c2185dab7d72051bcbd739a44daaac019f99ce38300ece87c7da4eb3da863179672b9acc1b"',
  )

  await disconnect(config, { connector })
})

import { connect, disconnect } from '@wagmi/core'
import { chain, config } from '@wagmi/test'
import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'

import { useConnection } from './useConnection.js'
import { useSwitchChain } from './useSwitchChain.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const [connection] = renderComposable(() => useConnection())
  const [switchChain] = renderComposable(() => useSwitchChain())

  const chainId1 = connection.chainId.value
  expect(chainId1).toBeDefined()

  switchChain.switchChain({ chainId: chain.mainnet2.id })
  await waitFor(switchChain.isSuccess)

  const chainId2 = connection.chainId.value
  expect(chainId2).toBeDefined()
  expect(chainId1).not.toBe(chainId2)

  switchChain.switchChain({ chainId: chain.mainnet.id })
  await waitFor(switchChain.isSuccess)

  const chainId3 = connection.chainId.value
  expect(chainId3).toBeDefined()
  expect(chainId1).toBe(chainId3)

  await disconnect(config, { connector })
})

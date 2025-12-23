import { abi, address, config } from '@wagmi/test'
import { renderPrimitive } from '@wagmi/test/solid'
import { expect, test, vi } from 'vitest'
import { connect, disconnect } from '../exports/actions.js'
import { useWriteContract } from './useWriteContract.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })

  const { result } = renderPrimitive(useWriteContract)

  result.mutate({
    abi: abi.wagmiMintExample,
    address: address.wagmiMintExample,
    functionName: 'mint',
  })

  await vi.waitUntil(() => result.isSuccess, { timeout: 15_000 })

  expect(result.data).toBeDefined()

  await disconnect(config, { connector })
})

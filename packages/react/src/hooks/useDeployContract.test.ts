import { connect, disconnect } from '@wagmi/core'
import { abi, bytecode, config, transactionHashRegex } from '@wagmi/test'
import { renderHook } from '@wagmi/test/react'
import { expect, test, vi } from 'vitest'

import { useDeployContract } from './useDeployContract.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  const { result } = await renderHook(() => useDeployContract())

  result.current.deployContract({
    abi: abi.bayc,
    bytecode: bytecode.bayc,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
  })
  await vi.waitUntil(() => result.current.isSuccess)

  expect(result.current.data).toMatch(transactionHashRegex)

  await disconnect(config, { connector })
})

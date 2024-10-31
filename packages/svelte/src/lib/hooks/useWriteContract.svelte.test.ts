import { connect, disconnect } from '@wagmi/core'
import { abi, address, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { testHook } from './test.svelte.js'
import { useWriteContract } from './useWriteContract.svelte'

const connector = config.connectors[0]!

test(
  'default',
  testHook(async () => {
    await connect(config, { connector })

    const writeContract = $derived.by(useWriteContract())

    writeContract.writeContract({
      abi: abi.wagmiMintExample,
      address: address.wagmiMintExample,
      functionName: 'mint',
    })
    await expect.poll(() => writeContract.isSuccess).toBeTruthy()

    expect(writeContract.data).toBeDefined()

    await disconnect(config, { connector })
  }),
)

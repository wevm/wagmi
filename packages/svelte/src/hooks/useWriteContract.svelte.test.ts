import { abi, address, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { setups, teardowns, testHook } from '@wagmi/test/svelte'
import { useWriteContract } from './useWriteContract.svelte'

test(
  'default',
  testHook(
    async () => {
      const writeContract = $derived.by(useWriteContract())

      writeContract.writeContract({
        abi: abi.wagmiMintExample,
        address: address.wagmiMintExample,
        functionName: 'mint',
      })
      await expect.poll(() => writeContract.isSuccess).toBeTruthy()

      expect(writeContract.data).toBeDefined()
    },
    {},
    setups.connect,
    teardowns.disconnect,
  ),
)

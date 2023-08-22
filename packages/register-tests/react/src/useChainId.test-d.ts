import { config } from '@wagmi/test'
import { expectTypeOf, test } from 'vitest'
import { useChainId } from 'wagmi'

test('default', async () => {
  const chainId = useChainId()
  expectTypeOf(chainId).toEqualTypeOf<1 | 42220 | 10>()
})

test('parameters: config', async () => {
  const chainId = useChainId({ config })
  expectTypeOf(chainId).toEqualTypeOf<1 | 456 | 10>()
})

import { type GetProofReturnType } from 'viem'
import { expectTypeOf, test } from 'vitest'
import { useProof } from './useProof.js'

test('select data', () => {
  const result = useProof({
    query: {
      select(data) {
        return data
      },
    },
  })
  expectTypeOf(result.data).toEqualTypeOf<GetProofReturnType | undefined>()
})

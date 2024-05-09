import { renderComposable } from '@wagmi/test/vue'
import { expect, test } from 'vitest'
import { watch } from 'vue'
import { useBlockNumber } from './useBlockNumber.js'

test('default', async () => {
  const [blockNumberQuery] = renderComposable(() => useBlockNumber())

  await new Promise<void>((resolve) =>
    watch(blockNumberQuery.status, (status) => {
      if (status === 'success') resolve()
    }),
  )

  expect(blockNumberQuery.data.value).toMatchInlineSnapshot('19258213n')
})

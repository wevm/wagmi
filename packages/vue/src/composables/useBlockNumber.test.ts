import { renderComposable, waitFor } from '@wagmi/test/vue'
import { expect, test } from 'vitest'
import { useBlockNumber } from './useBlockNumber.js'

test('default', async () => {
  const [blockNumberQuery] = renderComposable(() => useBlockNumber())

  await waitFor(blockNumberQuery.status, (status) => status === 'success')

  expect(blockNumberQuery.data.value).toMatchInlineSnapshot('19258213n')
})

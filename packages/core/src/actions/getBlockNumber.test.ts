import { expect, test } from 'vitest'

import { config } from '../../test/index.js'
import { getBlockNumber } from './getBlockNumber.js'

test('default', async () => {
  await expect(getBlockNumber(config)).resolves.toMatchInlineSnapshot(
    '16280770n',
  )
})

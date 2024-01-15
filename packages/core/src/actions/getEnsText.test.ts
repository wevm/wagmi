import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsText } from './getEnsText.js'

test('default', async () => {
  await expect(
    getEnsText(config, {
      name: 'wevm.eth',
      key: 'com.twitter',
    }),
  ).resolves.toMatchInlineSnapshot('"wevm_dev"')
})

import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsAvatar } from './getEnsAvatar.js'

test('default', async () => {
  await expect(
    getEnsAvatar(config, {
      name: 'wevm.eth',
    }),
  ).resolves.toMatchInlineSnapshot('"https://euc.li/wevm.eth"')
})

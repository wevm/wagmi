import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsResolver } from './getEnsResolver.js'

test('default', async () => {
  await expect(
    getEnsResolver(config, {
      name: 'wevm.eth',
    }),
  ).resolves.toMatchInlineSnapshot(
    '"0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41"',
  )
})

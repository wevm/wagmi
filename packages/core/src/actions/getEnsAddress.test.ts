import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsAddress } from './getEnsAddress.js'

test('default', async () => {
  await expect(
    getEnsAddress(config, { name: 'wevm.eth' }),
  ).resolves.toMatchInlineSnapshot(
    '"0xd2135CfB216b74109775236E36d4b433F1DF507B"',
  )
})

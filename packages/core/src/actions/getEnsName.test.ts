import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsName } from './getEnsName.js'

test('default', async () => {
  await expect(
    getEnsName(config, {
      address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
    }),
  ).resolves.toMatchInlineSnapshot('"wevm.eth"')
})

import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getEnsAvatar } from './getEnsAvatar.js'

test('default', async () => {
  await expect(
    getEnsAvatar(config, {
      name: 'wagmi-dev.eth',
    }),
  ).resolves.toMatchInlineSnapshot(
    '"https://ipfs.io/ipfs/Qma8mnp6xV3J2cRNf3mTth5C8nV11CAnceVinc3y8jSbio"',
  )
})

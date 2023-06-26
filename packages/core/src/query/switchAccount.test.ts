import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { switchAccountMutationOptions } from './switchAccount.js'

const connector = config.connectors[0]!

test('default', () => {
  expect(switchAccountMutationOptions(config, { connector })).toMatchObject(
    expect.objectContaining({
      mutationFn: expect.any(Function),
      mutationKey: [
        'switchAccount',
        expect.objectContaining({
          connector: expect.any(Object),
        }),
      ],
    }),
  )
})

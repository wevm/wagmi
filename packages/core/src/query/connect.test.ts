import { config, testChains } from '@wagmi/test'
import { expect, test } from 'vitest'

import { connectMutationOptions } from './connect.js'

const connector = config.connectors[0]!

test('default', () => {
  expect(connectMutationOptions(config, { connector })).toMatchObject(
    expect.objectContaining({
      mutationFn: expect.any(Function),
      mutationKey: [
        'connect',
        expect.objectContaining({
          connector: expect.any(Object),
        }),
      ],
    }),
  )
})

test('parameters: chainId', () => {
  expect(
    connectMutationOptions(config, {
      connector,
      chainId: testChains.anvil.id,
    }),
  ).toMatchObject(
    expect.objectContaining({
      mutationFn: expect.any(Function),
      mutationKey: [
        'connect',
        expect.objectContaining({
          connector: expect.any(Object),
        }),
      ],
    }),
  )
})

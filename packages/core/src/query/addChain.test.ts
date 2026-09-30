import { config } from '@wagmi/test'
import { avalanche } from 'viem/chains'
import { expect, test } from 'vitest'

import { connect } from '../actions/connect.js'
import { disconnect } from '../actions/disconnect.js'
import { addChainMutationOptions } from './addChain.js'

const connector = config.connectors[0]!

test('default', () => {
  expect(addChainMutationOptions(config)).toMatchInlineSnapshot(`
    {
      "mutationFn": [Function],
      "mutationKey": [
        "addChain",
      ],
    }
  `)
})

test('mutationFn', async () => {
  await connect(config, { connector })
  try {
    const options = addChainMutationOptions(config)
    await expect(
      options.mutationFn?.({ chain: avalanche, connector }),
    ).resolves.toBeUndefined()
  } finally {
    await disconnect(config, { connector })
  }
})

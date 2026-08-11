import { config } from '@wagmi/test'
import { avalanche } from 'viem/chains'
import { expect, test } from 'vitest'

import { addChain } from './addChain.js'
import { connect } from './connect.js'
import { disconnect } from './disconnect.js'

const connector = config.connectors[0]!

test('default', async () => {
  await connect(config, { connector })
  await expect(addChain(config, { chain: avalanche })).resolves.toBeUndefined()
  await disconnect(config, { connector })
})

test('no block explorer', async () => {
  await connect(config, { connector })
  await addChain(config, {
    chain: { ...avalanche, blockExplorers: undefined },
  })
  await disconnect(config, { connector })
})

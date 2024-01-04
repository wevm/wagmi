import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { getChainId } from './getChainId.js'

test('default', async () => {
  expect(getChainId(config)).toEqual(chain.mainnet.id)
  config.setState((x) => ({ ...x, chainId: chain.mainnet2.id }))
  expect(getChainId(config)).toEqual(chain.mainnet2.id)
})

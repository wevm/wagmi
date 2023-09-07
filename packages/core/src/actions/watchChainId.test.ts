import { chain, config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { watchChainId } from './watchChainId.js'

test('default', async () => {
  const chainIds: number[] = []
  const unwatch = watchChainId(config, {
    onChange: (chainId) => chainIds.push(chainId),
  })
  config.setState((x) => ({ ...x, chainId: chain.mainnet2.id }))
  config.setState((x) => ({ ...x, chainId: chain.mainnet.id }))
  config.setState((x) => ({ ...x, chainId: 456 }))

  expect(chainIds).toMatchInlineSnapshot(`
      [
        1,
        456,
      ]
    `)

  unwatch()
})

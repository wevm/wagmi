import { http } from 'viem'
import { mainnet, optimism, sepolia } from 'viem/chains'
import { expect, test } from 'vitest'

import { fallback } from '../transports/fallback.js'
import { extractRpcUrls } from './extractRpcUrls.js'

test('default', () => {
  expect(
    extractRpcUrls({
      chain: mainnet,
      transports: {
        [mainnet.id]: fallback([
          http('https://wagmi.com'),
          http('https://lol.com'),
        ]),
        [sepolia.id]: http('https://sepoliarocks.com'),
        [optimism.id]: http(),
      },
    }),
  ).toMatchInlineSnapshot(`
    [
      "https://wagmi.com",
      "https://lol.com",
    ]
  `)

  expect(
    extractRpcUrls({
      chain: sepolia,
      transports: {
        [mainnet.id]: fallback([
          http('https://wagmi.com'),
          http('https://lol.com'),
        ]),
        [sepolia.id]: http('https://sepoliarocks.com'),
        [optimism.id]: http(),
      },
    }),
  ).toMatchInlineSnapshot(`
    [
      "https://sepoliarocks.com",
    ]
  `)

  expect(
    extractRpcUrls({
      chain: optimism,
      transports: {
        [mainnet.id]: fallback([
          http('https://wagmi.com'),
          http('https://lol.com'),
        ]),
        [sepolia.id]: http('https://sepoliarocks.com'),
        [optimism.id]: http(),
      },
    }),
  ).toMatchInlineSnapshot(`
    [
      "https://mainnet.optimism.io",
    ]
  `)

  expect(
    extractRpcUrls({
      chain: mainnet,
    }),
  ).toMatchInlineSnapshot(`
    [
      "https://cloudflare-eth.com",
    ]
  `)
})

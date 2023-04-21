import { rest } from 'msw'
import { setupServer } from 'msw/node'
import type { Mock } from 'vitest'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import type { Chain } from '../chains'
import { arbitrum, mainnet, optimism, polygon } from '../chains'
import { alchemyProvider } from '../providers/alchemy'
import { infuraProvider } from '../providers/infura'
import { jsonRpcProvider } from '../providers/jsonRpc'
import { publicProvider } from '../providers/public'
import { configureChains } from './configureChains'

const avalancheChain: Chain = {
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  id: 43_114,
  name: 'Avalanche',
  network: 'avalanche',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
  },
  testnet: false,
}

const defaultChains = [mainnet, polygon, optimism, arbitrum]
const defaultChainsWithAvalanche = [...defaultChains, avalancheChain]

function getHandlers({
  chains,
  listener,
  rpcUrl,
}: {
  chains: Chain[]
  listener: Mock
  rpcUrl: (chain: Chain) => string
}) {
  const handlers = chains.map((chain) => {
    const url = rpcUrl(chain)
    return rest.post(url, (_req, res, ctx) => {
      listener()
      return res(
        ctx.status(200),
        ctx.json({ jsonrpc: '2.0', id: 42, result: '0xe0e7b1' }),
      )
    })
  })
  return handlers
}

const alchemyApiKey = 'apiKey-alchemy'
const alchemyListener = vi.fn()
const alchemyHandlers = getHandlers({
  chains: defaultChainsWithAvalanche,
  listener: alchemyListener,
  rpcUrl: (chain) => `${chain.rpcUrls.alchemy?.http[0]}/${alchemyApiKey}`,
})

const infuraApiKey = 'apiKey-infura'
const infuraListener = vi.fn()
const infuraHandlers = getHandlers({
  chains: defaultChainsWithAvalanche,
  listener: infuraListener,
  rpcUrl: (chain) => `${chain.rpcUrls.infura?.http[0]}/${infuraApiKey}`,
})

const publicListener = vi.fn()
const publicHandlers = getHandlers({
  chains: defaultChainsWithAvalanche,
  listener: publicListener,
  rpcUrl: (chain) => chain.rpcUrls.default.http[0]!,
})

const jsonRpcListener = vi.fn()
const jsonRpcHandlers = getHandlers({
  chains: defaultChainsWithAvalanche,
  listener: jsonRpcListener,
  rpcUrl: (chain) => `https://${chain.network}.example.com`,
})
const server = setupServer(
  ...alchemyHandlers,
  ...infuraHandlers,
  ...publicHandlers,
  ...jsonRpcHandlers,
)

describe('configureChains', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    alchemyListener.mockClear()
    infuraListener.mockClear()
    publicListener.mockClear()
    jsonRpcListener.mockClear()
  })

  afterAll(() => {
    server.close()
  })

  describe('single provider', () => {
    describe('alchemy', () => {
      const { chains, publicClient } = configureChains(
        defaultChains,
        [alchemyProvider({ apiKey: alchemyApiKey })],
        { rank: false },
      )

      it('populate chains with Alchemy RPC URLs if all chains support Alchemy', async () => {
        expect(chains.map((chain) => chain.rpcUrls.default.http[0]))
          .toMatchInlineSnapshot(`
            [
              "https://eth-mainnet.g.alchemy.com/v2/apiKey-alchemy",
              "https://polygon-mainnet.g.alchemy.com/v2/apiKey-alchemy",
              "https://opt-mainnet.g.alchemy.com/v2/apiKey-alchemy",
              "https://arb-mainnet.g.alchemy.com/v2/apiKey-alchemy",
            ]
          `)
      })

      it('sets provider transport to alchemy', async () => {
        const provider_ = publicClient({ chainId: mainnet.id })
        expect(
          provider_.transport.transports[0]?.value?.url,
        ).toMatchInlineSnapshot(
          '"https://eth-mainnet.g.alchemy.com/v2/apiKey-alchemy"',
        )
      })

      defaultChains.forEach((chain) => {
        it(`configures provider for ${chain.network}`, async () => {
          await publicClient({ chainId: chain.id }).getBlockNumber()
          expect(alchemyListener).toBeCalledTimes(1)
        })
      })

      it('throws an error if Alchemy does not support a chain', () => {
        expect(() =>
          configureChains(
            defaultChainsWithAvalanche,

            [alchemyProvider({ apiKey: alchemyApiKey })],
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "Could not find valid provider configuration for chain \\"Avalanche\\".

          You may need to add \`jsonRpcProvider\` to \`configureChains\` with the chain's RPC URLs.
          Read more: https://wagmi.sh/core/providers/jsonRpc"
        `)
      })
    })

    describe('infura', () => {
      const { chains, publicClient } = configureChains(
        defaultChains,
        [infuraProvider({ apiKey: infuraApiKey })],
        { rank: false },
      )

      it('configures with Infura RPC URL if all chains support Infura', async () => {
        expect(chains.map((chain) => chain.rpcUrls.default.http[0]))
          .toMatchInlineSnapshot(`
            [
              "https://mainnet.infura.io/v3/apiKey-infura",
              "https://polygon-mainnet.infura.io/v3/apiKey-infura",
              "https://optimism-mainnet.infura.io/v3/apiKey-infura",
              "https://arbitrum-mainnet.infura.io/v3/apiKey-infura",
            ]
          `)
      })

      it('sets provider transport to alchemy', async () => {
        const provider_ = publicClient({ chainId: mainnet.id })
        expect(
          provider_.transport.transports[0]?.value?.url,
        ).toMatchInlineSnapshot('"https://mainnet.infura.io/v3/apiKey-infura"')
      })

      defaultChains.forEach((chain) => {
        it(`configures provider for ${chain.network}`, async () => {
          await publicClient({ chainId: chain.id }).getBlockNumber()
          expect(infuraListener).toBeCalledTimes(1)
        })
      })

      it('throws an error if Infura does not support a chain', () => {
        expect(() =>
          configureChains(
            defaultChainsWithAvalanche,

            [infuraProvider({ apiKey: infuraApiKey })],
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "Could not find valid provider configuration for chain \\"Avalanche\\".

          You may need to add \`jsonRpcProvider\` to \`configureChains\` with the chain's RPC URLs.
          Read more: https://wagmi.sh/core/providers/jsonRpc"
        `)
      })
    })

    describe('public', () => {
      const { chains, publicClient } = configureChains(
        defaultChainsWithAvalanche,
        [publicProvider()],
        { rank: false },
      )

      it('configures chains with default RPC URL', async () => {
        expect(chains.map((chain) => chain.rpcUrls.default.http[0]))
          .toMatchInlineSnapshot(`
            [
              "https://cloudflare-eth.com",
              "https://polygon-rpc.com",
              "https://mainnet.optimism.io",
              "https://arb1.arbitrum.io/rpc",
              "https://api.avax.network/ext/bc/C/rpc",
            ]
          `)
      })

      it('sets provider transport to alchemy', async () => {
        const provider_ = publicClient({ chainId: mainnet.id })
        expect(
          provider_.transport.transports[0]?.value?.url,
        ).toMatchInlineSnapshot('"https://cloudflare-eth.com"')
      })

      defaultChainsWithAvalanche.forEach((chain) => {
        it(`configures provider for ${chain.network}`, async () => {
          await publicClient({ chainId: chain.id }).getBlockNumber()
          expect(publicListener).toBeCalledTimes(1)
        })
      })

      it('throws an error if a chain does not have a default RPC URL', () => {
        const polygon_: Chain = {
          ...polygon,
          rpcUrls: { default: { http: [''] }, public: { http: [''] } },
        }

        expect(() =>
          configureChains(
            [mainnet, polygon_, optimism, arbitrum, avalancheChain],

            [publicProvider()],
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "Could not find valid provider configuration for chain \\"Polygon\\".

          You may need to add \`jsonRpcProvider\` to \`configureChains\` with the chain's RPC URLs.
          Read more: https://wagmi.sh/core/providers/jsonRpc"
        `)
      })
    })

    describe('jsonRpc', () => {
      const { chains, publicClient } = configureChains(
        defaultChainsWithAvalanche,
        [
          jsonRpcProvider({
            rpc: (chain) => ({
              http: `https://${chain.network}.example.com`,
            }),
          }),
        ],
        { rank: false },
      )

      it('configure chains with provided RPC URLs for JSON RPC provider', async () => {
        expect(chains.map((chain) => chain.rpcUrls.default.http[0]))
          .toMatchInlineSnapshot(`
            [
              "https://homestead.example.com",
              "https://matic.example.com",
              "https://optimism.example.com",
              "https://arbitrum.example.com",
              "https://avalanche.example.com",
            ]
          `)
      })

      it('sets provider transport to alchemy', async () => {
        const provider_ = publicClient({ chainId: mainnet.id })
        expect(
          provider_.transport.transports[0]?.value?.url,
        ).toMatchInlineSnapshot('"https://homestead.example.com"')
      })

      defaultChainsWithAvalanche.forEach((chain) => {
        it(`configures provider for ${chain.network}`, async () => {
          const { publicClient } = configureChains(
            defaultChainsWithAvalanche,
            [
              jsonRpcProvider({
                rpc: (chain) => ({
                  http: `https://${chain.network}.example.com`,
                }),
              }),
            ],
            { rank: false },
          )
          await publicClient({ chainId: chain.id }).getBlockNumber()
          expect(jsonRpcListener).toBeCalledTimes(1)
        })
      })

      it('throws an error if rpc.http returns empty string for a chain', () => {
        expect(() =>
          configureChains(defaultChainsWithAvalanche, [
            jsonRpcProvider({
              rpc: (chain) => ({
                http:
                  chain.id === 1 ? '' : `https://${chain.network}.example.com`,
                webSocketRpcUrl: `wss://${chain.id}.example.com`,
              }),
            }),
          ]),
        ).toThrowErrorMatchingInlineSnapshot(`
          "Could not find valid provider configuration for chain \\"Ethereum\\".

          You may need to add \`jsonRpcProvider\` to \`configureChains\` with the chain's RPC URLs.
          Read more: https://wagmi.sh/core/providers/jsonRpc"
        `)
      })
    })
  })

  describe('multiple providers', () => {
    const polygon_: Chain = {
      ...polygon,
      rpcUrls: { ...polygon.rpcUrls, alchemy: { http: [''] } },
    }
    const arbitrum_: Chain = {
      ...arbitrum,
      rpcUrls: { ...arbitrum.rpcUrls, alchemy: { http: [''] } },
    }

    const defaultChains: Chain[] = [
      mainnet,
      polygon_,
      optimism,
      arbitrum_,
      avalancheChain,
    ]

    const { chains, publicClient } = configureChains(
      defaultChains,
      [
        alchemyProvider({ apiKey: alchemyApiKey }),
        infuraProvider({ apiKey: infuraApiKey }),
        jsonRpcProvider({
          rpc: (chain) => {
            if (chain.id !== avalancheChain.id) return null
            return { http: chain.rpcUrls.default.http[0]! }
          },
        }),
      ],
      { rank: false },
    )

    it('configures chains with correct fallbacks', async () => {
      expect(chains.map((chain) => chain.rpcUrls.default.http[0]))
        .toMatchInlineSnapshot(`
          [
            "https://eth-mainnet.g.alchemy.com/v2/apiKey-alchemy",
            "https://polygon-mainnet.infura.io/v3/apiKey-infura",
            "https://opt-mainnet.g.alchemy.com/v2/apiKey-alchemy",
            "https://arbitrum-mainnet.infura.io/v3/apiKey-infura",
            "https://api.avax.network/ext/bc/C/rpc",
          ]
        `)
    })

    it('sets provider transports', async () => {
      const provider_ = publicClient({ chainId: mainnet.id })
      expect(
        provider_.transport.transports.map((x) => x.value?.url),
      ).toMatchInlineSnapshot(
        `
        [
          "https://eth-mainnet.g.alchemy.com/v2/apiKey-alchemy",
          "https://mainnet.infura.io/v3/apiKey-infura",
        ]
      `,
      )
    })

    it('configures provider with correct fallback', async () => {
      for (const chain of defaultChains) {
        await publicClient({ chainId: chain.id }).getBlockNumber()
      }
      expect(alchemyListener).toBeCalledTimes(2)
      expect(infuraListener).toBeCalledTimes(2)
      expect(publicListener).toBeCalledTimes(1)
    })

    it('throws an error if none of the providers contain an RPC URL for a chain', () => {
      expect(() =>
        configureChains(
          defaultChainsWithAvalanche,

          [
            alchemyProvider({ apiKey: alchemyApiKey }),
            infuraProvider({ apiKey: infuraApiKey }),
            jsonRpcProvider({
              rpc: (chain) => ({
                http:
                  chain.id === avalancheChain.id
                    ? ''
                    : chain.rpcUrls.default.http[0]!,
              }),
            }),
          ],
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        "Could not find valid provider configuration for chain \\"Avalanche\\".

        You may need to add \`jsonRpcProvider\` to \`configureChains\` with the chain's RPC URLs.
        Read more: https://wagmi.sh/core/providers/jsonRpc"
      `)
    })
  })
})

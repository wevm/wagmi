import { providers } from 'ethers'
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
  },
  testnet: false,
}

const defaultChains = [
  {
    ...mainnet,
    rpcUrls: {
      ...mainnet.rpcUrls,
      alchemy: { http: ['https://eth-mainnet.alchemyapi.io/v2'] },
      default: { http: ['https://eth-mainnet.alchemyapi.io/v2'] },
    },
  },
  polygon,
  optimism,
  arbitrum,
]
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
      const { chains, provider } = configureChains(defaultChains, [
        alchemyProvider({ apiKey: alchemyApiKey }),
      ])

      it('populate chains with Alchemy RPC URLs if all chains support Alchemy', async () => {
        expect(chains.map((chain) => chain.rpcUrls.default.http[0]))
          .toMatchInlineSnapshot(`
            [
              "https://eth-mainnet.alchemyapi.io/v2/apiKey-alchemy",
              "https://polygon-mainnet.g.alchemy.com/v2/apiKey-alchemy",
              "https://opt-mainnet.g.alchemy.com/v2/apiKey-alchemy",
              "https://arb-mainnet.g.alchemy.com/v2/apiKey-alchemy",
            ]
          `)
      })

      it('provides an AlchemyProvider instance to provider', async () => {
        expect(
          provider({ chainId: mainnet.id }) instanceof
            providers.AlchemyProvider,
        ).toBeTruthy()
      })

      defaultChains.forEach((chain) => {
        it(`configures provider for ${chain.network}`, async () => {
          await provider({ chainId: chain.id }).getBlockNumber()
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
          Read more: https://wagmi.sh/react/providers/jsonRpc"
        `)
      })
    })

    describe('infura', () => {
      const { chains, provider } = configureChains(defaultChains, [
        infuraProvider({ apiKey: infuraApiKey }),
      ])

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

      it('provides an InfuraProvider instance to provider', async () => {
        expect(
          provider({ chainId: mainnet.id }) instanceof providers.InfuraProvider,
        ).toBeTruthy()
      })

      defaultChains.forEach((chain) => {
        it(`configures provider for ${chain.network}`, async () => {
          await provider({ chainId: chain.id }).getBlockNumber()
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
          Read more: https://wagmi.sh/react/providers/jsonRpc"
        `)
      })
    })

    describe('public', () => {
      const { chains, provider } = configureChains(defaultChainsWithAvalanche, [
        publicProvider(),
      ])

      it('configures chains with default RPC URL', async () => {
        expect(chains.map((chain) => chain.rpcUrls.default.http[0]))
          .toMatchInlineSnapshot(`
            [
              "https://eth-mainnet.alchemyapi.io/v2",
              "https://polygon-rpc.com",
              "https://mainnet.optimism.io",
              "https://arb1.arbitrum.io/rpc",
              "https://api.avax.network/ext/bc/C/rpc",
            ]
          `)
      })

      it('provides a StaticJsonRpcProvider instance', async () => {
        expect(
          provider({ chainId: mainnet.id }) instanceof
            providers.StaticJsonRpcProvider,
        ).toBeTruthy()
      })

      defaultChainsWithAvalanche.forEach((chain) => {
        it(`configures provider for ${chain.network}`, async () => {
          await provider({ chainId: chain.id }).getBlockNumber()
          expect(publicListener).toBeCalledTimes(1)
        })
      })

      it('throws an error if a chain does not have a default RPC URL', () => {
        const polygon_: Chain = {
          ...polygon,
          rpcUrls: { default: { http: [''] } },
        }

        expect(() =>
          configureChains(
            [mainnet, polygon_, optimism, arbitrum, avalancheChain],

            [publicProvider()],
          ),
        ).toThrowErrorMatchingInlineSnapshot(`
          "Could not find valid provider configuration for chain \\"Polygon\\".

          You may need to add \`jsonRpcProvider\` to \`configureChains\` with the chain's RPC URLs.
          Read more: https://wagmi.sh/react/providers/jsonRpc"
        `)
      })
    })

    describe('jsonRpc', () => {
      const { chains, provider } = configureChains(defaultChainsWithAvalanche, [
        jsonRpcProvider({
          rpc: (chain) => ({
            http: `https://${chain.network}.example.com`,
          }),
        }),
      ])

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

      it('provides a StaticJsonRpcProvider instance', async () => {
        expect(provider({ chainId: mainnet.id }).constructor.name).toEqual(
          'StaticJsonRpcProvider',
        )
      })

      it('provides a JsonRpcProvider instance if `static` option is falsy', async () => {
        const { provider } = configureChains(defaultChainsWithAvalanche, [
          jsonRpcProvider({
            rpc: (chain) => ({
              http: `https://${chain.network}.example.com`,
            }),
            static: false,
          }),
        ])
        expect(provider({ chainId: mainnet.id }).constructor.name).toEqual(
          'JsonRpcProvider',
        )
      })

      defaultChainsWithAvalanche.forEach((chain) => {
        it(`configures provider for ${chain.network}`, async () => {
          const { provider } = configureChains(defaultChainsWithAvalanche, [
            jsonRpcProvider({
              rpc: (chain) => ({
                http: `https://${chain.network}.example.com`,
              }),
            }),
          ])
          await provider({ chainId: chain.id }).getBlockNumber()
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
          Read more: https://wagmi.sh/react/providers/jsonRpc"
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

    const { chains, provider } = configureChains(defaultChains, [
      alchemyProvider({ apiKey: alchemyApiKey }),
      infuraProvider({ apiKey: infuraApiKey }),
      jsonRpcProvider({
        rpc: (chain) => {
          if (chain.id !== avalancheChain.id) return null
          return { http: chain.rpcUrls.default.http[0]! }
        },
      }),
    ])

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

    it('provides a FallbackProvider instance', async () => {
      expect(
        provider({ chainId: mainnet.id }) instanceof providers.FallbackProvider,
      ).toBeTruthy()
    })

    it('configures provider with correct fallback', async () => {
      for (const chain of defaultChains) {
        await provider({ chainId: chain.id }).getBlockNumber()
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
        Read more: https://wagmi.sh/react/providers/jsonRpc"
      `)
    })
  })

  describe('quorum', () => {
    defaultChains.forEach((chain) => {
      describe(`targets the quorum value for ${chain.network}`, () => {
        it('targetQuorum = 1', async () => {
          const { provider } = configureChains(
            defaultChains,
            [
              alchemyProvider({ apiKey: alchemyApiKey }),
              infuraProvider({ apiKey: infuraApiKey }),
              jsonRpcProvider({
                rpc: (chain) => ({
                  http: `https://${chain.network}.example.com`,
                }),
              }),
            ],
            { targetQuorum: 1 },
          )

          await provider({ chainId: chain.id }).getBlockNumber()
          expect(alchemyListener).toBeCalledTimes(1)
          expect(infuraListener).toBeCalledTimes(0)
          expect(jsonRpcListener).toBeCalledTimes(0)
        })

        it('targetQuorum = 2', async () => {
          const { provider } = configureChains(
            defaultChains,
            [
              alchemyProvider({ apiKey: alchemyApiKey }),
              infuraProvider({ apiKey: infuraApiKey }),
              jsonRpcProvider({
                rpc: (chain) => ({
                  http: `https://${chain.network}.example.com`,
                }),
              }),
            ],
            { targetQuorum: 2 },
          )

          await provider({ chainId: chain.id }).getBlockNumber()
          expect(alchemyListener).toBeCalledTimes(1)
          expect(infuraListener).toBeCalledTimes(1)
          expect(jsonRpcListener).toBeCalledTimes(0)
        })

        it('targetQuorum = 3', async () => {
          const { provider } = configureChains(
            defaultChains,
            [
              alchemyProvider({ apiKey: alchemyApiKey }),
              infuraProvider({ apiKey: infuraApiKey }),
              jsonRpcProvider({
                rpc: (chain) => ({
                  http: `https://${chain.network}.example.com`,
                }),
              }),
            ],
            { targetQuorum: 3 },
          )

          await provider({ chainId: chain.id }).getBlockNumber()
          expect(alchemyListener).toBeCalledTimes(1)
          expect(infuraListener).toBeCalledTimes(1)
          expect(jsonRpcListener).toBeCalledTimes(1)
        })
      })

      it(`sets minimum quorum for ${chain.network}`, async () => {
        const { provider } = configureChains(
          defaultChains,
          [
            alchemyProvider({ apiKey: alchemyApiKey }),
            infuraProvider({ apiKey: infuraApiKey }),
            jsonRpcProvider({
              rpc: (chain) => ({
                http: `https://${chain.network}.example.com`,
              }),
            }),
          ],
          { targetQuorum: 2, minQuorum: 2 },
        )

        await provider({ chainId: chain.id }).getBlockNumber()
        expect(alchemyListener).toBeCalledTimes(1)
        expect(infuraListener).toBeCalledTimes(1)
        expect(jsonRpcListener).toBeCalledTimes(0)
      })
    })

    it('throws if minimum quorum is greater than quorum', () => {
      expect(() =>
        configureChains(
          defaultChains,
          [
            alchemyProvider({ apiKey: alchemyApiKey }),
            infuraProvider({ apiKey: infuraApiKey }),
            jsonRpcProvider({
              rpc: (chain) => ({
                http: `https://${chain.network}.example.com`,
              }),
            }),
          ],

          { targetQuorum: 2, minQuorum: 3 },
        ),
      ).toThrowErrorMatchingInlineSnapshot(
        `"quorum cannot be lower than minQuorum"`,
      )
    })

    it('throws if minimum quorum is not met', async () => {
      const { provider } = configureChains(
        defaultChains,
        [
          alchemyProvider({ apiKey: alchemyApiKey }),
          infuraProvider({ apiKey: infuraApiKey }),
          jsonRpcProvider({
            rpc: (chain) => ({
              http: `https://${chain.network}.example.com`,
            }),
          }),
        ],

        { targetQuorum: 4, minQuorum: 4 },
      )

      expect(() =>
        provider({ chainId: mainnet.id }).getBlockNumber(),
      ).toThrowError()
    })
  })

  describe('fallback config', () => {
    it('assigns fallback config passed to configureChains', () => {
      const { provider } = configureChains(
        defaultChains,
        [
          alchemyProvider({
            apiKey: alchemyApiKey,
          }),
          infuraProvider({
            apiKey: infuraApiKey,
          }),
          jsonRpcProvider({
            rpc: (chain) => ({
              http: `https://${chain.network}.example.com`,
            }),
          }),
        ],
        { stallTimeout: 5000 },
      )

      const fallbackProvider = provider({
        chainId: mainnet.id,
      }) as providers.FallbackProvider

      expect(
        fallbackProvider.providerConfigs.map(
          ({ priority, stallTimeout, weight }) => ({
            priority,
            stallTimeout,
            weight,
          }),
        ),
      ).toMatchInlineSnapshot(`
        [
          {
            "priority": 0,
            "stallTimeout": 5000,
            "weight": 1,
          },
          {
            "priority": 1,
            "stallTimeout": 5000,
            "weight": 1,
          },
          {
            "priority": 2,
            "stallTimeout": 5000,
            "weight": 1,
          },
        ]
      `)
    })

    it('assigns fallback config passed to providers', () => {
      const { provider } = configureChains(defaultChains, [
        alchemyProvider({
          apiKey: alchemyApiKey,
          priority: 1,
          stallTimeout: 2000,
          weight: 1,
        }),
        infuraProvider({
          apiKey: infuraApiKey,
          priority: 2,
          stallTimeout: 3000,
          weight: 2,
        }),
        jsonRpcProvider({
          rpc: (chain) => ({
            http: `https://${chain.network}.example.com`,
          }),
          priority: 3,
          stallTimeout: 5000,
          weight: 3,
        }),
      ])

      const fallbackProvider = provider({
        chainId: mainnet.id,
      }) as providers.FallbackProvider

      expect(
        fallbackProvider.providerConfigs.map(
          ({ priority, stallTimeout, weight }) => ({
            priority,
            stallTimeout,
            weight,
          }),
        ),
      ).toMatchInlineSnapshot(`
        [
          {
            "priority": 1,
            "stallTimeout": 2000,
            "weight": 1,
          },
          {
            "priority": 2,
            "stallTimeout": 3000,
            "weight": 2,
          },
          {
            "priority": 3,
            "stallTimeout": 5000,
            "weight": 3,
          },
        ]
      `)
    })
  })
})

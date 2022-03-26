import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { VoidSigner } from 'ethers'
import { chain } from '@wagmi/core'

import {
  actHook,
  getMockConnector,
  getProvider,
  queryClient,
  renderHook,
  setupWagmiClient,
  wrapper,
} from '../../../test'
import { UseAccountArgs, UseAccountConfig, useAccount } from './useAccount'
import { useConnect } from './useConnect'

const useAccountWithConnect = (
  config: { account?: UseAccountArgs & UseAccountConfig } = {},
) => {
  const account = useAccount(config.account)
  const connect = useConnect()
  return { account, connect } as const
}

const handlers = [
  // moxey.eth
  rest.get(
    'https://creature.mypinata.cloud/ipfs/Qmf6aHsrtWqenvcSa8j585yojuGdv3vDccMLpco9PdpS9X/2257',
    (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          name: 'Creature #2257',
          description:
            'Welcome to The Creature World. You have arrived in a nearby magical dimension of love, divine intervention, and possibility. 10,000 unique Creatures are here to guide you on this journey. Follow their lead. Created with love by NYC-based artist Danny Cole. www.creature.world.',
          attributes: [
            {
              trait_type: 'Background',
              value: 'Ascension',
            },
            {
              trait_type: 'Creature',
              value: 'Sand',
            },
            {
              trait_type: 'Decoration',
              value: 'Sand Arneum',
            },
            {
              trait_type: 'Outfit',
              value: 'Oxoto',
            },
            {
              trait_type: 'Eyes',
              value: 'Clementine',
            },
            {
              trait_type: 'Mouth',
              value: 'Happy',
            },
            {
              trait_type: 'Foreground',
              value: 'Rain',
            },
          ],
          image:
            'https://creature.mypinata.cloud/ipfs/QmZ9R2z6bTbrcfrFZ6U1BPsBUsD9aopea88ege78xrNQtV/2257.jpg',
        }),
      ),
  ),
]

const server = setupServer(...handlers)

describe('useAccount', () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest(req) {
        if (req.url.origin !== chain.hardhat.rpcUrls[0])
          console.warn(
            `Found an unhandled ${req.method} request to ${req.url.href}`,
          )
      },
    }),
  )

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  describe('on mount', () => {
    it('not connected', async () => {
      const { result, waitFor } = renderHook(() => useAccount())
      expect(result.current).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "dataUpdatedAt": 0,
          "disconnect": [Function],
          "error": null,
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "isError": false,
          "isFetched": false,
          "isFetchedAfterMount": false,
          "isFetching": true,
          "isIdle": false,
          "isLoading": true,
          "isLoadingError": false,
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isRefetching": false,
          "isStale": true,
          "isSuccess": false,
          "refetch": [Function],
          "remove": [Function],
          "status": "loading",
        }
      `)

      await waitFor(() => result.current.isIdle)

      const { dataUpdatedAt, ...data } = result.current
      expect(dataUpdatedAt).toBeDefined()
      expect(data).toMatchInlineSnapshot(`
        {
          "data": undefined,
          "disconnect": [Function],
          "error": null,
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": true,
          "isLoading": false,
          "isLoadingError": false,
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isRefetching": false,
          "isStale": true,
          "isSuccess": false,
          "refetch": [Function],
          "remove": [Function],
          "status": "idle",
        }
      `)
    })

    it('connected', async () => {
      const { result } = renderHook(() => useAccountWithConnect())

      await actHook(async () => {
        const mockConnector = result.current.connect.connectors[0]
        result.current.connect.connect(mockConnector)
      })

      const { dataUpdatedAt, ...data } = result.current.account
      expect(dataUpdatedAt).toBeDefined()
      expect(data).toMatchInlineSnapshot(`
        {
          "data": {
            "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "connector": "<MockConnector>",
          },
          "disconnect": [Function],
          "error": null,
          "errorUpdatedAt": 0,
          "failureCount": 0,
          "isError": false,
          "isFetched": true,
          "isFetchedAfterMount": true,
          "isFetching": false,
          "isIdle": false,
          "isLoading": false,
          "isLoadingError": false,
          "isPlaceholderData": false,
          "isPreviousData": false,
          "isRefetchError": false,
          "isRefetching": false,
          "isStale": true,
          "isSuccess": true,
          "refetch": [Function],
          "remove": [Function],
          "status": "success",
        }
      `)
    })

    describe('ens', () => {
      it('true', async () => {
        const { result, waitFor } = renderHook(
          () => useAccountWithConnect({ account: { ens: true } }),
          {
            wrapper,
            initialProps: {
              client: setupWagmiClient({
                connectors: [
                  getMockConnector({
                    signer: new VoidSigner(
                      '0xa5cc3c03994db5b0d9a5eedd10cabab0813678ac',
                    ),
                  }),
                ],
                provider: getProvider,
                queryClient,
              }),
            },
          },
        )

        await actHook(async () => {
          const mockConnector = result.current.connect.connectors[0]
          result.current.connect.connect(mockConnector)
        })

        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
            "connector": "<MockConnector>",
          }
        `)

        await waitFor(() => !!result.current.account.data?.ens?.name)
        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
            "connector": "<MockConnector>",
            "ens": {
              "avatar": undefined,
              "name": "moxey.eth",
            },
          }
        `)
        await waitFor(() => !!result.current.account.data?.ens?.avatar)
        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC",
            "connector": "<MockConnector>",
            "ens": {
              "avatar": "https://creature.mypinata.cloud/ipfs/QmZ9R2z6bTbrcfrFZ6U1BPsBUsD9aopea88ege78xrNQtV/2257.jpg",
              "name": "moxey.eth",
            },
          }
        `)
      })

      it('name', async () => {
        const { result, waitFor } = renderHook(
          () => useAccountWithConnect({ account: { ens: { name: true } } }),
          {
            wrapper,
            initialProps: {
              client: setupWagmiClient({
                connectors: [
                  getMockConnector({
                    signer: new VoidSigner(
                      '0xb0623c91c65621df716ab8afe5f66656b21a9108',
                    ),
                  }),
                ],
                provider: getProvider(),
                queryClient,
              }),
            },
          },
        )

        await actHook(async () => {
          const mockConnector = result.current.connect.connectors[0]
          result.current.connect.connect(mockConnector)
        })

        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0xB0623C91c65621df716aB8aFE5f66656B21A9108",
            "connector": "<MockConnector>",
          }
        `)
        await waitFor(() => !!result.current.account.data?.ens?.name)
        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0xB0623C91c65621df716aB8aFE5f66656B21A9108",
            "connector": "<MockConnector>",
            "ens": {
              "avatar": undefined,
              "name": "johnpalmer.eth",
            },
          }
        `)
      })

      it('avatar', async () => {
        const { result, waitFor } = renderHook(
          () => useAccountWithConnect({ account: { ens: { avatar: true } } }),
          {
            wrapper,
            initialProps: {
              client: setupWagmiClient({
                connectors: [
                  getMockConnector({
                    signer: new VoidSigner(
                      '0x0d59d0f7dcc0fbf0a3305ce0261863aaf7ab685c',
                    ),
                  }),
                ],
                provider: getProvider(),
                queryClient,
              }),
            },
          },
        )

        await actHook(async () => {
          const mockConnector = result.current.connect.connectors[0]
          result.current.connect.connect(mockConnector)
        })

        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0x0D59d0f7DcC0fBF0A3305cE0261863aAf7Ab685c",
            "connector": "<MockConnector>",
          }
        `)
        await waitFor(() => !!result.current.account.data?.ens?.avatar)
        expect(result.current.account.data).toMatchInlineSnapshot(`
          {
            "address": "0x0D59d0f7DcC0fBF0A3305cE0261863aAf7Ab685c",
            "connector": "<MockConnector>",
            "ens": {
              "avatar": "https://ipfs.io/ipfs/QmUShgfoZQSHK3TQyuTfUpsc8UfeNfD8KwPUvDBUdZ4nmR",
              "name": undefined,
            },
          }
        `)
      })
    })
  })

  it('disconnects', async () => {
    const { result } = renderHook(() => useAccountWithConnect())

    await actHook(async () => {
      const mockConnector = result.current.connect.connectors[0]
      result.current.connect.connect(mockConnector)
    })

    const { dataUpdatedAt, ...data } = result.current.account
    expect(dataUpdatedAt).toBeDefined()
    expect(data).toMatchInlineSnapshot(`
      {
        "data": {
          "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
          "connector": "<MockConnector>",
          "ens": {
            "avatar": null,
            "name": null,
          },
        },
        "disconnect": [Function],
        "error": null,
        "errorUpdatedAt": 0,
        "failureCount": 0,
        "isError": false,
        "isFetched": true,
        "isFetchedAfterMount": true,
        "isFetching": false,
        "isIdle": false,
        "isLoading": false,
        "isLoadingError": false,
        "isPlaceholderData": false,
        "isPreviousData": false,
        "isRefetchError": false,
        "isRefetching": false,
        "isStale": true,
        "isSuccess": true,
        "refetch": [Function],
        "remove": [Function],
        "status": "success",
      }
    `)

    await actHook(async () => {
      await result.current.account.disconnect()
    })

    const { dataUpdatedAt: dataUpdatedAt2, ...data2 } = result.current.account
    expect(dataUpdatedAt2).toBeDefined()
    expect(data2).toMatchInlineSnapshot(`
      {
        "data": undefined,
        "disconnect": [Function],
        "error": null,
        "errorUpdatedAt": 0,
        "failureCount": 0,
        "isError": false,
        "isFetched": true,
        "isFetchedAfterMount": true,
        "isFetching": false,
        "isIdle": true,
        "isLoading": false,
        "isLoadingError": false,
        "isPlaceholderData": false,
        "isPreviousData": false,
        "isRefetchError": false,
        "isRefetching": false,
        "isStale": true,
        "isSuccess": false,
        "refetch": [Function],
        "remove": [Function],
        "status": "idle",
      }
    `)
  })
})

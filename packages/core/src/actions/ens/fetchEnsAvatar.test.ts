import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest'

import { setupClient } from '../../../test'
import { foundry } from '../../chains'

import { fetchEnsAvatar } from './fetchEnsAvatar'

const handlers = [
  // brantly.eth
  // 0x983110309620d911731ac0932219af06091b6744
  rest.get(
    'https://wrappedpunks.com:3000/api/punks/metadata/2430',
    (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          title: 'W#2430',
          name: 'W#2430',
          description:
            'This Punk was wrapped using Wrapped Punks contract, accessible from https://wrappedpunks.com',
          image: 'https://api.wrappedpunks.com/images/punks/2430.png',
          external_url: 'https://wrappedpunks.com',
        }),
      ),
  ),
  // nick.eth
  // 0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5
  rest.get(
    'https://api.opensea.io/api/v1/metadata/0x495f947276749Ce646f68AC8c248420045cb7b5e/0x11ef687cfeb2e353670479f2dcc76af2bc6b3935000000000002c40000000001',
    (_req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          name: 'Nick Johnson',
          description: null,
          external_link: null,
          image:
            'https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE',
          animation_url: null,
        }),
      ),
  ),
]

const server = setupServer(...handlers)

describe('fetchEnsAvatar', () => {
  beforeAll(() =>
    server.listen({
      onUnhandledRequest(req) {
        if (req.url.origin !== foundry.rpcUrls.default.http[0])
          console.warn(
            `Found an unhandled ${req.method} request to ${req.url.href}`,
          )
      },
    }),
  )

  beforeEach(() => {
    setupClient()
  })

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  describe('args', () => {
    describe('address', () => {
      it('no result', async () => {
        expect(
          await fetchEnsAvatar({
            address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
          }),
        ).toMatchInlineSnapshot(`null`)
      })

      describe('has avatar', () => {
        it('erc1155', async () => {
          expect(
            await fetchEnsAvatar({
              address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
            }),
          ).toMatchInlineSnapshot(
            `"https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE"`,
          )
        })

        it('erc721', async () => {
          expect(
            await fetchEnsAvatar({
              address: '0x983110309620d911731ac0932219af06091b6744',
            }),
          ).toMatchInlineSnapshot(
            `"https://api.wrappedpunks.com/images/punks/2430.png"`,
          )
        })

        it('custom', async () => {
          expect(
            await fetchEnsAvatar({
              address: '0x0d59d0f7dcc0fbf0a3305ce0261863aaf7ab685c',
            }),
          ).toMatchInlineSnapshot(
            `"https://ipfs.io/ipfs/QmUShgfoZQSHK3TQyuTfUpsc8UfeNfD8KwPUvDBUdZ4nmR"`,
          )
        })
      })
    })

    it('chainId', async () => {
      expect(
        await fetchEnsAvatar({
          address: '0xb8c2c29ee19d8307cb7255e1cd9cbde883a267d5',
          chainId: 1,
        }),
      ).toMatchInlineSnapshot(
        `"https://lh3.googleusercontent.com/hKHZTZSTmcznonu8I6xcVZio1IF76fq0XmcxnvUykC-FGuVJ75UPdLDlKJsfgVXH9wOSmkyHw0C39VAYtsGyxT7WNybjQ6s3fM3macE"`,
      )
    })
  })
})

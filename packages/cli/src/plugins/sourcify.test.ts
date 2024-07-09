import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest'

import { depositAbi } from '../../test/constants.js'
import { sourcify } from './sourcify.js'

const baseUrl = 'https://repo.sourcify.dev/contracts/full_match'
const address = '0x00000000219ab540356cbb839cbe05303d7705fa'
const chainId = 1
const multichainAddress = '0xC4c622862a8F548997699bE24EA4bc504e5cA865'
const multichainIdGnosis = 100
const multichainIdPolygon = 137
const successJson = {
  compiler: { version: '0.6.11+commit.5ef660b1' },
  language: 'Solidity',
  output: {
    abi: depositAbi,
    devdoc: {},
    userdoc: {},
  },
  settings: {},
  sources: {},
  version: 1,
}

const handlers = [
  http.get(`${baseUrl}/${chainId}/${address}/metadata.json`, () =>
    HttpResponse.json(successJson),
  ),
  http.get(`${baseUrl}/${multichainIdGnosis}/${address}/metadata.json`, () =>
    HttpResponse.json({}, { status: 404 }),
  ),
  http.get(
    `${baseUrl}/${multichainIdGnosis}/${multichainAddress}/metadata.json`,
    () => HttpResponse.json(successJson),
  ),
  http.get(
    `${baseUrl}/${multichainIdPolygon}/${multichainAddress}/metadata.json`,
    () => HttpResponse.json(successJson),
  ),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('fetches ABI', () => {
  expect(
    sourcify({
      chainId: chainId,
      contracts: [{ name: 'DepositContract', address }],
    }).contracts?.(),
  ).resolves.toMatchSnapshot()
})

test('fetches ABI with multichain deployment', () => {
  expect(
    sourcify({
      chainId: 100,
      contracts: [
        {
          name: 'Community',
          address: { 100: multichainAddress, 137: multichainAddress },
        },
      ],
    }).contracts?.(),
  ).resolves.toMatchSnapshot()
})

test('fails to fetch for unverified contract', () => {
  expect(
    sourcify({
      chainId: 100,
      contracts: [{ name: 'DepositContract', address }],
    }).contracts?.(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    '[Error: Contract not found in Sourcify repository.]',
  )
})

test('missing address for chainId', () => {
  expect(
    sourcify({
      chainId: 1,
      // @ts-expect-error `chainId` and `keyof typeof contracts[number].address` mismatch
      contracts: [{ name: 'DepositContract', address: { 10: address } }],
    }).contracts?.(),
  ).rejects.toThrowErrorMatchingInlineSnapshot(
    `[Error: No address found for chainId "1". Make sure chainId "1" is set as an address.]`,
  )
})

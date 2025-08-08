import { mkdir, writeFile } from 'node:fs/promises'
import { Address as AddressSchema } from 'abitype/zod'
import { camelCase } from 'change-case'
import { join } from 'pathe'
import type { Abi, Address } from 'viem'
import { z } from 'zod'

import type { ContractConfig } from '../config.js'
import { fromZodError } from '../errors.js'
import type { Compute } from '../types.js'
import { fetch, getCacheDir } from './fetch.js'

export type RoutescanConfig<chainId extends number> = {
  /**
   * Routescan API key.
   */
  apiKey: string
  /**
   * Duration in milliseconds to cache ABIs.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number | undefined
  /**
   * Chain ID to use for fetching ABI.
   *
   * If `address` is an object, `chainId` is used to select the address.
   */
  chainId: (chainId extends ChainId ? chainId : never) | (ChainId & {})
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Compute<Omit<ContractConfig<ChainId, chainId>, 'abi'>>[]
  /**
   * Whether to try fetching proxy implementation address of the contract
   *
   * @default false
   */
  tryFetchProxyImplementation?: boolean | undefined
}

/**
 * Fetches contract ABIs from Routescan.
 */
export function routescan<chainId extends ChainId>(
  config: RoutescanConfig<chainId>,
) {
  const {
    apiKey,
    cacheDuration = 1_800_000,
    chainId,
    tryFetchProxyImplementation = false,
  } = config

  const contracts = config.contracts.map((x) => ({
    ...x,
    address:
      typeof x.address === 'string' ? { [chainId]: x.address } : x.address,
  })) as Omit<ContractConfig, 'abi'>[]

  const name = 'Routescan'

  const getCacheKey: Parameters<typeof fetch>[0]['getCacheKey'] = ({
    contract,
  }) => {
    if (typeof contract.address === 'string')
      return `${camelCase(name)}:${contract.address}`
    return `${camelCase(name)}:${JSON.stringify(contract.address)}`
  }

  return fetch({
    cacheDuration,
    contracts,
    name,
    getCacheKey,
    async parse({ response }) {
      const json = await response.json()
      const parsed = await GetAbiResponse.safeParseAsync(json)
      if (!parsed.success)
        throw fromZodError(parsed.error, { prefix: 'Invalid response' })
      if (parsed.data.status === '0') throw new Error(parsed.data.result)
      return parsed.data.result
    },
    async request(contract) {
      if (!contract.address) throw new Error('address is required')

      const resolvedAddress = (() => {
        if (!contract.address) throw new Error('address is required')
        if (typeof contract.address === 'string') return contract.address
        const contractAddress = contract.address[chainId]
        if (!contractAddress)
          throw new Error(
            `No address found for chainId "${chainId}". Make sure chainId "${chainId}" is set as an address.`,
          )
        return contractAddress
      })()

      const options = {
        address: resolvedAddress,
        apiKey,
        chainId,
      }

      let abi: Abi | undefined
      const implementationAddress = await (async () => {
        if (!tryFetchProxyImplementation) return
        const json = await globalThis
          .fetch(buildUrl({ ...options, action: 'getsourcecode' }))
          .then((res) => res.json())
        const parsed = await GetSourceCodeResponse.safeParseAsync(json)
        if (!parsed.success)
          throw fromZodError(parsed.error, { prefix: 'Invalid response' })
        if (parsed.data.status === '0') throw new Error(parsed.data.result)
        if (!parsed.data.result[0]) return
        abi = parsed.data.result[0].ABI
        return parsed.data.result[0].Implementation as Address
      })()

      if (abi) {
        const cacheDir = getCacheDir()
        await mkdir(cacheDir, { recursive: true })
        const cacheKey = getCacheKey({ contract })
        const cacheFilePath = join(cacheDir, `${cacheKey}.json`)
        await writeFile(
          cacheFilePath,
          `${JSON.stringify({ abi, timestamp: Date.now() + cacheDuration }, undefined, 2)}\n`,
        )
      }

      return {
        url: buildUrl({
          ...options,
          action: 'getabi',
          address: implementationAddress || resolvedAddress,
        }),
      }
    },
  })
}

function buildUrl(options: {
  action: 'getabi' | 'getsourcecode'
  address: Address
  apiKey: string
  chainId: ChainId | undefined
}) {
  const { action, address, apiKey, chainId } = options
  const baseUrl = `https://api.routescan.io/v2/network/mainnet/evm/${chainId}/etherscan/api`
  return `${baseUrl}?module=contract&action=${action}&address=${address}${apiKey ? `&apikey=${apiKey}` : ''}`
}

const GetAbiResponse = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('1'),
    message: z.literal('OK'),
    result: z.string().transform((val) => JSON.parse(val) as Abi),
  }),
  z.object({
    status: z.literal('0'),
    message: z.literal('NOTOK'),
    result: z.string(),
  }),
])

const GetSourceCodeResponse = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('1'),
    message: z.literal('OK'),
    result: z.array(
      z.discriminatedUnion('Proxy', [
        z.object({
          ABI: z.string().transform((val) => JSON.parse(val) as Abi),
          Implementation: AddressSchema,
          Proxy: z.literal('1'),
        }),
        z.object({
          ABI: z.string().transform((val) => JSON.parse(val) as Abi),
          Implementation: z.string(),
          Proxy: z.literal('0'),
        }),
      ]),
    ),
  }),
  z.object({
    status: z.literal('0'),
    message: z.literal('NOTOK'),
    result: z.string(),
  }),
])

// Supported chains
type ChainId =
  | 1 // Ethereum
  | 10 // OP Mainnet
  | 14 // Flare Mainnet
  | 19 // Songbird Canary
  | 130 // Unichain
  | 151 // Redbelly
  | 166 // Omni
  | 183 // ERN Scan
  | 185 // Mint
  | 252 // Fraxtal
  | 254 // Swan chain
  | 255 // Kroma
  | 288 // Boba Ethereum
  | 291 // Orderly
  | 303 // WYZth
  | 324 // zkSync Era
  | 357 // Pulsar
  | 369 // Pulse Chain
  | 379 // KOROSHI
  | 480 // World Chain
  | 999 // Hyperliquid EVM
  | 1088 // Metis
  | 1135 // Lisk
  | 1216 // Intersect
  | 1234 // StepNetwork
  | 1344 // Blitz
  | 1853 // HighOctane
  | 1888 // Memoria
  | 1923 // Swell
  | 2044 // Shrapnel
  | 2786 // Apertum
  | 2818 // Morph
  | 3011 // PLAYA3ULL Games
  | 3637 // Botanix
  | 4313 // Artery
  | 4337 // Beam
  | 5000 // Mantle
  | 5040 // Onigiri
  | 5330 // Superseed
  | 5566 // StraitsX
  | 6119 // UPTN
  | 6533 // Kalichain
  | 6900 // Nibiru
  | 7171 // Bitrock
  | 7887 // Kinto
  | 7979 // DOS
  | 8008 // Polynomial
  | 8021 // Numine
  | 8227 // Space
  | 8453 // Base
  | 8787 // Animalia
  | 8888 // XANA-CHAIN
  | 10036 // Innovo
  | 10507 // Numbers
  | 10849 // Lamina1
  | 10850 // Lamina1 Identity
  | 12150 // QChain
  | 13322 // Fifa Blockchain
  | 16180 // Plyr
  | 21024 // Tradex
  | 27827 // Zeroone
  | 28530 // Blockticity
  | 33311 // Feature
  | 34443 // Mode
  | 42069 // Coqnet
  | 42161 // Arbitrum One
  | 43114 // C-Chain
  | 43419 // GUNZ
  | 53935 // DFK
  | 56288 // Boba BNB
  | 57073 // Ink
  | 61587 // Growth
  | 62521 // Lucid
  | 62707 // Teleporter 1
  | 68414 // Henesys
  | 70953 // Teleporter 2
  | 80094 // Berachain
  | 81457 // Blast
  | 84358 // Titan
  | 88888 // Chiliz
  | 96786 // Delaunch
  | 167000 // Taiko
  | 432204 // Dexalot
  | 504441 // Playdapp
  | 710420 // Tiltyard
  | 7777777 // Zora
  | 21000000 // Corn
  | 333000333 // Meld

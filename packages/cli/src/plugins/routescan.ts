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
  | 16 // Coston
  | 19 // Songbird Canary
  | 56 // BNB Smart Chain
  | 114 // Coston2
  | 130 // Unichain
  | 151 // Redbelly
  | 166 // Nomina
  | 185 // Mint
  | 252 // Fraxtal
  | 254 // Swan chain
  | 288 // Boba Ethereum
  | 291 // Orderly
  | 324 // zkSync Era
  | 335 // DFK
  | 357 // Pulsar
  | 369 // Pulse Chain
  | 919 // Mode
  | 1301 // Unichain
  | 1687 // Mint Sepolia
  | 1946 // Minato
  | 2037 // Kiwi
  | 2233 // Chainbase
  | 2522 // Fraxtal
  | 3012 // PLAYA3ULL Games
  | 3636 // Botanix
  | 3939 // DOS
  | 4202 // Lisk
  | 4460 // Orderly
  | 10888 // GameSwift
  | 17000 // Holesky
  | 28882 // Boba Sepolia
  | 48795 // Space
  | 49321 // GUNZ
  | 70800 // Barret
  | 80008 // Polynomial Sepolia
  | 80085 // Artio Testnet
  | 84532 // Base Sepolia
  | 88882 // Chiliz Spicy
  | 167008 // Taiko Katla
  | 167009 // Taiko Hekla
  | 173750 // Echo
  | 421614 // Arbitrum Sepolia
  | 555666 // Eclipse
  | 763373 // Ink
  | 779672 // Dispatch
  | 11155111 // Sepolia
  | 11155420 // OP Sepolia
  | 20241133 // Proxima
  | 21000001 // Corn
  | 168587773 // Blast Sepolia
  | 999999999 // Zora Sepolia
  | 164_4 // Nomina
  | 153_2 // Redbelly
  | 70805_2 // Cloud
  | 378 // Koroshi
  | 379 // KOROSHI
  | 987 // Orange
  | 999 // Hyperliquid EVM
  | 1088 // Metis
  | 1135 // Lisk
  | 1216 // Intersect
  | 1234 // StepNetwork
  | 1344 // Blitz
  | 1853 // HighOctane
  | 1888 // Memoria
  | 1923 // Swell
  | 2038 // Shrapnel
  | 2044 // Shrapnel
  | 2786 // Apertum
  | 2818 // Morph
  | 3011 // PLAYA3ULL Games
  | 3084 // XL Network
  | 3278 // Soshi
  | 3637 // Botanix
  | 4227 // Hashfire
  | 4313 // Artery
  | 4337 // Beam
  | 5000 // Mantle
  | 5039 // Onigiri
  | 5040 // Onigiri
  | 5115 // Citrea
  | 5330 // Superseed
  | 5566 // StraitsX
  | 6119 // UPTN
  | 6533 // Kalichain
  | 6900 // Nibiru
  | 6911 // Nibiru Testnet-2
  | 7894 // Mintus
  | 7979 // DOS
  | 8008 // Polynomial
  | 8021 // Numine
  | 8227 // Space
  | 8453 // Base
  | 8787 // Animalia
  | 9745 // Plasma
  | 10036 // Innovo
  | 10507 // Numbers
  | 10849 // Lamina1
  | 10850 // Lamina1 Identity
  | 11227 // Jiritsutes
  | 12150 // QChain
  | 13322 // Fifa Blockchain
  | 13337 // Beam
  | 13576 // Mythgames
  | 14174 // Pecorino
  | 16180 // Plyr
  | 21024 // Tradex
  | 21816 // Frqtal
  | 24010 // Stealthnet
  | 27827 // Zeroone
  | 28530 // Blockticity
  | 33311 // Feature
  | 34443 // Mode
  | 42161 // Arbitrum One
  | 43113 // C-Chain Fuji
  | 43114 // C-Chain
  | 43419 // GUNZ
  | 47208 // Armada
  | 53188 // DSRV2
  | 53302 // Superseed
  | 53935 // DFK
  | 54414 // Innovomark
  | 55197 // Egmtester
  | 56288 // Boba BNB
  | 56400 // Zeroone
  | 57073 // Ink
  | 59409 // Lifeaiv1
  | 59932 // Insomnia
  | 61587 // Growth
  | 62521 // Lucid
  | 62831 // Plyr
  | 68414 // Henesys
  | 69696 // Ceden
  | 76736 // Hiss
  | 79554 // Lucid
  | 79685 // Modex
  | 80069 // Berachain bepolia
  | 80094 // Berachain
  | 81457 // Blast
  | 84358 // Titan
  | 88888 // Chiliz
  | 96786 // Delaunch
  | 97433 // Growth
  | 124816 // Mitosis
  | 132008 // BitcoinL1
  | 167000 // Taiko
  | 210815 // Stavax
  | 432201 // Dexalot
  | 432204 // Dexalot
  | 560048 // Hoodi
  | 710420 // Tiltyard
  | 723107 // Tixchain
  | 5278000 // JSC Kaigan
  | 7777777 // Zora
  | 21000000 // Corn
  | 420120000 // Alpha 0
  | 420120001 // Alpha 1
  | 420420421 // Westend
  | 9746_5 // Plasma

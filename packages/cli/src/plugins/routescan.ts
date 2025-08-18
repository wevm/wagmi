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
  | 114 // Coston2
  | 130 // Unichain
  | 151 // Redbelly
  | 166 // Omni
  | 183 // ERN Scan
  | 185 // Mint
  | 233 // ERN Scan
  | 252 // Fraxtal
  | 254 // Swan chain
  | 255 // Kroma
  | 288 // Boba Ethereum
  | 291 // Orderly
  | 303 // WYZth
  | 324 // zkSync Era
  | 335 // DFK
  | 357 // Pulsar
  | 369 // Pulse Chain
  | 378 // Koroshi
  | 379 // KOROSHI
  | 392 // Nexus
  | 480 // World Chain
  | 919 // Mode
  | 987 // Orange
  | 999 // Hyperliquid EVM
  | 1088 // Metis
  | 1135 // Lisk
  | 1216 // Intersect
  | 1234 // StepNetwork
  | 1301 // Unichain
  | 1344 // Blitz
  | 1687 // Mint Sepolia
  | 1853 // HighOctane
  | 1888 // Memoria
  | 1923 // Swell
  | 2037 // Kiwi
  | 2038 // Shrapnel
  | 2044 // Shrapnel
  | 2358 // Kroma
  | 2522 // Fraxtal
  | 2786 // Apertum
  | 2818 // Morph
  | 3011 // PLAYA3ULL Games
  | 3012 // PLAYA3ULL Games
  | 3084 // XL Network
  | 3278 // Soshi
  | 3636 // Botanix
  | 3637 // Botanix
  | 3939 // DOS
  | 4202 // Lisk
  | 4227 // Hashfire
  | 4313 // Artery
  | 4337 // Beam
  | 4460 // Orderly
  | 4801 // World Chain
  | 5000 // Mantle
  | 5039 // Onigiri
  | 5040 // Onigiri
  | 5115 // Citrea
  | 5330 // Superseed
  | 5566 // StraitsX
  | 6118 // Uptn
  | 6119 // UPTN
  | 6533 // Kalichain
  | 6900 // Nibiru
  | 6911 // Nibiru Testnet-2
  | 7171 // Bitrock
  | 7210 // Nibiru
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
  | 10880 // BloodLoop
  | 12150 // QChain
  | 13322 // Fifa Blockchain
  | 16180 // Plyr
  | 17000 // Holesky
  | 21024 // Tradex
  | 27827 // Zeroone
  | 28530 // Blockticity
  | 28882 // Boba Sepolia
  | 33311 // Feature
  | 34443 // Mode
  | 42069 // Coqnet
  | 42161 // Arbitrum One
  | 43113 // C-Chain Fuji
  | 43114 // C-Chain
  | 43419 // GUNZ
  | 49321 // GUNZ
  | 53935 // DFK
  | 55551 // Photon
  | 56288 // Boba BNB
  | 57073 // Ink
  | 61587 // Growth
  | 62521 // Lucid
  | 62707 // Teleporter 1
  | 68414 // Henesys
  | 70953 // Teleporter 2
  | 80008 // Polynomial Sepolia
  | 80084 // Bartio Testnet
  | 80085 // Artio Testnet
  | 80094 // Berachain
  | 81457 // Blast
  | 84358 // Titan
  | 84532 // Base Sepolia
  | 88882 // Chiliz Spicy
  | 88888 // Chiliz
  | 96786 // Delaunch
  | 167000 // Taiko
  | 167008 // Taiko Katla
  | 167009 // Taiko Hekla
  | 173750 // Echo
  | 432201 // Dexalot
  | 432204 // Dexalot
  | 504441 // Playdapp
  | 710420 // Tiltyard
  | 779672 // Dispatch
  | 7777777 // Zora
  | 11155111 // Sepolia
  | 11155420 // OP Sepolia
  | 20241133 // Proxima
  | 21000000 // Corn
  | 168587773 // Blast Sepolia
  | 333000333 // Meld
  | 999999999 // Zora Sepolia
  | 164_4 // Omni Omega
  | 1946 // Minato
  | 2233 // Chainbase
  | 153_2 // Redbelly
  | 7222 // Nibiru Devnet
  | 10888 // GameSwift
  | 26659 // Mitosis
  | 421614 // Arbitrum Sepolia
  | 70805_2 // Cloud
  | 7894 // Mintus
  | 11227 // Jiritsutes
  | 13337 // Beam
  | 13576 // Mythgames
  | 21816 // Frqtal
  | 24010 // Stealthnet
  | 47208 // Armada
  | 48795 // Space
  | 53123 // Metasky
  | 53188 // DSRV2
  | 53302 // Superseed
  | 54414 // Innovomark
  | 55197 // Egmtester
  | 56400 // Zeroone
  | 59409 // Lifeaiv1
  | 59932 // Insomnia
  | 62831 // Plyr
  | 69696 // Ceden
  | 70800 // Barret
  | 76736 // Hiss
  | 78170 // MXS Games
  | 79554 // Lucid
  | 79685 // Modex
  | 80069 // Berachain bepolia
  | 97433 // Growth
  | 124832 // Mitosis
  | 132008 // BitcoinL1
  | 210815 // Stavax
  | 555666 // Eclipse
  | 560048 // Hoodi
  | 723107 // Tixchain
  | 763373 // Ink
  | 11155931 // Rise
  | 21000001 // Corn
  | 420120000 // Alpha 0
  | 420120001 // Alpha 1
  | 420420421 // Westend
  | 9746_4 // Plasma
  | 2368 // Kite AI
  | 23944 // CX

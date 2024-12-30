import { camelCase } from 'change-case'
import {
  http,
  type Address,
  createClient,
  isAddress,
  isAddressEqual,
  slice,
  zeroAddress,
} from 'viem'
import { getStorageAt } from 'viem/actions'
import { z } from 'zod'

import type { ContractConfig } from '../config.js'
import { fromZodError } from '../errors.js'
import type { Compute } from '../types.js'
import { fetch } from './fetch.js'

export const rpcUrls = {
  [1]: 'https://cloudflare-eth.com',
  [5]: 'https://rpc.ankr.com/eth_goerli',
  [10]: 'https://mainnet.optimism.io',
  [56]: 'https://rpc.ankr.com/bsc',
  [97]: 'https://data-seed-prebsc-1-s1.bnbchain.org:8545',
  [100]: 'https://rpc.gnosischain.com',
  [128]: undefined,
  [137]: 'https://polygon-rpc.com',
  [250]: 'https://rpc.ankr.com/fantom',
  [252]: 'https://rpc.frax.com',
  [256]: undefined,
  [420]: 'https://goerli.optimism.io',
  [2522]: 'https://rpc.testnet.frax.com',
  [4002]: 'https://rpc.testnet.fantom.network',
  [8453]: 'https://mainnet.base.org',
  [17000]: 'https://ethereum-holesky-rpc.publicnode.com',
  [42161]: 'https://arb1.arbitrum.io/rpc',
  [42220]: 'https://forno.celo.org',
  [43113]: 'https://api.avax-test.network/ext/bc/C/rpc',
  [43114]: 'https://api.avax.network/ext/bc/C/rpc',
  [44787]: 'https://alfajores-forno.celo-testnet.org',
  [80001]: 'https://rpc.ankr.com/polygon_mumbai',
  [81457]: 'https://rpc.blast.io',
  [84532]: 'https://sepolia.base.org',
  [421613]: 'https://goerli-rollup.arbitrum.io/rpc',
  [421614]: 'https://sepolia-rollup.arbitrum.io/rpc',
  [11155111]: 'https://rpc.sepolia.org',
  [11155420]: 'https://sepolia.optimism.io',
}

export type BlockExplorerConfig = {
  /**
   * API key for block explorer. Appended to the request URL as query param `&apikey=${apiKey}`.
   */
  apiKey?: string | undefined
  /**
   * Base URL for block explorer.
   */
  baseUrl: string
  /**
   * Duration in milliseconds to cache ABIs.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number | undefined
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Compute<Omit<ContractConfig, 'abi'>>[]
  /**
   * Function to get address from contract config.
   */
  getAddress?:
    | ((config: {
        address: NonNullable<ContractConfig['address']>
      }) => Address)
    | undefined
  /**
   * Name of source.
   */
  name?: ContractConfig['name'] | undefined
} & (
  | {
      /**
       *  Chain id to use for fetching on-chain info of contract (e.g. implementation address)
       */
      chainId: number
      /**
       *  Whether to try fetching the implementation address of the contract
       */
      tryFetchProxyImplementation: true
    }
  | {
      tryFetchProxyImplementation?: false
    }
)

const BlockExplorerResponse = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('1'),
    message: z.literal('OK'),
    result: z
      .string()
      .transform((val) => JSON.parse(val) as ContractConfig['abi']),
  }),
  z.object({
    status: z.literal('0'),
    message: z.literal('NOTOK'),
    result: z.string(),
  }),
])

/**
 * Fetches contract ABIs from block explorers, supporting `?module=contract&action=getabi` requests.
 */
export function blockExplorer(config: BlockExplorerConfig) {
  const {
    apiKey,
    baseUrl,
    cacheDuration,
    contracts,
    getAddress = ({ address }) => {
      if (typeof address === 'string') return address
      return Object.values(address)[0]!
    },
    name = 'Block Explorer',
  } = config

  return fetch({
    cacheDuration,
    contracts,
    name,
    getCacheKey({ contract }) {
      if (typeof contract.address === 'string')
        return `${camelCase(name)}:${contract.address}`
      return `${camelCase(name)}:${JSON.stringify(contract.address)}`
    },
    async parse({ response }) {
      const json = await response.json()
      const parsed = await BlockExplorerResponse.safeParseAsync(json)
      if (!parsed.success)
        throw fromZodError(parsed.error, { prefix: 'Invalid response' })
      if (parsed.data.status === '0') throw new Error(parsed.data.result)
      return parsed.data.result
    },
    async request({ address }) {
      if (!address) throw new Error('address is required')
      const normalizedAddress = getAddress({ address })
      const makeUrl = (address: Address) =>
        `${baseUrl}?module=contract&action=getabi&address=${address}${apiKey ? `&apikey=${apiKey}` : ''}`

      if (
        'tryFetchProxyImplementation' in config &&
        config.tryFetchProxyImplementation
      ) {
        const implementationAddress = await getImplementationAddress({
          address: normalizedAddress,
          chainId: config.chainId,
        })
        if (implementationAddress) {
          return {
            url: makeUrl(implementationAddress),
          }
        }
      }

      return {
        url: makeUrl(normalizedAddress),
      }
    },
  })
}

async function getImplementationAddress({
  address,
  chainId,
}: { address: Address; chainId: number | undefined }): Promise<
  Address | undefined
> {
  if (!chainId) return undefined

  const rpcUrl: string | undefined = (rpcUrls as any)[chainId]
  if (!rpcUrl) return undefined

  const client = createClient({
    transport: http(rpcUrl),
  })

  // ERC-1967 Implementation Slot
  const implementationSlot =
    '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'
  const implementationSlotContent = await getStorageAt(client, {
    address,
    slot: implementationSlot,
  })

  if (!implementationSlotContent) return undefined

  const implementationAddress = slice(implementationSlotContent, 12)
  if (
    !isAddress(implementationAddress) ||
    isAddressEqual(implementationAddress, zeroAddress)
  )
    return undefined

  return implementationAddress
}

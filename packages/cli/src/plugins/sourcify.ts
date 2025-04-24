import { Abi as AbiSchema } from 'abitype/zod'
import type { Address } from 'viem'
import { z } from 'zod'

import type { ContractConfig } from '../config.js'
import { fromZodError } from '../errors.js'
import type { Compute } from '../types.js'
import { fetch } from './fetch.js'

export type SourcifyConfig<chainId extends number> = {
  /**
   * Duration in milliseconds to cache ABIs.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number | undefined
  /**
   * Chain id to use for fetching ABI.
   *
   * If `address` is an object, `chainId` is used to select the address.
   *
   * See https://docs.sourcify.dev/docs/chains for supported chains.
   */
  chainId: (chainId extends ChainId ? chainId : never) | (ChainId & {})
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Compute<Omit<ContractConfig<ChainId, chainId>, 'abi'>>[]
}

const SourcifyResponse = z.object({
  abi: AbiSchema,
})

/** Fetches contract ABIs from Sourcify. */
export function sourcify<chainId extends ChainId>(
  config: SourcifyConfig<chainId>,
) {
  const { cacheDuration, chainId, contracts: contracts_ } = config

  const contracts = contracts_.map((x) => ({
    ...x,
    address:
      typeof x.address === 'string' ? { [chainId]: x.address } : x.address,
  })) as Omit<ContractConfig, 'abi'>[]

  return fetch({
    cacheDuration,
    contracts,
    async parse({ response }) {
      if (response.status === 404)
        throw new Error('Contract not found in Sourcify repository.')

      const json = await response.json()
      const parsed = await SourcifyResponse.safeParseAsync(json)
      if (!parsed.success)
        throw fromZodError(parsed.error, { prefix: 'Invalid response' })

      if (parsed.data.abi) return parsed.data.abi as ContractConfig['abi']
      throw new Error('contract not found')
    },
    request({ address }) {
      if (!address) throw new Error('address is required')

      let contractAddress: Address | undefined
      if (typeof address === 'string') contractAddress = address
      else if (typeof address === 'object') contractAddress = address[chainId]

      if (!contractAddress)
        throw new Error(
          `No address found for chainId "${chainId}". Make sure chainId "${chainId}" is set as an address.`,
        )
      return {
        url: `https://sourcify.dev/server/v2/contract/${chainId}/${contractAddress}?fields=abi`,
      }
    },
  })
}

// Supported chains
// https://docs.sourcify.dev/docs/chains
type ChainId =
  | 1 // Ethereum Mainnet
  | 17000 // Ethereum Testnet Holesky
  | 5 // Ethereum Testnet Goerli
  | 11155111 // Ethereum Testnet Sepolia
  | 3 // Ethereum Testnet Ropsten
  | 4 // Ethereum Testnet Rinkeby
  | 10 // OP Mainnet
  | 100 // Gnosis
  | 100009 // VeChain
  | 100010 // VeChain Testnet
  | 1001 // Kaia Kairos Testnet
  | 10200 // Gnosis Chiado Testnet
  | 10242 // Arthera Mainnet
  | 10243 // Arthera Testnet
  | 1030 // Conflux eSpace
  | 103090 // Crystaleum
  | 105105 // Stratis Mainnet
  | 106 // Velas EVM Mainnet
  | 10849 // Lamina1
  | 10850 // Lamina1 Identity
  | 1088 // Metis Andromeda Mainnet
  | 1101 // Polygon zkEVM
  | 111000 // Siberium Test Network
  | 11111 // WAGMI
  | 1114 // Core Blockchain Testnet2
  | 1115 // Core Blockchain Testnet
  | 11155420 // OP Sepolia Testnet
  | 1116 // Core Blockchain Mainnet
  | 11235 // Haqq Network
  | 1127469 // Tiltyard Subnet
  | 11297108099 // Palm Testnet
  | 11297108109 // Palm
  | 1149 // Symplexia Smart Chain
  | 122 // Fuse Mainnet
  | 1284 // Moonbeam
  | 1285 // Moonriver
  | 1287 // Moonbase Alpha
  | 12898 // PlayFair Testnet Subnet
  | 1291 // Swisstronik Testnet
  | 1313161554 // Aurora Mainnet
  | 1313161555 // Aurora Testnet
  | 13337 // Beam Testnet
  | 13381 // Phoenix Mainnet
  | 1339 // Elysium Mainnet
  | 137 // Polygon Mainnet
  | 14 // Flare Mainnet
  | 1433 // Rikeza Network Mainnet
  | 1516 // Story Odyssey Testnet
  | 16180 // PLYR PHI
  | 16350 // Incentiv Devnet
  | 167005 // Taiko Grimsvotn L2
  | 167006 // Taiko Eldfell L3
  | 17069 // Garnet Holesky
  | 180 // AME Chain Mainnet
  | 1890 // Lightlink Phoenix Mainnet
  | 1891 // Lightlink Pegasus Testnet
  | 19 // Songbird Canary-Network
  | 19011 // HOME Verse Mainnet
  | 192837465 // Gather Mainnet Network
  | 2000 // Dogechain Mainnet
  | 200810 // Bitlayer Testnet
  | 200901 // Bitlayer Mainnet
  | 2017 // Adiri
  | 2020 // Ronin Mainnet
  | 2021 // Edgeware EdgeEVM Mainnet
  | 202401 // YMTECH-BESU Testnet
  | 2037 // Kiwi Subnet
  | 2038 // Shrapnel Testnet
  | 2044 // Shrapnel Subnet
  | 2047 // Stratos Testnet
  | 2048 // Stratos
  | 205205 // Auroria Testnet
  | 212 // MAPO Makalu
  | 216 // Happychain Testnet
  | 222000222 // Kanazawa
  | 2221 // Kava Testnet
  | 2222 // Kava
  | 223 // B2 Mainnet
  | 22776 // MAP Protocol
  | 23294 // Oasis Sapphire
  | 23295 // Oasis Sapphire Testnet
  | 2358 // Kroma Sepolia
  | 2442 // Polygon zkEVM Cardona Testnet
  | 246 // Energy Web Chain
  | 25 // Cronos Mainnet
  | 250 // Fantom Opera
  | 252 // Fraxtal
  | 2522 // Fraxtal Testnet
  | 255 // Kroma
  | 25925 // KUB Testnet
  | 26100 // Ferrum Quantum Portal Network
  | 28 // Boba Network Rinkeby Testnet
  | 28528 // Optimism Bedrock (Goerli Alpha Testnet)
  | 288 // Boba Network
  | 295 // Hedera Mainnet
  | 30 // Rootstock Mainnet
  | 300 // zkSync Sepolia Testnet
  | 311752642 // OneLedger Mainnet
  | 314 // Filecoin - Mainnet
  | 314159 // Filecoin - Calibration testnet
  | 32769 // Zilliqa EVM
  | 32770 // Zilliqa 2 EVM proto-mainnet
  | 33101 // Zilliqa EVM Testnet
  | 33103 // Zilliqa 2 EVM proto-testnet
  | 33111 // Curtis
  | 333000333 // Meld
  | 335 // DFK Chain Test
  | 336 // Shiden
  | 34443 // Mode
  | 35441 // Q Mainnet
  | 35443 // Q Testnet
  | 356256156 // Gather Testnet Network
  | 369 // PulseChain
  | 3737 // Crossbell
  | 37714555429 // Xai Testnet v2
  | 383414847825 // Zeniq
  | 39797 // Energi Mainnet
  | 40 // Telos EVM Mainnet
  | 4000 // Ozone Chain Mainnet
  | 41 // Telos EVM Testnet
  | 4157 // CrossFi Testnet
  | 420 // Optimism Goerli Testnet
  | 4200 // Merlin Mainnet
  | 420420 // Kekchain
  | 420666 // Kekchain (kektest)
  | 42161 // Arbitrum One
  | 421611 // Arbitrum Rinkeby
  | 421613 // Arbitrum Goerli
  | 4216137055 // OneLedger Testnet Frankenstein
  | 421614 // Arbitrum Sepolia
  | 42170 // Arbitrum Nova
  | 42220 // Celo Mainnet
  | 42261 // Oasis Emerald Testnet
  | 42262 // Oasis Emerald
  | 42766 // ZKFair Mainnet
  | 43 // Darwinia Pangolin Testnet
  | 43113 // Avalanche Fuji Testnet
  | 43114 // Avalanche C-Chain
  | 432201 // Dexalot Subnet Testnet
  | 432204 // Dexalot Subnet
  | 4337 // Beam
  | 44 // Crab Network
  | 44787 // Celo Alfajores Testnet
  | 46 // Darwinia Network
  | 486217935 // Gather Devnet Network
  | 48898 // Zircuit Garfield Testnet
  | 48899 // Zircuit Testnet
  | 48900 // Zircuit Mainnet
  | 49797 // Energi Testnet
  | 50 // XDC Network
  | 5000 // Mantle
  | 5003 // Mantle Sepolia Testnet
  | 51 // XDC Apothem Network
  | 5115 // Citrea Testnet
  | 534 // Candle
  | 534351 // Scroll Sepolia Testnet
  | 534352 // Scroll
  | 53935 // DFK Chain
  | 54211 // Haqq Chain Testnet
  | 56 // BNB Smart Chain Mainnet
  | 560048 // Hoodi testnet
  | 57 // Syscoin Mainnet
  | 570 // Rollux Mainnet
  | 5700 // Syscoin Tanenbaum Testnet
  | 57000 // Rollux Testnet
  | 5845 // Tangle
  | 59141 // Linea Sepolia
  | 59144 // Linea
  | 592 // Astar
  | 59902 // Metis Sepolia Testnet
  | 61 // Ethereum Classic
  | 6119 // UPTN
  | 62320 // Celo Baklava Testnet
  | 62621 // MultiVAC Mainnet
  | 62831 // PLYR TAU Testnet
  | 6321 // Aura Euphoria Testnet
  | 6322 // Aura Mainnet
  | 641230 // Bear Network Chain Mainnet
  | 648 // Endurance Smart Chain Mainnet
  | 660279 // Xai Mainnet
  | 666666666 // Degen Chain
  | 69 // Optimism Kovan
  | 690 // Redstone
  | 7000 // ZetaChain Mainnet
  | 7001 // ZetaChain Testnet
  | 7078815900 // Mekong
  | 710420 // Tiltyard Mainnet Subnet
  | 71401 // Godwoken Testnet v1
  | 71402 // Godwoken Mainnet
  | 7171 // Bitrock Mainnet
  | 7200 // exSat Mainnet
  | 723107 // TixChain Testnet
  | 73799 // Energy Web Volta Testnet
  | 764984 // Lamina1 Testnet
  | 7668 // The Root Network - Mainnet
  | 7672 // The Root Network - Porcini Testnet
  | 767368 // Lamina1 Identity Testnet
  | 77 // POA Network Sokol
  | 7700 // Canto
  | 7701 // Canto Tesnet
  | 7771 // Bitrock Testnet
  | 7777777 // Zora
  | 78430 // Amplify Subnet
  | 78431 // Bulletin Subnet
  | 78432 // Conduit Subnet
  | 8 // Ubiq
  | 80001 // Mumbai
  | 80002 // Amoy
  | 82 // Meter Mainnet
  | 8217 // Kaia Mainnet
  | 83 // Meter Testnet
  | 839999 // exSat Testnet
  | 841 // Taraxa Mainnet
  | 842 // Taraxa Testnet
  | 8453 // Base
  | 84531 // Base Goerli Testnet
  | 84532 // Base Sepolia Testnet
  | 888 // Wanchain
  | 9000 // Evmos Testnet
  | 9001 // Evmos
  | 919 // Mode Testnet
  | 957 // Lyra Chain
  | 96 // KUB Mainnet
  | 97 // BNB Smart Chain Testnet
  | 970 // Oort Mainnet
  | 99 // POA Network Core
  | 9977 // Mind Smart Chain Testnet
  | 999 // Wanchain Testnet
  | 9996 // Mind Smart Chain Mainnet
  | 999999999 // Zora Sepolia Testnet

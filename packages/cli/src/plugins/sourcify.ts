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
  | 560048 // Ethereum Testnet Hoodi
  | 11155111 // Ethereum Testnet Sepolia
  | 17000 // Ethereum Testnet Holesky
  | 5 // Ethereum Testnet Goerli
  | 3 // Ethereum Testnet Ropsten
  | 4 // Ethereum Testnet Rinkeby
  | 96969696 //  Privix Chain Testnet
  | 180 // AME Chain Mainnet
  | 78430 // Amplify Subnet
  | 1339 // Elysium Mainnet
  | 421613 // Arbitrum Goerli
  | 42170 // Arbitrum Nova
  | 42161 // Arbitrum One
  | 421614 // Arbitrum Sepolia
  | 421611 // Arbitrum Rinkeby
  | 10242 // Arthera Mainnet
  | 10243 // Arthera Testnet
  | 592 // Astar
  | 6321 // Aura Euphoria Testnet
  | 6322 // Aura Mainnet
  | 1313161554 // Aurora Mainnet
  | 1313161555 // Aurora Testnet
  | 43114 // Avalanche C-Chain
  | 43113 // Avalanche Fuji Testnet
  | 223 // B2 Mainnet
  | 56 // BNB Smart Chain Mainnet
  | 97 // BNB Smart Chain Testnet
  | 8453 // Base
  | 84531 // Base Goerli Testnet
  | 84532 // Base Sepolia Testnet
  | 4337 // Beam
  | 13337 // Beam Testnet
  | 641230 // Bear Network Chain Mainnet
  | 200901 // Bitlayer Mainnet
  | 200810 // Bitlayer Testnet
  | 7171 // Bitrock Mainnet
  | 7771 // Bitrock Testnet
  | 81457 // Blast
  | 288 // Boba Network
  | 28 // Boba Network Rinkeby Testnet
  | 78431 // Bulletin Subnet
  | 534 // Candle
  | 7700 // Canto
  | 7701 // Canto Tesnet
  | 44787 // Celo Alfajores Testnet
  | 62320 // Celo Baklava Testnet
  | 42220 // Celo Mainnet
  | 11142220 // Celo Sepolia Testnet
  | 5115 // Citrea Testnet
  | 78432 // Conduit Subnet
  | 1030 // Conflux eSpace
  | 1116 // Core Blockchain Mainnet
  | 1115 // Core Blockchain Testnet
  | 1114 // Core Blockchain Testnet2
  | 21000000 // Corn
  | 44 // Crab Network
  | 25 // Cronos Mainnet
  | 4157 // CrossFi Testnet
  | 3737 // Crossbell
  | 103090 // Crystaleum
  | 33111 // Curtis
  | 53935 // DFK Chain
  | 335 // DFK Chain Test
  | 46 // Darwinia Network
  | 43 // Darwinia Pangolin Testnet
  | 666666666 // Degen Chain
  | 432204 // Dexalot Subnet
  | 432201 // Dexalot Subnet Testnet
  | 2000 // Dogechain Mainnet
  | 2021 // Edgeware EdgeEVM Mainnet
  | 648 // Endurance Smart Chain Mainnet
  | 39797 // Energi Mainnet
  | 49797 // Energi Testnet
  | 246 // Energy Web Chain
  | 73799 // Energy Web Volta Testnet
  | 61 // Ethereum Classic
  | 42793 // Etherlink Mainnet
  | 128123 // Etherlink Testnet
  | 9001 // Evmos
  | 9000 // Evmos Testnet
  | 250 // Fantom Opera
  | 26100 // Ferrum Quantum Portal Network
  | 314159 // Filecoin - Calibration testnet
  | 314 // Filecoin - Mainnet
  | 14 // Flare Mainnet
  | 252 // Fraxtal
  | 2522 // Fraxtal Testnet
  | 122 // Fuse Mainnet
  | 17069 // Garnet Holesky
  | 486217935 // Gather Devnet Network
  | 192837465 // Gather Mainnet Network
  | 356256156 // Gather Testnet Network
  | 100 // Gnosis
  | 10200 // Gnosis Chiado Testnet
  | 71402 // Godwoken Mainnet
  | 71401 // Godwoken Testnet v1
  | 19011 // HOME Verse Mainnet
  | 216 // Happychain Testnet
  | 54211 // Haqq Chain Testnet
  | 11235 // Haqq Network
  | 295 // Hedera Mainnet
  | 16350 // Incentiv Devnet
  | 96 // KUB Mainnet
  | 25925 // KUB Testnet
  | 1001 // Kaia Kairos Testnet
  | 8217 // Kaia Mainnet
  | 2222 // Kava
  | 2221 // Kava Testnet
  | 420420 // Kekchain
  | 420666 // Kekchain (kektest)
  | 2037 // Kiwi Subnet
  | 255 // Kroma
  | 2358 // Kroma Sepolia
  | 10849 // Lamina1
  | 10850 // Lamina1 Identity
  | 767368 // Lamina1 Identity Testnet
  | 764984 // Lamina1 Testnet
  | 1891 // Lightlink Pegasus Testnet
  | 1890 // Lightlink Phoenix Mainnet
  | 59144 // Linea
  | 59141 // Linea Sepolia
  | 1135 // Lisk
  | 957 // Lyra Chain
  | 22776 // MAP Protocol
  | 212 // MAPO Makalu
  | 5000 // Mantle
  | 5003 // Mantle Sepolia Testnet
  | 7078815900 // Mekong
  | 333000333 // Meld
  | 222000222 // Kanazawa
  | 4200 // Merlin Mainnet
  | 82 // Meter Mainnet
  | 83 // Meter Testnet
  | 1088 // Metis Andromeda Mainnet
  | 59902 // Metis Sepolia Testnet
  | 31612 // Mezo
  | 9996 // Mind Smart Chain Mainnet
  | 9977 // Mind Smart Chain Testnet
  | 34443 // Mode
  | 919 // Mode Testnet
  | 1287 // Moonbase Alpha
  | 1284 // Moonbeam
  | 1285 // Moonriver
  | 62621 // MultiVAC Mainnet
  | 10 // OP Mainnet
  | 11155420 // OP Sepolia Testnet
  | 42262 // Oasis Emerald
  | 42261 // Oasis Emerald Testnet
  | 23294 // Oasis Sapphire
  | 23295 // Oasis Sapphire Testnet
  | 311752642 // OneLedger Mainnet
  | 4216137055 // OneLedger Testnet Frankenstein
  | 970 // Oort Mainnet
  | 28528 // Optimism Bedrock (Goerli Alpha Testnet)
  | 420 // Optimism Goerli Testnet
  | 69 // Optimism Kovan
  | 4000 // Ozone Chain Mainnet
  | 16180 // PLYR PHI
  | 62831 // PLYR TAU Testnet
  | 99 // POA Network Core
  | 77 // POA Network Sokol
  | 11297108109 // Palm
  | 11297108099 // Palm Testnet
  | 13381 // Phoenix Mainnet
  | 2206132 // PlatON Dev Testnet2
  | 210425 // PlatON Mainnet
  | 12898 // PlayFair Testnet Subnet
  | 80002 // Amoy
  | 137 // Polygon Mainnet
  | 80001 // Mumbai
  | 1101 // Polygon zkEVM
  | 2442 // Polygon zkEVM Cardona Testnet
  | 16969696 // Privix Chain Mainnet
  | 369 // PulseChain
  | 35441 // Q Mainnet
  | 35443 // Q Testnet
  | 690 // Redstone
  | 1433 // Rikeza Network Mainnet
  | 570 // Rollux Mainnet
  | 57000 // Rollux Testnet
  | 2020 // Ronin Mainnet
  | 30 // Rootstock Mainnet
  | 534352 // Scroll
  | 534351 // Scroll Sepolia Testnet
  | 336 // Shiden
  | 2044 // Shrapnel Subnet
  | 2038 // Shrapnel Testnet
  | 111000 // Siberium Test Network
  | 19 // Songbird Canary-Network
  | 1516 // Story Odyssey Testnet
  | 105105 // Stratis Mainnet
  | 205205 // Auroria Testnet
  | 2048 // Stratos
  | 2047 // Stratos Testnet
  | 5330 // Superseed
  | 1291 // Swisstronik Testnet
  | 1149 // Symplexia Smart Chain
  | 57 // Syscoin Mainnet
  | 5700 // Syscoin Tanenbaum Testnet
  | 167000 // Taiko Alethia
  | 167006 // Taiko Eldfell L3
  | 167005 // Taiko Grimsvotn L2
  | 5845 // Tangle
  | 841 // Taraxa Mainnet
  | 842 // Taraxa Testnet
  | 2017 // Adiri
  | 40 // Telos EVM Mainnet
  | 41 // Telos EVM Testnet
  | 7668 // The Root Network - Mainnet
  | 7672 // The Root Network - Porcini Testnet
  | 710420 // Tiltyard Mainnet Subnet
  | 1127469 // Tiltyard Subnet
  | 723107 // TixChain Testnet
  | 6119 // UPTN
  | 8 // Ubiq
  | 130 // Unichain
  | 100009 // VeChain
  | 100010 // VeChain Testnet
  | 106 // Velas EVM Mainnet
  | 11111 // WAGMI
  | 888 // Wanchain
  | 999 // Wanchain Testnet
  | 51 // XDC Apothem Network
  | 50 // XDC Network
  | 660279 // Xai Mainnet
  | 37714555429 // Xai Testnet v2
  | 202401 // YMTECH-BESU Testnet
  | 42766 // ZKFair Mainnet
  | 383414847825 // Zeniq
  | 7000 // ZetaChain Mainnet
  | 7001 // ZetaChain Testnet
  | 32769 // Zilliqa 2
  | 32770 // Zilliqa 2 EVM proto-mainnet
  | 33103 // Zilliqa 2 EVM proto-testnet
  | 33101 // Zilliqa 2 Testnet
  | 48898 // Zircuit Garfield Testnet
  | 48900 // Zircuit Mainnet
  | 48899 // Zircuit Testnet
  | 7777777 // Zora
  | 999999999 // Zora Sepolia Testnet
  | 7200 // exSat Mainnet
  | 839999 // exSat Testnet
  | 3338 // peaq
  | 300 // zkSync Sepolia Testnet

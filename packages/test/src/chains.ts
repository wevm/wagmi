/// <reference types="./vite-env.d.ts" />
import type { Compute } from '@wagmi/core/internal'
import * as chains from 'viem/chains'
import { getRpcUrls } from './utils.js'

export type Chain = Compute<
  chains.Chain & {
    fork: { blockNumber: bigint; url: string }
    port: number
  }
>

const mainnetFork = {
  blockNumber: 23_535_880n,
  url: unwrapEnv('VITE_MAINNET_FORK_URL', 'https://eth.merkle.io'),
} as const satisfies Chain['fork']

export const mainnet = {
  ...chains.mainnet,
  ...getRpcUrls({ port: 8545 }),
  fork: mainnetFork,
} as const satisfies Chain

export const mainnet2 = {
  ...chains.mainnet,
  ...getRpcUrls({ port: 8546 }),
  id: 456,
  nativeCurrency: { decimals: 18, name: 'wagmi', symbol: 'WAG' },
  fork: mainnetFork,
} as const satisfies Chain

export const optimism = {
  ...chains.optimism,
  ...getRpcUrls({ port: 8547 }),
  fork: {
    blockNumber: 107_317_577n,
    url: unwrapEnv('VITE_OPTIMISM_FORK_URL', 'https://mainnet.optimism.io'),
  },
} as const satisfies Chain

export const chain = {
  mainnet,
  mainnet2,
  optimism,
}

function unwrapEnv<
  name extends keyof ImportMetaEnv,
  defaultValue extends NonNullable<ImportMetaEnv[name]> & {},
>(name: name, defaultValue?: defaultValue) {
  const value = (() => {
    // biome-ignore lint/complexity/useOptionalChain: stable
    if (typeof process !== 'undefined' && process.env[name])
      return process.env[name]
    if (typeof import.meta !== 'undefined' && import.meta.env[name])
      return import.meta.env[name]
    return defaultValue
  })()
  if (!value) throw new Error(`missing env var for "${name}"`)
  return value
}

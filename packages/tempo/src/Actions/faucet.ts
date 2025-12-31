import type { Config } from '@wagmi/core'
import type { ChainIdParameter, UnionCompute } from '@wagmi/core/internal'
import { Actions } from 'viem/tempo'

/**
 * Funds an account with an initial amount of set token(s)
 * on Tempo's testnet.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'tempo.ts/wagmi'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const hashes = await Actions.faucet.fund(config, {
 *   account: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hashes.
 */
export async function fund<config extends Config>(
  config: config,
  parameters: fund.Parameters<config>,
): Promise<fund.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.faucet.fund(client, rest)
}

export declare namespace fund {
  export type Parameters<config extends Config> = UnionCompute<
    ChainIdParameter<config> & Actions.faucet.fund.Parameters
  >

  export type ReturnValue = Actions.faucet.fund.ReturnValue
}

/**
 * Funds an account with an initial amount of set token(s)
 * on Tempo's testnet. Returns with the transaction receipts.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from 'viem/chains'
 * import { Actions } from 'tempo.ts/wagmi'
 *
 * const config = createConfig({
 *   chains: [tempoTestnet],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const receipts = await Actions.faucet.fundSync(config, {
 *   account: '0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction hashes.
 */
export async function fundSync<config extends Config>(
  config: config,
  parameters: fundSync.Parameters<config>,
): Promise<fundSync.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.faucet.fundSync(client, rest)
}

export declare namespace fundSync {
  export type Parameters<config extends Config> = UnionCompute<
    ChainIdParameter<config> & Actions.faucet.fundSync.Parameters
  >

  export type ReturnValue = Actions.faucet.fundSync.ReturnValue
}

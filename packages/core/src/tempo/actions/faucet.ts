import type { BaseErrorType } from 'viem'
import { Actions } from 'viem/tempo'
import type { Config } from '../../createConfig.js'
import type { ChainIdParameter } from '../../types/properties.js'
import type { UnionCompute } from '../../types/utils.js'

/**
 * Funds an account with an initial amount of set token(s)
 * on Tempo's testnet.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoModerato],
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

  export type ErrorType = BaseErrorType // TODO: Actions.faucet.fund.ErrorType
}

/**
 * Funds an account with an initial amount of set token(s)
 * on Tempo's testnet. Returns with the transaction receipts.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoModerato],
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

  export type ErrorType = BaseErrorType // TODO: Actions.faucet.fundSync.ErrorType
}

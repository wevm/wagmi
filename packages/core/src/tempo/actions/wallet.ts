import type { Account, Address, BaseErrorType } from 'viem'
import { Actions } from 'viem/tempo'
import {
  type GetConnectorClientErrorType,
  getConnectorClient,
} from '../../actions/getConnectorClient.js'
import type { Config } from '../../createConfig.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../../types/properties.js'
import type { UnionCompute } from '../../types/utils.js'

type AccountParameter = {
  /**
   * Account to use for the connector client. Use `null` to let the wallet infer
   * the account.
   */
  account?: Account | Address | null | undefined
}

/**
 * Opens the wallet send flow with optional pre-filled send fields.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const { receipt } = await Actions.wallet.send(config, {
 *   to: '0x...',
 *   token: '0x...',
 *   value: '1.5',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The submitted send receipt and chain ID.
 */
export async function send<config extends Config>(
  config: config,
  parameters: send.Parameters<config> = {},
): Promise<send.ReturnValue> {
  const { account, chainId, connector, ...rest } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.wallet.send(client, rest)
}

export declare namespace send {
  export type Parameters<config extends Config> = UnionCompute<
    ChainIdParameter<config> &
      ConnectorParameter &
      AccountParameter &
      Actions.wallet.send.Parameters
  >

  export type ReturnValue = Actions.wallet.send.ReturnValue

  export type ErrorType =
    | GetConnectorClientErrorType
    | BaseErrorType
    | Actions.wallet.send.ErrorType
}

/**
 * Opens the wallet swap flow with optional pre-filled swap fields.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempo } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempo],
 *   transports: {
 *     [tempo.id]: http(),
 *   },
 * })
 *
 * const { receipt } = await Actions.wallet.swap(config, {
 *   amount: '1.5',
 *   token: '0x...',
 *   type: 'sell',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The submitted swap receipt.
 */
export async function swap<config extends Config>(
  config: config,
  parameters: swap.Parameters<config> = {},
): Promise<swap.ReturnValue> {
  const { account, chainId, connector, ...rest } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.wallet.swap(client, rest)
}

export declare namespace swap {
  export type Parameters<config extends Config> = UnionCompute<
    ChainIdParameter<config> &
      ConnectorParameter &
      AccountParameter &
      Actions.wallet.swap.Parameters
  >

  export type ReturnValue = Actions.wallet.swap.ReturnValue

  export type ErrorType =
    | GetConnectorClientErrorType
    | BaseErrorType
    | Actions.wallet.swap.ErrorType
}

/**
 * Opens the wallet deposit flow with optional pre-filled deposit fields.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { mainnet } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [mainnet],
 *   transports: {
 *     [mainnet.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.wallet.deposit(config, {
 *   token: '0x...',
 *   value: '1.5',
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Receipts for onchain deposit operations, when applicable.
 */
export async function deposit<config extends Config>(
  config: config,
  parameters: deposit.Parameters<config> = {},
): Promise<deposit.ReturnValue> {
  const { account, chainId, connector, ...rest } = parameters

  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  return Actions.wallet.deposit(client, { ...rest, chainId })
}

export declare namespace deposit {
  export type Parameters<config extends Config> = UnionCompute<
    ChainIdParameter<config> &
      ConnectorParameter &
      AccountParameter &
      Omit<Actions.wallet.deposit.Parameters, 'chainId'>
  >

  export type ReturnValue = Actions.wallet.deposit.ReturnValue

  export type ErrorType =
    | GetConnectorClientErrorType
    | BaseErrorType
    | Actions.wallet.deposit.ErrorType
}

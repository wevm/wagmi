import * as Bytes from 'ox/Bytes'
import * as PublicKey from 'ox/PublicKey'
import * as Secp256k1 from 'ox/Secp256k1'
import { TokenId } from 'ox/tempo'
import {
  type Account,
  type Address,
  encodeAbiParameters,
  encodeFunctionData,
  type Hex,
  zeroHash,
} from 'viem'
import {
  readContract as viem_readContract,
  sendTransaction as viem_sendTransaction,
  sendTransactionSync as viem_sendTransactionSync,
} from 'viem/actions'
import { Abis, Actions } from 'viem/tempo'
import { Abis as ZoneAbis } from 'viem/tempo/zones'
import { parseAccount } from 'viem/utils'
import { getConnectorClient } from '../../actions/getConnectorClient.js'
import type { Config } from '../../createConfig.js'
import type {
  ChainIdParameter,
  ConnectorParameter,
} from '../../types/properties.js'
import type { PartialBy, UnionLooseOmit } from '../../types/utils.js'
import type { QueryOptions, QueryParameter } from './utils.js'
import { filterQueryOptions } from './utils.js'

/**
 * Gets information about the currently stored zone authorization token.
 *
 * @example
 * ```ts
 * import { createConfig } from '@wagmi/core'
 * import { Actions, dangerous_secp256k1 } from '@wagmi/core/tempo'
 * import { Account } from 'viem/tempo'
 * import { http as zoneHttp, zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 * const account = Account.fromSecp256k1('0x...')
 * const config = createConfig({
 *   chains: [zoneChain],
 *   connectors: [dangerous_secp256k1({ account })],
 *   transports: {
 *     [zoneChain.id]: zoneHttp(),
 *   },
 * })
 *
 * await Actions.zone.signAuthorizationToken(config, {
 *   chainId: zoneChain.id,
 * })
 *
 * const info = await Actions.zone.getAuthorizationTokenInfo(config, {
 *   chainId: zoneChain.id,
 * })
 *
 * console.log(info.expiresAt)
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The authorization token info.
 */
export function getAuthorizationTokenInfo<config extends Config>(
  config: config,
  parameters: getAuthorizationTokenInfo.Parameters<config>,
): Promise<getAuthorizationTokenInfo.ReturnValue> {
  const client = config.getClient({ chainId: parameters.chainId })
  return Actions.zone.getAuthorizationTokenInfo(client)
}

export namespace getAuthorizationTokenInfo {
  export type Parameters<config extends Config> = ChainIdParameter<config>

  export type ReturnValue = Actions.zone.getAuthorizationTokenInfo.ReturnType

  export type ErrorType = Actions.zone.getAuthorizationTokenInfo.ErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return [
      'getAuthorizationTokenInfo',
      filterQueryOptions(parameters),
    ] as const
  }

  export type QueryKey<config extends Config> = ReturnType<
    typeof queryKey<config>
  >

  export function queryOptions<config extends Config, selectData = ReturnValue>(
    config: Config,
    parameters: queryOptions.Parameters<config, selectData>,
  ): queryOptions.ReturnValue<config, selectData> {
    const { query, ...rest } = parameters
    return {
      ...query,
      enabled: Boolean(query?.enabled ?? true),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, parameters] = context.queryKey
        return await getAuthorizationTokenInfo(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getAuthorizationTokenInfo.ReturnValue,
    > = getAuthorizationTokenInfo.Parameters<config> &
      QueryParameter<
        getAuthorizationTokenInfo.ReturnValue,
        getAuthorizationTokenInfo.ErrorType,
        selectData,
        getAuthorizationTokenInfo.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getAuthorizationTokenInfo.ReturnValue,
    > = QueryOptions<
      getAuthorizationTokenInfo.ReturnValue,
      getAuthorizationTokenInfo.ErrorType,
      selectData,
      getAuthorizationTokenInfo.QueryKey<config>
    >
  }
}

/**
 * Gets deposit processing status for a Tempo block number.
 *
 * @example
 * ```ts
 * import { createConfig } from '@wagmi/core'
 * import { Actions, dangerous_secp256k1 } from '@wagmi/core/tempo'
 * import { Account } from 'viem/tempo'
 * import { http as zoneHttp, zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 * const account = Account.fromSecp256k1('0x...')
 * const config = createConfig({
 *   chains: [zoneChain],
 *   connectors: [dangerous_secp256k1({ account })],
 *   transports: {
 *     [zoneChain.id]: zoneHttp(),
 *   },
 * })
 *
 * await Actions.zone.signAuthorizationToken(config, {
 *   chainId: zoneChain.id,
 * })
 *
 * const status = await Actions.zone.getDepositStatus(config, {
 *   chainId: zoneChain.id,
 *   tempoBlockNumber: 42n,
 * })
 *
 * console.log(status.processed)
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The deposit status.
 */
export function getDepositStatus<config extends Config>(
  config: config,
  parameters: getDepositStatus.Parameters<config>,
): Promise<getDepositStatus.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.zone.getDepositStatus(client, rest)
}

export namespace getDepositStatus {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.zone.getDepositStatus.Parameters

  export type ReturnValue = Actions.zone.getDepositStatus.ReturnType

  export type ErrorType = Actions.zone.getDepositStatus.ErrorType

  export function queryKey<config extends Config>(
    parameters: PartialBy<Parameters<config>, 'tempoBlockNumber'>,
  ) {
    return ['getDepositStatus', filterQueryOptions(parameters)] as const
  }

  export type QueryKey<config extends Config> = ReturnType<
    typeof queryKey<config>
  >

  export function queryOptions<config extends Config, selectData = ReturnValue>(
    config: Config,
    parameters: queryOptions.Parameters<config, selectData>,
  ): queryOptions.ReturnValue<config, selectData> {
    const { query, ...rest } = parameters
    return {
      ...query,
      enabled: Boolean(
        rest.tempoBlockNumber !== undefined && (query?.enabled ?? true),
      ),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, { tempoBlockNumber, ...parameters }] = context.queryKey
        if (tempoBlockNumber === undefined)
          throw new Error('tempoBlockNumber is required.')
        return await getDepositStatus(config, {
          ...parameters,
          tempoBlockNumber,
        })
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getDepositStatus.ReturnValue,
    > = PartialBy<getDepositStatus.Parameters<config>, 'tempoBlockNumber'> &
      QueryParameter<
        getDepositStatus.ReturnValue,
        getDepositStatus.ErrorType,
        selectData,
        getDepositStatus.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getDepositStatus.ReturnValue,
    > = QueryOptions<
      getDepositStatus.ReturnValue,
      getDepositStatus.ErrorType,
      selectData,
      getDepositStatus.QueryKey<config>
    >
  }
}

/**
 * Gets the withdrawal fee for a given gas limit.
 *
 * @example
 * ```ts
 * import { createConfig } from '@wagmi/core'
 * import { Actions } from '@wagmi/core/tempo'
 * import { http as zoneHttp, zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 * const config = createConfig({
 *   chains: [zoneChain],
 *   transports: {
 *     [zoneChain.id]: zoneHttp(),
 *   },
 * })
 *
 * const fee = await Actions.zone.getWithdrawalFee(config, {
 *   chainId: zoneChain.id,
 *   gas: 21_000n,
 * })
 *
 * console.log(fee)
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The withdrawal fee.
 */
export function getWithdrawalFee<config extends Config>(
  config: config,
  parameters: getWithdrawalFee.Parameters<config>,
): Promise<getWithdrawalFee.ReturnValue> {
  const { chainId, ...rest } = parameters
  const client = config.getClient({ chainId })
  return Actions.zone.getWithdrawalFee(client, rest)
}

export namespace getWithdrawalFee {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    Actions.zone.getWithdrawalFee.Parameters

  export type ReturnValue = Actions.zone.getWithdrawalFee.ReturnType

  export type ErrorType = Actions.zone.getWithdrawalFee.ErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getWithdrawalFee', filterQueryOptions(parameters)] as const
  }

  export type QueryKey<config extends Config> = ReturnType<
    typeof queryKey<config>
  >

  export function queryOptions<config extends Config, selectData = ReturnValue>(
    config: Config,
    parameters: queryOptions.Parameters<config, selectData>,
  ): queryOptions.ReturnValue<config, selectData> {
    const { query, ...rest } = parameters
    return {
      ...query,
      enabled: Boolean(query?.enabled ?? true),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, parameters] = context.queryKey
        return await getWithdrawalFee(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getWithdrawalFee.ReturnValue,
    > = getWithdrawalFee.Parameters<config> &
      QueryParameter<
        getWithdrawalFee.ReturnValue,
        getWithdrawalFee.ErrorType,
        selectData,
        getWithdrawalFee.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getWithdrawalFee.ReturnValue,
    > = QueryOptions<
      getWithdrawalFee.ReturnValue,
      getWithdrawalFee.ErrorType,
      selectData,
      getWithdrawalFee.QueryKey<config>
    >
  }
}

/**
 * Gets the current zone metadata.
 *
 * @example
 * ```ts
 * import { createConfig } from '@wagmi/core'
 * import { Actions } from '@wagmi/core/tempo'
 * import { http as zoneHttp, zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 * const config = createConfig({
 *   chains: [zoneChain],
 *   transports: {
 *     [zoneChain.id]: zoneHttp(),
 *   },
 * })
 *
 * const info = await Actions.zone.getZoneInfo(config, {
 *   chainId: zoneChain.id,
 * })
 *
 * console.log(info.zoneId)
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The zone metadata.
 */
export function getZoneInfo<config extends Config>(
  config: config,
  parameters: getZoneInfo.Parameters<config>,
): Promise<getZoneInfo.ReturnValue> {
  const client = config.getClient({ chainId: parameters.chainId })
  return Actions.zone.getZoneInfo(client)
}

export namespace getZoneInfo {
  export type Parameters<config extends Config> = ChainIdParameter<config>

  export type ReturnValue = Actions.zone.getZoneInfo.ReturnType

  export type ErrorType = Actions.zone.getZoneInfo.ErrorType

  export function queryKey<config extends Config>(
    parameters: Parameters<config>,
  ) {
    return ['getZoneInfo', filterQueryOptions(parameters)] as const
  }

  export type QueryKey<config extends Config> = ReturnType<
    typeof queryKey<config>
  >

  export function queryOptions<config extends Config, selectData = ReturnValue>(
    config: Config,
    parameters: queryOptions.Parameters<config, selectData>,
  ): queryOptions.ReturnValue<config, selectData> {
    const { query, ...rest } = parameters
    return {
      ...query,
      enabled: Boolean(query?.enabled ?? true),
      queryKey: queryKey(rest),
      async queryFn(context) {
        const [, parameters] = context.queryKey
        return await getZoneInfo(config, parameters)
      },
    }
  }

  export declare namespace queryOptions {
    export type Parameters<
      config extends Config,
      selectData = getZoneInfo.ReturnValue,
    > = getZoneInfo.Parameters<config> &
      QueryParameter<
        getZoneInfo.ReturnValue,
        getZoneInfo.ErrorType,
        selectData,
        getZoneInfo.QueryKey<config>
      >

    export type ReturnValue<
      config extends Config,
      selectData = getZoneInfo.ReturnValue,
    > = QueryOptions<
      getZoneInfo.ReturnValue,
      getZoneInfo.ErrorType,
      selectData,
      getZoneInfo.QueryKey<config>
    >
  }
}

/**
 * Signs and stores a zone authorization token for the configured zone transport.
 *
 * @example
 * ```ts
 * import { createConfig } from '@wagmi/core'
 * import { Actions, dangerous_secp256k1 } from '@wagmi/core/tempo'
 * import { Account } from 'viem/tempo'
 * import { http as zoneHttp, zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 * const account = Account.fromSecp256k1('0x...')
 * const config = createConfig({
 *   chains: [zoneChain],
 *   connectors: [dangerous_secp256k1({ account })],
 *   transports: {
 *     [zoneChain.id]: zoneHttp(),
 *   },
 * })
 *
 * const result = await Actions.zone.signAuthorizationToken(config, {
 *   chainId: zoneChain.id,
 * })
 *
 * console.log(result.token)
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The authentication payload and serialized token.
 */
export async function signAuthorizationToken<config extends Config>(
  config: config,
  parameters: signAuthorizationToken.Parameters<config>,
): Promise<signAuthorizationToken.ReturnValue> {
  const { account, chainId, connector, ...rest } = parameters
  const client = await getZoneWalletClient(config, {
    account,
    chainId,
    connector,
  })
  return Actions.zone.signAuthorizationToken(client, rest as never)
}

export declare namespace signAuthorizationToken {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter & {
      account?: Address | Account | undefined
    } & UnionLooseOmit<
      Actions.zone.signAuthorizationToken.Parameters<Account>,
      'account' | 'chain'
    >

  export type ReturnValue = Actions.zone.signAuthorizationToken.ReturnType

  export type ErrorType = Actions.zone.signAuthorizationToken.ErrorType
}

/**
 * Deposits tokens into a zone on the parent Tempo chain.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempoModerato } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoModerato],
 *   transports: {
 *     [tempoModerato.id]: http(),
 *   },
 * })
 *
 * const hash = await Actions.zone.deposit(config, {
 *   amount: 1_000_000n,
 *   token: '0x20c0000000000000000000000000000000000001',
 *   zoneId: 7,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function deposit<config extends Config>(
  config: config,
  parameters: deposit.Parameters<config>,
): Promise<deposit.ReturnValue> {
  const { account, chainId, connector, ...rest } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  const resolvedChainId = chainId ?? client.chain?.id
  if (!resolvedChainId) throw new Error('`chainId` is required.')

  const account_ = account ?? client.account
  if (!account_) throw new Error('`account` is required.')

  const accountAddress = parseAccount(account_).address
  const {
    amount,
    memo = zeroHash,
    recipient = accountAddress,
    token,
    zoneId,
    ...tx
  } = rest
  const { address: portalAddress } = resolvePortal(
    config,
    resolvedChainId,
    zoneId,
  )
  const tokenAddress = TokenId.toAddress(token)

  return viem_sendTransaction(client, {
    ...tx,
    calls: [
      {
        data: encodeFunctionData({
          abi: Abis.tip20,
          functionName: 'approve',
          args: [portalAddress, amount],
        }),
        to: tokenAddress,
      },
      {
        data: encodeFunctionData({
          abi: ZoneAbis.zonePortal,
          functionName: 'deposit',
          args: [tokenAddress, recipient, amount, memo],
        }),
        to: portalAddress,
      },
    ],
  } as never) as never
}

export declare namespace deposit {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.zone.deposit.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.zone.deposit.ReturnValue

  export type ErrorType = Actions.zone.deposit.ErrorType
}

/**
 * Deposits tokens into a zone on the parent Tempo chain.
 *
 * Note: This is a synchronous action that waits for the transaction to
 * be included on a block before returning a response.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempoModerato } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoModerato],
 *   transports: {
 *     [tempoModerato.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.zone.depositSync(config, {
 *   amount: 1_000_000n,
 *   token: '0x20c0000000000000000000000000000000000001',
 *   zoneId: 7,
 * })
 *
 * console.log(result.receipt.transactionHash)
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function depositSync<config extends Config>(
  config: config,
  parameters: depositSync.Parameters<config>,
): Promise<depositSync.ReturnValue> {
  const {
    account,
    chainId,
    connector,
    throwOnReceiptRevert = true,
    ...rest
  } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  const resolvedChainId = chainId ?? client.chain?.id
  if (!resolvedChainId) throw new Error('`chainId` is required.')

  const account_ = account ?? client.account
  if (!account_) throw new Error('`account` is required.')

  const accountAddress = parseAccount(account_).address
  const {
    amount,
    memo = zeroHash,
    recipient = accountAddress,
    token,
    zoneId,
    ...tx
  } = rest
  const { address: portalAddress } = resolvePortal(
    config,
    resolvedChainId,
    zoneId,
  )
  const tokenAddress = TokenId.toAddress(token)

  const receipt = await viem_sendTransactionSync(client, {
    ...tx,
    calls: [
      {
        data: encodeFunctionData({
          abi: Abis.tip20,
          functionName: 'approve',
          args: [portalAddress, amount],
        }),
        to: tokenAddress,
      },
      {
        data: encodeFunctionData({
          abi: ZoneAbis.zonePortal,
          functionName: 'deposit',
          args: [tokenAddress, recipient, amount, memo],
        }),
        to: portalAddress,
      },
    ],
    throwOnReceiptRevert,
  } as never)

  return { receipt }
}

export declare namespace depositSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.zone.depositSync.Parameters<config['chains'][number], Account>,
      'chain'
    >

  export type ReturnValue = Actions.zone.depositSync.ReturnValue

  export type ErrorType = Actions.zone.depositSync.ErrorType
}

/**
 * Deposits tokens into a zone on the parent Tempo chain with an encrypted
 * recipient and memo.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempoModerato } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoModerato],
 *   transports: {
 *     [tempoModerato.id]: http(),
 *   },
 * })
 *
 * const hash = await Actions.zone.encryptedDeposit(config, {
 *   amount: 1_000_000n,
 *   token: '0x20c0000000000000000000000000000000000001',
 *   zoneId: 7,
 * })
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function encryptedDeposit<config extends Config>(
  config: config,
  parameters: encryptedDeposit.Parameters<config>,
): Promise<encryptedDeposit.ReturnValue> {
  const { account, chainId, connector, ...rest } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  const resolvedChainId = chainId ?? client.chain?.id
  if (!resolvedChainId) throw new Error('`chainId` is required.')

  const account_ = account ?? client.account
  if (!account_) throw new Error('`account` is required.')

  const accountAddress = parseAccount(account_).address
  const {
    amount,
    memo,
    recipient = accountAddress,
    token,
    zoneId,
    ...tx
  } = rest
  const portal = resolvePortal(config, resolvedChainId, zoneId)
  const portalAddress = portal.address
  const tokenAddress = TokenId.toAddress(token)
  const [publicKey, keyIndex] =
    portal.sequencerEncryptionKey && portal.encryptionKeyCount !== undefined
      ? [portal.sequencerEncryptionKey, portal.encryptionKeyCount]
      : await Promise.all([
          viem_readContract(client, {
            address: portalAddress,
            abi: ZoneAbis.zonePortal,
            functionName: 'sequencerEncryptionKey',
          }).then(([x, yParity]) => ({ x, yParity: Number(yParity) })),
          viem_readContract(client, {
            address: portalAddress,
            abi: ZoneAbis.zonePortal,
            functionName: 'encryptionKeyCount',
          }),
        ])
  if (keyIndex === 0n)
    throw new Error('No sequencer encryption key configured.')
  const encrypted = await encryptDepositPayload(publicKey, recipient, memo)

  return viem_sendTransaction(client, {
    ...tx,
    calls: [
      {
        data: encodeFunctionData({
          abi: Abis.tip20,
          functionName: 'approve',
          args: [portalAddress, amount],
        }),
        to: tokenAddress,
      },
      {
        data: encodeFunctionData({
          abi: ZoneAbis.zonePortal,
          functionName: 'depositEncrypted',
          args: [tokenAddress, amount, keyIndex - 1n, encrypted],
        }),
        to: portalAddress,
      },
    ],
  } as never) as never
}

export declare namespace encryptedDeposit {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.zone.encryptedDeposit.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.zone.encryptedDeposit.ReturnValue

  export type ErrorType = Actions.zone.encryptedDeposit.ErrorType
}

/**
 * Deposits tokens into a zone on the parent Tempo chain with an encrypted
 * recipient and memo.
 *
 * Note: This is a synchronous action that waits for the transaction to
 * be included on a block before returning a response.
 *
 * @example
 * ```ts
 * import { createConfig, http } from '@wagmi/core'
 * import { tempoModerato } from '@wagmi/core/chains'
 * import { Actions } from '@wagmi/core/tempo'
 *
 * const config = createConfig({
 *   chains: [tempoModerato],
 *   transports: {
 *     [tempoModerato.id]: http(),
 *   },
 * })
 *
 * const result = await Actions.zone.encryptedDepositSync(config, {
 *   amount: 1_000_000n,
 *   token: '0x20c0000000000000000000000000000000000001',
 *   zoneId: 7,
 * })
 *
 * console.log(result.receipt.transactionHash)
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function encryptedDepositSync<config extends Config>(
  config: config,
  parameters: encryptedDepositSync.Parameters<config>,
): Promise<encryptedDepositSync.ReturnValue> {
  const {
    account,
    chainId,
    connector,
    throwOnReceiptRevert = true,
    ...rest
  } = parameters
  const client = await getConnectorClient(config, {
    account,
    assertChainId: false,
    chainId,
    connector,
  })

  const resolvedChainId = chainId ?? client.chain?.id
  if (!resolvedChainId) throw new Error('`chainId` is required.')

  const account_ = account ?? client.account
  if (!account_) throw new Error('`account` is required.')

  const accountAddress = parseAccount(account_).address
  const {
    amount,
    memo,
    recipient = accountAddress,
    token,
    zoneId,
    ...tx
  } = rest
  const portal = resolvePortal(config, resolvedChainId, zoneId)
  const portalAddress = portal.address
  const tokenAddress = TokenId.toAddress(token)
  const [publicKey, keyIndex] =
    portal.sequencerEncryptionKey && portal.encryptionKeyCount !== undefined
      ? [portal.sequencerEncryptionKey, portal.encryptionKeyCount]
      : await Promise.all([
          viem_readContract(client, {
            address: portalAddress,
            abi: ZoneAbis.zonePortal,
            functionName: 'sequencerEncryptionKey',
          }).then(([x, yParity]) => ({ x, yParity: Number(yParity) })),
          viem_readContract(client, {
            address: portalAddress,
            abi: ZoneAbis.zonePortal,
            functionName: 'encryptionKeyCount',
          }),
        ])
  if (keyIndex === 0n)
    throw new Error('No sequencer encryption key configured.')
  const encrypted = await encryptDepositPayload(publicKey, recipient, memo)

  const receipt = await viem_sendTransactionSync(client, {
    ...tx,
    calls: [
      {
        data: encodeFunctionData({
          abi: Abis.tip20,
          functionName: 'approve',
          args: [portalAddress, amount],
        }),
        to: tokenAddress,
      },
      {
        data: encodeFunctionData({
          abi: ZoneAbis.zonePortal,
          functionName: 'depositEncrypted',
          args: [tokenAddress, amount, keyIndex - 1n, encrypted],
        }),
        to: portalAddress,
      },
    ],
    throwOnReceiptRevert,
  } as never)

  return { receipt }
}

export declare namespace encryptedDepositSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.zone.encryptedDepositSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.zone.encryptedDepositSync.ReturnValue

  export type ErrorType = Actions.zone.encryptedDepositSync.ErrorType
}

/**
 * Requests a withdrawal from a zone to the parent Tempo chain.
 *
 * @example
 * ```ts
 * import { createConfig } from '@wagmi/core'
 * import { Actions, dangerous_secp256k1 } from '@wagmi/core/tempo'
 * import { Account } from 'viem/tempo'
 * import { http as zoneHttp, zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 * const account = Account.fromSecp256k1('0x...')
 * const config = createConfig({
 *   chains: [zoneChain],
 *   connectors: [dangerous_secp256k1({ account })],
 *   transports: {
 *     [zoneChain.id]: zoneHttp(),
 *   },
 * })
 *
 * const hash = await Actions.zone.requestWithdrawal(config, {
 *   amount: 1_000_000n,
 *   chainId: zoneChain.id,
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 *
 * console.log(hash)
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function requestWithdrawal<config extends Config>(
  config: config,
  parameters: requestWithdrawal.Parameters<config>,
): Promise<requestWithdrawal.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getZoneWalletClient(config, {
    account,
    chainId,
    connector,
  })
  return Actions.zone.requestWithdrawal(client, parameters as never)
}

export declare namespace requestWithdrawal {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.zone.requestWithdrawal.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.zone.requestWithdrawal.ReturnValue

  export type ErrorType = Actions.zone.requestWithdrawal.ErrorType
}

/**
 * Requests a withdrawal from a zone to the parent Tempo chain.
 *
 * Note: This is a synchronous action that waits for the transaction to
 * be included on a block before returning a response.
 *
 * @example
 * ```ts
 * import { createConfig } from '@wagmi/core'
 * import { Actions, dangerous_secp256k1 } from '@wagmi/core/tempo'
 * import { Account } from 'viem/tempo'
 * import { http as zoneHttp, zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 * const account = Account.fromSecp256k1('0x...')
 * const config = createConfig({
 *   chains: [zoneChain],
 *   connectors: [dangerous_secp256k1({ account })],
 *   transports: {
 *     [zoneChain.id]: zoneHttp(),
 *   },
 * })
 *
 * const result = await Actions.zone.requestWithdrawalSync(config, {
 *   amount: 1_000_000n,
 *   chainId: zoneChain.id,
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 *
 * console.log(result.receipt.transactionHash)
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function requestWithdrawalSync<config extends Config>(
  config: config,
  parameters: requestWithdrawalSync.Parameters<config>,
): Promise<requestWithdrawalSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getZoneWalletClient(config, {
    account,
    chainId,
    connector,
  })
  return Actions.zone.requestWithdrawalSync(client, parameters as never)
}

export declare namespace requestWithdrawalSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.zone.requestWithdrawalSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.zone.requestWithdrawalSync.ReturnValue

  export type ErrorType = Actions.zone.requestWithdrawalSync.ErrorType
}

/**
 * Requests a verifiable withdrawal from a zone to the parent Tempo chain.
 *
 * @example
 * ```ts
 * import { createConfig } from '@wagmi/core'
 * import { Actions, dangerous_secp256k1 } from '@wagmi/core/tempo'
 * import { Account } from 'viem/tempo'
 * import { http as zoneHttp, zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 * const account = Account.fromSecp256k1('0x...')
 * const config = createConfig({
 *   chains: [zoneChain],
 *   connectors: [dangerous_secp256k1({ account })],
 *   transports: {
 *     [zoneChain.id]: zoneHttp(),
 *   },
 * })
 *
 * const hash = await Actions.zone.requestVerifiableWithdrawal(config, {
 *   amount: 1_000_000n,
 *   chainId: zoneChain.id,
 *   revealTo:
 *     '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 *
 * console.log(hash)
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns Transaction hash.
 */
export async function requestVerifiableWithdrawal<config extends Config>(
  config: config,
  parameters: requestVerifiableWithdrawal.Parameters<config>,
): Promise<requestVerifiableWithdrawal.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getZoneWalletClient(config, {
    account,
    chainId,
    connector,
  })
  return Actions.zone.requestVerifiableWithdrawal(client, parameters as never)
}

export declare namespace requestVerifiableWithdrawal {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.zone.requestVerifiableWithdrawal.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue = Actions.zone.requestVerifiableWithdrawal.ReturnValue

  export type ErrorType = Actions.zone.requestVerifiableWithdrawal.ErrorType
}

/**
 * Requests a verifiable withdrawal from a zone to the parent Tempo chain.
 *
 * Note: This is a synchronous action that waits for the transaction to
 * be included on a block before returning a response.
 *
 * @example
 * ```ts
 * import { createConfig } from '@wagmi/core'
 * import { Actions, dangerous_secp256k1 } from '@wagmi/core/tempo'
 * import { Account } from 'viem/tempo'
 * import { http as zoneHttp, zone } from 'viem/tempo/zones'
 *
 * const zoneChain = zone(7)
 * const account = Account.fromSecp256k1('0x...')
 * const config = createConfig({
 *   chains: [zoneChain],
 *   connectors: [dangerous_secp256k1({ account })],
 *   transports: {
 *     [zoneChain.id]: zoneHttp(),
 *   },
 * })
 *
 * const result = await Actions.zone.requestVerifiableWithdrawalSync(config, {
 *   amount: 1_000_000n,
 *   chainId: zoneChain.id,
 *   revealTo:
 *     '0x0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
 *   token: '0x20c0000000000000000000000000000000000001',
 * })
 *
 * console.log(result.receipt.transactionHash)
 * ```
 *
 * @param config - Config.
 * @param parameters - Parameters.
 * @returns The transaction receipt.
 */
export async function requestVerifiableWithdrawalSync<config extends Config>(
  config: config,
  parameters: requestVerifiableWithdrawalSync.Parameters<config>,
): Promise<requestVerifiableWithdrawalSync.ReturnValue> {
  const { account, chainId, connector } = parameters
  const client = await getZoneWalletClient(config, {
    account,
    chainId,
    connector,
  })
  return Actions.zone.requestVerifiableWithdrawalSync(
    client,
    parameters as never,
  )
}

export declare namespace requestVerifiableWithdrawalSync {
  export type Parameters<config extends Config> = ChainIdParameter<config> &
    ConnectorParameter &
    UnionLooseOmit<
      Actions.zone.requestVerifiableWithdrawalSync.Parameters<
        config['chains'][number],
        Account
      >,
      'chain'
    >

  export type ReturnValue =
    Actions.zone.requestVerifiableWithdrawalSync.ReturnValue

  export type ErrorType = Actions.zone.requestVerifiableWithdrawalSync.ErrorType
}

const portalAddresses = {
  42431: {
    6: '0x7069DeC4E64Fd07334A0933eDe836C17259c9B23',
    7: '0x3F5296303400B56271b476F5A0B9cBF74350D6Ac',
  },
} as const satisfies Record<number, Record<number, Address>>

async function getZoneWalletClient<config extends Config>(
  config: config,
  parameters: {
    account?: Address | Account | null | undefined
    chainId?: number | undefined
    connector?: ConnectorParameter['connector']
  },
) {
  const client = await getConnectorClient(config, {
    ...parameters,
    assertChainId: false,
  })
  const resolvedChainId = parameters.chainId ?? client.chain?.id
  const account =
    resolveSignableAccount(parameters.account) ??
    (await getSignableConnectorAccount(config, {
      account: parameters.account ?? client.account,
      chainId: resolvedChainId,
      connector: parameters.connector,
    }))
  if (!account || resolvedChainId === undefined) return client

  // Local accounts can sign against the zone transport directly without
  // depending on the connector provider's currently selected chain.
  return Object.assign(config.getClient({ chainId: resolvedChainId }), {
    account,
  }) as typeof client
}

async function getSignableConnectorAccount<config extends Config>(
  config: config,
  parameters: {
    account?: Address | Account | null | undefined
    chainId?: number | undefined
    connector?: ConnectorParameter['connector']
  },
) {
  const connector =
    parameters.connector ??
    config.state.connections.get(config.state.current!)?.connector
  const provider = (await connector?.getProvider?.({
    chainId: parameters.chainId,
  })) as
    | {
        getAccount?:
          | ((parameters?: {
              address?: Address | undefined
              signable?: boolean | undefined
            }) => Account | undefined)
          | undefined
      }
    | undefined
  if (typeof provider?.getAccount !== 'function') return

  try {
    return provider.getAccount({
      address: parameters.account
        ? parseAccount(parameters.account).address
        : undefined,
      signable: true,
    })
  } catch {
    return
  }
}

function resolveSignableAccount(
  account?: Address | Account | null | undefined,
) {
  if (typeof account !== 'object' || account === null) return
  return 'sign' in account ? account : undefined
}

function resolvePortal<config extends Config>(
  config: config,
  chainId: number,
  zoneId: number,
): {
  address: Address
  encryptionKeyCount?: bigint | undefined
  sequencerEncryptionKey?: { x: Hex; yParity: number } | undefined
} {
  const chain = config.chains.find((chain) => chain.id === chainId)
  const zonePortal = chain?.contracts?.zonePortal as
    | Address
    | {
        [key: number]:
          | Address
          | {
              address?: Address | undefined
              encryptionKeyCount?: bigint | undefined
              sequencerEncryptionKey?: { x: Hex; yParity: number } | undefined
            }
          | undefined
        address?: Address | undefined
        encryptionKeyCount?: bigint | undefined
        sequencerEncryptionKey?: { x: Hex; yParity: number } | undefined
      }
    | undefined

  // Allow custom chains to supply portal addresses until viem exposes a
  // generic resolver for non-hardcoded Tempo networks.
  if (typeof zonePortal === 'string') return { address: zonePortal }
  if (zonePortal && typeof zonePortal === 'object') {
    const portal =
      'address' in zonePortal && typeof zonePortal.address === 'string'
        ? zonePortal
        : zonePortal[zoneId]

    if (typeof portal === 'string') return { address: portal as Address }
    if (
      portal &&
      typeof portal === 'object' &&
      typeof portal.address === 'string'
    ) {
      return {
        address: portal.address,
        encryptionKeyCount: portal.encryptionKeyCount,
        sequencerEncryptionKey: portal.sequencerEncryptionKey,
      }
    }
  }

  const address = (portalAddresses as Record<number, Record<number, Address>>)[
    chainId
  ]?.[zoneId]
  if (address) return { address }

  throw new Error(
    `No portal address configured for zone ${zoneId} on chain ${chainId}.`,
  )
}

async function encryptDepositPayload(
  publicKey: { x: Hex; yParity: number },
  recipient: Address,
  memo: Hex = zeroHash,
): Promise<{
  ciphertext: Hex
  ephemeralPubkeyX: Hex
  ephemeralPubkeyYParity: number
  nonce: Hex
  tag: Hex
}> {
  const sequencerPublicKey = PublicKey.from({
    prefix: publicKey.yParity,
    x: BigInt(publicKey.x),
  })

  const { privateKey: ephemeralPrivateKey, publicKey: ephemeralPublicKey } =
    Secp256k1.createKeyPair()

  const sharedSecret = Secp256k1.getSharedSecret({
    privateKey: ephemeralPrivateKey,
    publicKey: sequencerPublicKey,
    as: 'Bytes',
  })

  const hkdfKey = await globalThis.crypto.subtle.importKey(
    'raw',
    sharedSecret.buffer as ArrayBuffer,
    'HKDF',
    false,
    ['deriveKey'],
  )
  const aesKey = await globalThis.crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: new Uint8Array(12),
      info: new TextEncoder().encode('ecies-aes-key'),
    },
    hkdfKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt'],
  )

  const nonce = Bytes.random(12)
  const plaintext = encodeAbiParameters(
    [{ type: 'address' }, { type: 'bytes32' }],
    [recipient, memo],
  )
  const ciphertextWithTag = new Uint8Array(
    await globalThis.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: nonce as BufferSource, tagLength: 128 },
      aesKey,
      Bytes.from(plaintext) as BufferSource,
    ),
  )
  const ciphertext = ciphertextWithTag.slice(0, -16)
  const tag = ciphertextWithTag.slice(-16)
  const compressedEphemeral = PublicKey.compress(ephemeralPublicKey)

  return {
    ciphertext: bytesToHex(ciphertext),
    ephemeralPubkeyX: `0x${compressedEphemeral.x.toString(16).padStart(64, '0')}`,
    ephemeralPubkeyYParity: compressedEphemeral.prefix,
    nonce: bytesToHex(nonce),
    tag: bytesToHex(tag),
  }
}

function bytesToHex(bytes: Uint8Array): Hex {
  return `0x${Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('')}` as Hex
}

import type {
  Address,
  ResourceUnavailableRpcErrorType,
  UserRejectedRequestErrorType,
} from 'viem'
import { createSiweMessage } from 'viem/siwe'
import { numberToHex } from 'viem/utils'

import { getAddress } from 'viem'
import type { CreateConnectorFn } from '../connectors/createConnector.js'
import type { Config, Connector } from '../createConfig.js'
import type { BaseErrorType, ErrorType } from '../errors/base.js'
import {
  ConnectorAlreadyConnectedError,
  type ConnectorAlreadyConnectedErrorType,
} from '../errors/config.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute } from '../types/utils.js'
import { signMessage } from './signMessage.js'

export type ConnectCapabilities = {
  signInWithEthereum?: {
    /** SIWE nonce for authentication */
    nonce: string
    /** Chain ID */
    chainId: number
    /** SIWE version */
    version?: string
    /** URI scheme */
    scheme?: string
    /** Domain requesting authentication */
    domain?: string
    /** URI for the SIWE message */
    uri?: string
    /** Human-readable statement */
    statement?: string
    /** ISO 8601 datetime when the message was issued */
    issuedAt?: string
    /** ISO 8601 datetime when the message expires */
    expirationTime?: string
    /** ISO 8601 datetime when the message becomes valid */
    notBefore?: string
    /** Request identifier */
    requestId?: string
    /** List of resources */
    resources?: string[]
  }
}

export type ConnectParameters<
  config extends Config = Config,
  connector extends Connector | CreateConnectorFn =
    | Connector
    | CreateConnectorFn,
  ///
  parameters extends unknown | undefined =
    | (connector extends CreateConnectorFn
        ? Omit<
            NonNullable<Parameters<ReturnType<connector>['connect']>[0]>,
            'isReconnecting'
          >
        : never)
    | (connector extends Connector
        ? Omit<
            NonNullable<Parameters<connector['connect']>[0]>,
            'isReconnecting'
          >
        : never),
> = Compute<
  ChainIdParameter<config> & {
    connector: connector | CreateConnectorFn
    capabilities?: ConnectCapabilities | undefined
  }
> &
  parameters

export type ConnectReturnType<config extends Config = Config> = {
  accounts: readonly [Address, ...Address[]]
  chainId:
    | config['chains'][number]['id']
    | (number extends config['chains'][number]['id'] ? number : number & {})
  capabilities?: {
    signInWithEthereum?: {
      signature: string
      message: string
    }
  }
}

export type ConnectErrorType =
  | ConnectorAlreadyConnectedErrorType
  // connector.connect()
  | UserRejectedRequestErrorType
  | ResourceUnavailableRpcErrorType
  // base
  | BaseErrorType
  | ErrorType

/** https://wagmi.sh/core/api/actions/connect */
export async function connect<
  config extends Config,
  connector extends Connector | CreateConnectorFn,
>(
  config: config,
  parameters: ConnectParameters<config, connector>,
): Promise<ConnectReturnType<config>> {
  // "Register" connector if not already created
  let connector: Connector
  if (typeof parameters.connector === 'function') {
    connector = config._internal.connectors.setup(parameters.connector)
  } else connector = parameters.connector

  // Check if connector is already connected
  if (connector.uid === config.state.current)
    throw new ConnectorAlreadyConnectedError()

  try {
    config.setState((x) => ({ ...x, status: 'connecting' }))
    connector.emitter.emit('message', { type: 'connecting' })

    const { connector: _, capabilities, ...rest } = parameters

    let resultCapabilities: ConnectReturnType<config>['capabilities']

    // First try wallet_connect with SIWE capabilities if nonce is provided
    const siweConfig = capabilities?.signInWithEthereum
    if (siweConfig?.nonce) {
      try {
        const provider = await connector.getProvider()

        const connectResult = await (provider as any).request({
          method: 'wallet_connect',
          params: [
            {
              version: '1.0',
              capabilities: {
                signInWithEthereum: {
                  ...siweConfig,
                  chainId: numberToHex(siweConfig.chainId),
                },
              },
            },
          ],
        })

        // If wallet_connect succeeded with SIWE
        if (connectResult?.accounts?.[0]?.capabilities?.signInWithEthereum) {
          const siweData =
            connectResult.accounts[0].capabilities.signInWithEthereum
          resultCapabilities = {
            signInWithEthereum: {
              signature: siweData.signature,
              message: siweData.message,
            },
          }

          // Return early with the wallet_connect result
          const accounts = connectResult.accounts.map((acc: any) =>
            getAddress(acc.address || acc),
          ) as readonly [Address, ...Address[]]

          // Get the chain ID from the SIWE config or provider
          const currentChainId =
            siweConfig.chainId ||
            parameters.chainId ||
            (await connector.getChainId()) ||
            config.chains[0].id

          connector.emitter.off('connect', config._internal.events.connect)
          connector.emitter.on('change', config._internal.events.change)
          connector.emitter.on('disconnect', config._internal.events.disconnect)

          await config.storage?.setItem('recentConnectorId', connector.id)
          config.setState((x) => ({
            ...x,
            connections: new Map(x.connections).set(connector.uid, {
              accounts,
              chainId: currentChainId,
              connector: connector,
            }),
            current: connector.uid,
            status: 'connected',
          }))

          return {
            accounts,
            chainId: currentChainId,
            capabilities: resultCapabilities,
          }
        }
      } catch (walletConnectError) {
        // wallet_connect failed, continue with fallback
        void walletConnectError // Acknowledge error for linter
      }
    }

    // Connect normally
    const data = await connector.connect(rest)
    const accounts = data.accounts as readonly [Address, ...Address[]]

    // If no capabilities yet and nonce is provided, create and sign SIWE message
    if (!resultCapabilities && siweConfig?.nonce) {
      try {
        const address = accounts[0]
        const chainId = siweConfig.chainId || parameters.chainId || data.chainId

        // Create SIWE message
        const message = createSiweMessage({
          address,
          chainId,
          domain:
            siweConfig.domain ||
            (typeof window !== 'undefined' ? window.location.host : 'app'),
          nonce: siweConfig.nonce,
          uri:
            siweConfig.uri ||
            (typeof window !== 'undefined' ? window.location.href : ''),
          version: (siweConfig.version || '1') as '1',
          statement: siweConfig.statement,
          issuedAt: siweConfig.issuedAt
            ? new Date(siweConfig.issuedAt)
            : undefined,
          expirationTime: siweConfig.expirationTime
            ? new Date(siweConfig.expirationTime)
            : undefined,
          notBefore: siweConfig.notBefore
            ? new Date(siweConfig.notBefore)
            : undefined,
          requestId: siweConfig.requestId,
          resources: siweConfig.resources,
          scheme: siweConfig.scheme,
        })

        // Sign the message
        const signature = await signMessage(config, {
          connector,
          message,
        })

        resultCapabilities = {
          signInWithEthereum: {
            signature,
            message,
          },
        }
      } catch (signError) {
        // Signing failed, continue without capabilities
        void signError // Acknowledge error for linter
      }
    }

    connector.emitter.off('connect', config._internal.events.connect)
    connector.emitter.on('change', config._internal.events.change)
    connector.emitter.on('disconnect', config._internal.events.disconnect)

    await config.storage?.setItem('recentConnectorId', connector.id)
    config.setState((x) => ({
      ...x,
      connections: new Map(x.connections).set(connector.uid, {
        accounts,
        chainId: data.chainId,
        connector: connector,
      }),
      current: connector.uid,
      status: 'connected',
    }))

    return {
      accounts,
      chainId: data.chainId,
      ...(resultCapabilities ? { capabilities: resultCapabilities } : {}),
    }
  } catch (error) {
    config.setState((x) => ({
      ...x,
      // Keep existing connector connected in case of error
      status: x.current ? 'connected' : 'disconnected',
    }))
    throw error
  }
}

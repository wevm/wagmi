import {
  SupportedProviders,
  loadConnectKit,
} from '@ledgerhq/connect-kit-loader'
import type {
  EthereumProvider,
  LedgerConnectKit,
} from '@ledgerhq/connect-kit-loader'
import { providers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'

import type { ProviderRpcError, RpcError } from '../errors'
import { UserRejectedRequestError } from '../errors'
import type { Chain } from '../types'
import { normalizeChainId } from '../utils'
import type { ConnectorData } from './base'
import { Connector } from './base'

type LedgerConnectorOptions = {
  chainId?: number
  bridge?: string
  infuraId?: string
  rpc?: { [chainId: number]: string }

  enableDebugLogs?: boolean
}

type LedgerSigner = providers.JsonRpcSigner

export class LedgerConnector extends Connector<
  EthereumProvider,
  LedgerConnectorOptions,
  LedgerSigner
> {
  readonly id = 'ledger'
  readonly name = 'Ledger'
  readonly ready = true

  private connectKitPromise: Promise<LedgerConnectKit>
  private provider?: EthereumProvider

  constructor({
    chains,
    options = { enableDebugLogs: false },
  }: {
    chains?: Chain[]
    options?: LedgerConnectorOptions
  } = {}) {
    super({ chains, options })

    this.connectKitPromise = loadConnectKit()
  }

  async connect(): Promise<Required<ConnectorData>> {
    try {
      const connectKit = await this.connectKitPromise

      if (this.options.enableDebugLogs) {
        connectKit.enableDebugLogs()
      }

      connectKit.checkSupport({
        providerType: SupportedProviders.Ethereum,
        chainId: this.options.chainId,
        infuraId: this.options.infuraId,
        rpc: this.options.rpc,
      })

      const provider = await this.getProvider()

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged)
        provider.on('chainChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect)
      }

      this.emit('message', { type: 'connecting' })

      const account = await this.getAccount()
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)

      return {
        account,
        chain: { id, unsupported },
        provider: new providers.Web3Provider(
          provider as providers.ExternalProvider,
        ),
      }
    } catch (error) {
      if ((error as ProviderRpcError).code === 4001) {
        throw new UserRejectedRequestError(error)
      }
      if ((error as RpcError).code === -32002) {
        throw error instanceof Error ? error : new Error(String(error))
      }

      throw error
    }
  }

  async disconnect() {
    const provider = await this.getProvider()

    if (provider?.disconnect) {
      await provider.disconnect()
    }

    if (provider?.removeListener) {
      provider.removeListener('accountsChanged', this.onAccountsChanged)
      provider.removeListener('chainChanged', this.onChainChanged)
      provider.removeListener('disconnect', this.onDisconnect)
    }
  }

  async getAccount() {
    const provider = await this.getProvider()
    const accounts = (await provider.request({
      method: 'eth_requestAccounts',
    })) as string[]
    const account = getAddress(accounts[0] as string)

    return account
  }

  async getChainId() {
    const provider = await this.getProvider()
    const chainId = (await provider.request({
      method: 'eth_chainId',
    })) as number

    return normalizeChainId(chainId)
  }

  async getProvider() {
    if (!this.provider) {
      const connectKit = await this.connectKitPromise
      this.provider = (await connectKit.getProvider()) as EthereumProvider
    }
    return this.provider
  }

  async getSigner() {
    const [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
    ])
    return new providers.Web3Provider(
      provider as providers.ExternalProvider,
    ).getSigner(account)
  }

  async isAuthorized() {
    try {
      const provider = await this.getProvider()
      const accounts = (await provider.request({
        method: 'eth_accounts',
      })) as string[]
      const account = accounts[0]
      return !!account
    } catch {
      return false
    }
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0] as string) })
  }

  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect = () => {
    this.emit('disconnect')
  }
}

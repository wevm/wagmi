// eslint-disable-next-line import/no-named-as-default
import UniversalProvider, {
  NamespaceConfig,
} from '@walletconnect/universal-provider'
import { providers } from 'ethers'
import { getAddress, hexValue } from 'ethers/lib/utils'

import { getClient } from '../client'
import {
  ProviderRpcError,
  SwitchChainError,
  UserRejectedRequestError,
} from '../errors'
import { Chain } from '../types'
import { normalizeChainId } from '../utils'
import { Connector } from './base'

/**
 * Config for the WalletConnect Sign Client
 */
const defaults = {
  namespace: 'eip155',
  methods: [
    'eth_sendTransaction',
    'eth_signTransaction',
    'eth_sign',
    'personal_sign',
    'eth_signTypedData',
  ],
  events: ['chainChanged', 'accountsChanged'],
}

type WalletConnectOptions = ConstructorParameters<typeof UniversalProvider>[0]

type WalletConnectSigner = providers.JsonRpcSigner

export class WalletConnectConnectorV2 extends Connector<
  UniversalProvider,
  WalletConnectOptions,
  WalletConnectSigner
> {
  readonly id = 'walletConnectV2'
  readonly name = 'WalletConnectV2'
  readonly ready = true

  #provider?: UniversalProvider

  constructor(config: { chains?: Chain[]; options: WalletConnectOptions }) {
    super(config)
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      let targetChainId = chainId
      if (!targetChainId) {
        const lastUsedChainId = getClient().lastUsedChainId
        if (lastUsedChainId && !this.isChainUnsupported(lastUsedChainId))
          targetChainId = lastUsedChainId
      }

      const provider = await this.getProvider({
        chainId: targetChainId,
        create: true,
      })

      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)
      provider.on('session_delete', this.onDisconnect)
      provider.on('display_uri', this.#onUri)

      await provider.connect({
        namespaces: this.#getConfig(),
      })

      // Defer message to the next tick to ensure wallet connect data (provided by `.enable()`) is available
      setTimeout(() => this.emit('message', { type: 'connecting' }), 0)

      const accounts = await provider.enable()
      const account = getAddress(<string>accounts[0])
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)

      // in v2 chain switching is allowed programatically
      // as the user approves the chains when approving the pairing
      this.switchChain = this.#switchChain

      return {
        account,
        chain: { id, unsupported },
        provider: new providers.Web3Provider(
          <providers.ExternalProvider>provider,
        ),
      }
    } catch (error) {
      if (/user closed modal/i.test((<ProviderRpcError>error).message))
        throw new UserRejectedRequestError(error)
      throw error
    }
  }

  async disconnect() {
    const provider = await this.getProvider()
    await provider.disconnect()

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
    provider.removeListener('session_delete', this.onDisconnect)
    provider.removeListener('display_uri', this.#onUri)
  }

  async getAccount() {
    const provider = await this.getProvider()
    // const accounts = provider.accounts
    const accounts = await provider.enable()
    // return checksum address
    return getAddress(<string>accounts[0])
  }

  async getChainId() {
    const provider = await this.getProvider()
    const chainId = normalizeChainId(
      await provider.request({ method: 'eth_chainId' }),
    )
    return chainId
  }

  async getProvider({
    chainId,
    create,
  }: { chainId?: number; create?: boolean } = {}) {
    // Force create new provider
    if (!this.#provider || chainId || create) {
      const WalletConnectProvider = (
        await import('@walletconnect/universal-provider')
      ).default

      if (!this.options.projectId) {
        throw new Error(
          'Please get a WalletConnect v2 projectID from https://cloud.walletconnect.com/',
        )
      }

      this.#provider = await WalletConnectProvider.init({
        ...this.options,
      })

      if (chainId) {
        this.#provider.setDefaultChain(`${defaults.namespace}:${chainId}`)
      }
    }
    return this.#provider
  }

  async getSigner({ chainId }: { chainId?: number } = {}) {
    const [provider, account] = await Promise.all([
      this.getProvider({ chainId }),
      this.getAccount(),
    ])
    return new providers.Web3Provider(
      <providers.ExternalProvider>provider,
    ).getSigner(account)
  }

  async isAuthorized() {
    try {
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
    }
  }

  async #switchChain(chainId: number) {
    const provider = await this.getProvider()
    const id = hexValue(chainId)

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: id }],
      })

      return (
        this.chains.find((x) => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          rpcUrls: { default: '' },
        }
      )
    } catch (error) {
      const message =
        typeof error === 'string' ? error : (<ProviderRpcError>error)?.message
      if (/user rejected request/i.test(message))
        throw new UserRejectedRequestError(error)
      throw new SwitchChainError(error)
    }
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(<string>accounts[0]) })
  }

  protected onChainChanged = (chainId: number | string) => {
    const id = normalizeChainId(chainId)
    const unsupported = this.isChainUnsupported(id)
    this.emit('change', { chain: { id, unsupported } })
  }

  protected onDisconnect = () => {
    this.emit('disconnect')
  }

  #onUri = (uri: string) => {
    this.emit('message', { type: 'display_uri', data: uri })
  }

  #getConfig = (): NamespaceConfig => {
    return {
      [defaults.namespace]: {
        methods: defaults.methods,
        events: defaults.events,
        chains: this.chains.map((chain) => `${defaults.namespace}:${chain.id}`),
        rpcMap: this.chains.reduce(
          (rpc, chain) => ({ ...rpc, [chain.id]: chain.rpcUrls.default }),
          {},
        ),
      },
    }
  }
}

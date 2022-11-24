import WalletConnectProvider from '@walletconnect/ethereum-provider'
// eslint-disable-next-line import/no-named-as-default
import Modal from '@walletconnect/qrcode-modal'
// eslint-disable-next-line import/no-named-as-default
import type { NamespaceConfig } from '@walletconnect/universal-provider'
import type UniversalProvider from '@walletconnect/universal-provider'
import { providers } from 'ethers'
import { getAddress, hexValue } from 'ethers/lib/utils.js'

import { getClient } from '../client'
import type { ProviderRpcError } from '../errors'
import { SwitchChainError, UserRejectedRequestError } from '../errors'
import type { Chain } from '../types'
import { normalizeChainId } from '../utils'
import { Connector } from './base'

/**
 * Wallets that support chain switching through WalletConnect
 * - imToken (token.im)
 * - MetaMask (metamask.io)
 * - Rainbow (rainbow.me)
 * - Trust Wallet (trustwallet.com)
 */
const switchChainAllowedRegex = /(imtoken|metamask|rainbow|trust wallet)/i

/**
 * Config for the WalletConnect Sign Client
 */
const v2Config = {
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

type WalletConnectV1Options = ConstructorParameters<
  typeof WalletConnectProvider
>[0]
type WalletConnectV2Options = ConstructorParameters<typeof UniversalProvider>[0]
type WalletConnectCustomOptions = {
  version?: '1' | '2'
  qrcode?: true | false
}
type WalletConnectOptions = WalletConnectV1Options &
  WalletConnectV2Options &
  WalletConnectCustomOptions
type WalletConnectSigner = providers.JsonRpcSigner

export class WalletConnectConnector extends Connector<
  WalletConnectProvider | UniversalProvider,
  WalletConnectOptions,
  WalletConnectSigner
> {
  readonly id = 'walletConnect'
  readonly name = 'WalletConnect'
  readonly ready = true

  #provider?: WalletConnectProvider | UniversalProvider
  #version: '1' | '2'
  constructor(config: { chains?: Chain[]; options: WalletConnectOptions }) {
    super(config)
    this.#version = this.options.version || '1'
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

      if (this.#version === '2') {
        try {
          provider.on('session_delete', this.onDisconnect)
          provider.on('display_uri', this.#onUri)

          await provider.connect({
            namespaces: this.#getConfig(),
          })
        } finally {
          if (this.options.qrcode !== false) Modal.close()
        }
      }

      // Defer message to the next tick to ensure wallet connect data (provided by `.enable()`) is available
      setTimeout(() => this.emit('message', { type: 'connecting' }), 0)

      const accounts = await provider.enable()
      const account = getAddress(accounts[0] as string)
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)

      if (this.#version === '1' && provider instanceof WalletConnectProvider) {
        // Not all WalletConnect options support programmatic chain switching
        // Only enable for wallet options that do
        const walletName = provider.connector?.peerMeta?.name ?? ''
        if (switchChainAllowedRegex.test(walletName))
          this.switchChain = this.#switchChain
      } else {
        // in v2 chain switching is allowed programatically
        // as the user approves the chains when approving the pairing
        this.switchChain = this.#switchChain
      }
      return {
        account,
        chain: { id, unsupported },
        provider: new providers.Web3Provider(
          provider as providers.ExternalProvider,
        ),
      }
    } catch (error) {
      if (/user closed modal/i.test((error as ProviderRpcError).message))
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

    if (this.#version == '1') {
      typeof localStorage !== 'undefined' &&
        localStorage.removeItem('walletconnect')
    } else {
      provider.removeListener('session_delete', this.onDisconnect)
      provider.removeListener('display_uri', this.#onUri)
    }
  }

  async getAccount() {
    const provider = await this.getProvider()

    let accounts
    if (this.#version == '1' && provider instanceof WalletConnectProvider) {
      accounts = provider.accounts
    } else {
      accounts = await provider.enable()
    }
    // return checksum address
    return getAddress(accounts[0] as string)
  }

  async getChainId() {
    const provider = await this.getProvider()
    let chainId
    if (this.#version == '1' && provider instanceof WalletConnectProvider) {
      chainId = normalizeChainId(provider.chainId)
    } else {
      chainId = normalizeChainId(
        await provider.request({ method: 'eth_chainId' }),
      )
    }
    return chainId
  }

  async getProvider({
    chainId,
    create,
  }: { chainId?: number; create?: boolean } = {}) {
    // Force create new provider
    if (!this.#provider || chainId || create) {
      if (this.#version === '1') {
        const rpc = !this.options?.infuraId
          ? this.chains.reduce(
              (rpc, chain) => ({ ...rpc, [chain.id]: chain.rpcUrls.default }),
              {},
            )
          : {}

        const WalletConnectProvider = (
          await import('@walletconnect/ethereum-provider')
        ).default
        this.#provider = new WalletConnectProvider({
          ...this.options,
          chainId,
          rpc: { ...rpc, ...this.options?.rpc },
        })

        return this.#provider
      }

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
        this.#provider.setDefaultChain(`${v2Config.namespace}:${chainId}`)
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
      provider as providers.ExternalProvider,
      chainId,
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
        typeof error === 'string' ? error : (error as ProviderRpcError)?.message
      if (/user rejected request/i.test(message))
        throw new UserRejectedRequestError(error)
      throw new SwitchChainError(error)
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

  #onUri = (uri: string) => {
    console.log('EVENT: DISPLAY_URI', uri)
    if (this.options.qrcode !== false) {
      Modal.open(uri, () => {
        console.log('EVENT: v2 modal closed')
      })
    }
    this.emit('message', { type: 'display_uri', data: uri })
  }

  #getConfig = (): NamespaceConfig => {
    return {
      [v2Config.namespace]: {
        methods: v2Config.methods,
        events: v2Config.events,
        chains: this.chains.map((chain) => `${v2Config.namespace}:${chain.id}`),
        rpcMap: this.chains.reduce(
          (rpc, chain) => ({ ...rpc, [chain.id]: chain.rpcUrls.default }),
          {},
        ),
      },
    }
  }
}

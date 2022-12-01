import type WalletConnectProvider from '@walletconnect/ethereum-provider'
import type {
  default as UniversalProvider,
  UniversalProviderOpts,
} from '@walletconnect/universal-provider'
import { providers } from 'ethers'
import { getAddress, hexValue } from 'ethers/lib/utils.js'

import { getClient } from '../client'
import type { ProviderRpcError } from '../errors'
import { SwitchChainError, UserRejectedRequestError } from '../errors'
import type { Chain } from '../types'
import { normalizeChainId } from '../utils'
import { Connector } from './base'

// Shared config for WalletConnect v2
const sharedConfig = {
  namespace: 'eip155',
}

type WalletConnectOptions = {
  /** When `true`, uses default WalletConnect QR Code modal */
  qrcode?: boolean
} & (
  | ({
      version?: '1'
    } & ConstructorParameters<typeof WalletConnectProvider>[0])
  | ({
      /**
       * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
       */
      projectId: NonNullable<UniversalProviderOpts['projectId']>
      version: '2'
    } & Omit<UniversalProviderOpts, 'projectId'>)
)

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

  constructor(config: { chains?: Chain[]; options: WalletConnectOptions }) {
    super(config)
  }

  get version() {
    if ('version' in this.options) return this.options.version
    return '1'
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

      if (this.version === '2') {
        provider.on('session_delete', this.onDisconnect)
        provider.on('display_uri', this.onDisplayUri)

        // skip `provider.connect` if there is an active session
        if (!(provider as UniversalProvider).session) {
          await Promise.race([
            provider.connect({
              namespaces: {
                [sharedConfig.namespace]: {
                  methods: [
                    'eth_sendTransaction',
                    'eth_sign',
                    'eth_signTransaction',
                    'eth_signTypedData',
                    'personal_sign',
                  ],
                  events: ['accountsChanged', 'chainChanged'],
                  chains: this.chains.map(
                    (chain) => `${sharedConfig.namespace}:${chain.id}`,
                  ),
                  rpcMap: this.chains.reduce(
                    (rpc, chain) => ({
                      ...rpc,
                      [chain.id]: chain.rpcUrls.default,
                    }),
                    {},
                  ),
                },
              },
            }),
            ...(this.options.qrcode
              ? // When using WalletConnect QR Code Modal, open modal and listen for close callback.
                // If modal is closed, reject promise so `catch` block for `connect` is called.
                [
                  new Promise((_res, reject) =>
                    provider.on('display_uri', async (uri: string) => {
                      const { default: Modal } = await import(
                        '@walletconnect/qrcode-modal'
                      )
                      Modal.open(uri, () => reject(new Error('user rejected')))
                    }),
                  ),
                ]
              : []),
          ])

          // If execution reaches here, connection was successful and we can close modal.
          if (this.options.qrcode) {
            const { default: Modal } = await import(
              '@walletconnect/qrcode-modal'
            )
            Modal.close()
          }
        }
      }

      // Defer message to the next tick to ensure wallet connect data (provided by `.enable()`) is available
      setTimeout(() => this.emit('message', { type: 'connecting' }), 0)

      const accounts = (await Promise.race([
        provider.enable(),
        // When using WalletConnect v1 QR Code Modal, handle user rejection request from wallet
        ...(this.version === '1' && this.options.qrcode
          ? [
              new Promise((_res, reject) =>
                (provider as WalletConnectProvider).connector.on(
                  'disconnect',
                  () => reject(new Error('user rejected')),
                ),
              ),
            ]
          : []),
      ])) as string[]
      const account = getAddress(accounts[0] as string)
      const id = await this.getChainId()
      const unsupported = this.isChainUnsupported(id)

      // Not all WalletConnect v1 options support programmatic chain switching.
      // Only enable for wallet options that do.
      if (this.version === '1') {
        const walletName =
          (provider as WalletConnectProvider).connector?.peerMeta?.name ?? ''

        /**
         * Wallets that support chain switching through WalletConnect
         * - imToken (token.im)
         * - MetaMask (metamask.io)
         * - Omni (omni.app)
         * - Rainbow (rainbow.me)
         * - Trust Wallet (trustwallet.com)
         */
        const switchChainAllowedRegex =
          /(imtoken|metamask|omni|rainbow|trust wallet)/i
        if (switchChainAllowedRegex.test(walletName))
          this.switchChain = this.#switchChain
      }
      // In v2, chain switching is allowed programatically
      // as the user approves the chains when approving the pairing
      else this.switchChain = this.#switchChain

      return {
        account,
        chain: { id, unsupported },
        provider: new providers.Web3Provider(
          provider as providers.ExternalProvider,
        ),
      }
    } catch (error) {
      // WalletConnect v1: "user closed modal"
      // WalletConnect v2: "user rejected"
      if (
        /user closed modal|user rejected/i.test(
          (error as ProviderRpcError).message,
        )
      ) {
        if (this.version === '2' && this.options.qrcode)
          (await import('@walletconnect/qrcode-modal')).default.close()
        throw new UserRejectedRequestError(error)
      }
      throw error
    }
  }

  async disconnect() {
    const provider = await this.getProvider()
    await provider.disconnect()

    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)

    if (this.version === '1' && typeof localStorage !== 'undefined')
      // Remove local storage session so user can connect again
      localStorage.removeItem('walletconnect')
    else {
      provider.removeListener('session_delete', this.onDisconnect)
      provider.removeListener('display_uri', this.onDisplayUri)
    }
  }

  async getAccount() {
    const provider = await this.getProvider()
    let accounts
    if (this.version === '1')
      accounts = (provider as WalletConnectProvider).accounts
    else
      accounts = (await provider.request({
        method: 'eth_accounts',
      })) as string[]

    // return checksum address
    return getAddress(accounts[0] as string)
  }

  async getChainId() {
    const provider = await this.getProvider()
    if (this.version === '1')
      return normalizeChainId((provider as WalletConnectProvider).chainId)
    return normalizeChainId(await provider.request({ method: 'eth_chainId' }))
  }

  async getProvider({
    chainId,
    create,
  }: { chainId?: number; create?: boolean } = {}) {
    // Force create new provider
    if (!this.#provider || chainId || create) {
      if (!('version' in this.options) || this.options.version === '1') {
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
      } else {
        const WalletConnectProvider = (
          await import('@walletconnect/universal-provider')
        ).default
        this.#provider = await WalletConnectProvider.init(
          this.options as UniversalProviderOpts,
        )
        if (chainId)
          this.#provider.setDefaultChain(`${sharedConfig.namespace}:${chainId}`)
        return this.#provider
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
      // Set up a race between `wallet_switchEthereumChain` & the `chainChanged` event
      // to ensure the chain has been switched. This is because there could be a case
      // where a wallet may not resolve the `wallet_switchEthereumChain` method, or
      // resolves slower than `chainChanged`.
      await Promise.race([
        provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: id }],
        }),
        new Promise((res) =>
          this.on('change', ({ chain }) => {
            if (chain?.id === chainId) res(chainId)
          }),
        ),
      ])
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

  protected onDisplayUri = (uri: string) => {
    this.emit('message', { type: 'display_uri', data: uri })
  }
}

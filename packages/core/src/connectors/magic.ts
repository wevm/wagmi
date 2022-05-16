import { providers } from 'ethers'
import { getAddress } from 'ethers/lib/utils'
import type {
  LoginWithEmailOTPConfiguration,
  LoginWithMagicLinkConfiguration,
  LoginWithSmsConfiguration,
  Magic,
  MagicSDKAdditionalConfiguration,
} from 'magic-sdk'

import { Chain } from '../types'
import { normalizeChainId } from '../utils'
import { Connector } from './base'

type Options = MagicSDKAdditionalConfiguration & {
  apiKey: string
}

export class MagicConnector extends Connector<providers.Web3Provider, Options> {
  readonly id = 'magic'
  readonly name = 'Magic'
  readonly ready = true

  #client?: Magic
  #provider?: providers.Web3Provider
  #connect?: () => Promise<string | null>

  constructor(config: { chains?: Chain[]; options: Options }) {
    super(config)
  }

  async connect() {
    if (!this.#connect) throw new Error('Magic login type not set')

    const client = await this.getClient()
    client.rpcProvider.on('accountsChanged', this.onAccountsChanged)
    client.rpcProvider.on('chainChanged', this.onChainChanged)
    client.rpcProvider.on('disconnect', this.onDisconnect)

    this.emit('message', { type: 'connecting' })
    await this.#connect()

    const provider = await this.getProvider()
    const account = await this.getAccount()
    const id = await this.getChainId()
    const unsupported = this.isChainUnsupported(id)

    return { account, chain: { id, unsupported }, provider }
  }

  async disconnect() {
    const client = await this.getClient()
    client.rpcProvider.removeListener('accountsChanged', this.onAccountsChanged)
    client.rpcProvider.removeListener('chainChanged', this.onChainChanged)
    client.rpcProvider.removeListener('disconnect', this.onDisconnect)
  }

  async getAccount() {
    const signer = await this.getSigner()
    const address = await signer.getAddress()
    // return checksum address
    return getAddress(address)
  }

  async getChainId() {
    const provider = await this.getProvider()
    const { chainId } = await provider.getNetwork()
    return normalizeChainId(chainId)
  }

  async getClient() {
    if (!this.#client) {
      const { apiKey, ...options } = this.options
      const network = options.network ?? {
        rpcUrl: this.chains[0].rpcUrls.default,
        chainId: this.chains[0].id,
      }

      const MagicSDK = await import('magic-sdk')
      this.#client = new MagicSDK.Magic(apiKey, { ...options, network })
    }
    return this.#client
  }

  async getProvider() {
    if (!this.#provider) {
      const client = await this.getClient()
      this.#provider = new providers.Web3Provider(client.rpcProvider)
    }
    return this.#provider
  }

  async getSigner() {
    const provider = await this.getProvider()
    return provider.getSigner()
  }

  async loginWithMagicLink(config: LoginWithMagicLinkConfiguration) {
    this.#connect = () => this.#client.auth.loginWithMagicLink(config)
  }

  async loginWithEmailOTP(config: LoginWithEmailOTPConfiguration) {
    this.#connect = () => this.#client.auth.loginWithEmailOTP(config)
  }

  async loginWithSMS(config: LoginWithSmsConfiguration) {
    this.#connect = () => this.#client.auth.loginWithSMS(config)
  }

  async loginWithCredential(credentialOrQueryString?: string) {
    this.#connect = () =>
      this.#client.auth.loginWithCredential(credentialOrQueryString)
  }

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0]) })
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

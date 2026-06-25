import type {
  AuthenticateResponse,
  BalancesRequest,
  CallContractRequest,
  GetFromContractRequest,
  GetPermissionsResponse,
  GrantPermissionsRequest,
  GrantPermissionsResponse,
  Network as MossWalletNetwork,
  OwnedTokenResponse,
  SendRequest,
  SignDataRequest,
  SignDataResponse,
  SwapRequest,
  TransactionResult,
  TransferRequest,
  Config as WalletSdkConfig,
} from '@megaeth-labs/wallet-sdk'
import {
  ChainNotConfiguredError,
  type Connector,
  createConnector,
  SwitchChainNotSupportedError,
} from '@wagmi/core'
import {
  type Address,
  type EIP1193EventMap,
  type EIP1193Provider,
  getAddress,
  type Hex,
  hexToString,
  InternalRpcError,
  InvalidParamsRpcError,
  isAddress,
  isHex,
  MethodNotFoundRpcError,
  numberToHex,
  ProviderDisconnectedError,
  type RpcTransactionRequest,
  UserRejectedRequestError,
} from 'viem'
import { megaeth, megaethTestnet } from 'viem/chains'

const mossWalletIcon =
  'data:image/png;base64,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'

export type MossWalletParameters = Omit<WalletSdkConfig, 'network'> & {
  network?: MossWalletNetwork
}

type SingleOrArray<T> = T | readonly [T]
type OptionalSingleOrArray<T> = T | readonly [T?] | undefined
type CallContractRequestBatch = readonly CallContractRequest[]
type CallContractRequestParameter =
  | CallContractRequest
  | CallContractRequestBatch
  | readonly [CallContractRequest | CallContractRequestBatch]

type MossWalletRpcTransactionRequest = {
  chainId?: Hex | number | undefined
  data?: Hex | undefined
  from?: Address | undefined
  gas?: Hex | undefined
  gasPrice?: Hex | undefined
  maxFeePerGas?: Hex | undefined
  maxPriorityFeePerGas?: Hex | undefined
  nonce?: Hex | undefined
  to?: Address | undefined
  value?: Hex | undefined
}

type MossWalletSendTransactionParameters = readonly [
  request: MossWalletRpcTransactionRequest,
]

type MossWalletPersonalSignParameters =
  | readonly [message: string, address: Address]
  | readonly [address: Address, message: string]

type MossWalletTypedDataParameters = readonly [
  address: Address,
  typedData: string | SignDataRequest['data'],
]

type MossWalletManageAccountRequest = {
  method: string
  data?: unknown
}

interface MossWalletRequestMap {
  eth_accounts: {
    params: undefined
    returnType: readonly Address[]
  }
  eth_chainId: {
    params: undefined
    returnType: Hex
  }
  eth_requestAccounts: {
    params: undefined
    returnType: readonly Address[]
  }
  eth_sendTransaction: {
    params: MossWalletSendTransactionParameters
    returnType: Hex
  }
  eth_signTypedData_v4: {
    params: MossWalletTypedDataParameters
    returnType: Hex
  }
  personal_sign: {
    params: MossWalletPersonalSignParameters
    returnType: Hex
  }
  wallet_balances: {
    params: OptionalSingleOrArray<BalancesRequest>
    returnType: OwnedTokenResponse[]
  }
  wallet_callContract: {
    params: CallContractRequestParameter
    returnType: TransactionResult
  }
  wallet_deposit: {
    params: undefined
    returnType: undefined
  }
  wallet_getFromContract: {
    params: SingleOrArray<GetFromContractRequest>
    returnType: unknown
  }
  wallet_getPermissions: {
    params: string | readonly [address?: string] | undefined
    returnType: GetPermissionsResponse | undefined
  }
  wallet_grantPermissions: {
    params: SingleOrArray<GrantPermissionsRequest>
    returnType: GrantPermissionsResponse
  }
  wallet_authenticate: {
    params: undefined
    returnType: AuthenticateResponse
  }
  wallet_manageAccount: {
    params: SingleOrArray<MossWalletManageAccountRequest>
    returnType: undefined
  }
  wallet_open: {
    params: undefined
    returnType: undefined
  }
  wallet_revokePermissions: {
    params: undefined
    returnType: undefined
  }
  wallet_signData: {
    params: SingleOrArray<SignDataRequest>
    returnType: SignDataResponse
  }
  wallet_send: {
    params: SingleOrArray<SendRequest>
    returnType: TransactionResult
  }
  wallet_swap: {
    params: SingleOrArray<SwapRequest>
    returnType: TransactionResult
  }
  wallet_transfer: {
    params: SingleOrArray<TransferRequest>
    returnType: TransactionResult
  }
}

type MossWalletRequestMethod = keyof MossWalletRequestMap

type MossWalletRequestParameters<
  method extends MossWalletRequestMethod = MossWalletRequestMethod,
> = MossWalletRequestMap[method]['params'] extends undefined
  ? {
      method: method
      params?: undefined
    }
  : {
      method: method
      params: MossWalletRequestMap[method]['params']
    }

type MossWalletRequest = {
  [method in MossWalletRequestMethod]: MossWalletRequestParameters<method>
}[MossWalletRequestMethod]

type MossWalletRequestReturnType<
  method extends MossWalletRequestMethod = MossWalletRequestMethod,
> = MossWalletRequestMap[method]['returnType']

type Provider = Omit<EIP1193Provider, 'request'> & {
  request<method extends MossWalletRequestMethod>(
    parameters: MossWalletRequestParameters<method>,
  ): Promise<MossWalletRequestReturnType<method>>

  disconnect(): Promise<void>
}

// Mirrors the shape of the `mega` singleton exported by `@megaeth-labs/wallet-sdk`.
// Imported lazily (see `loadMossWalletSdk` below) so the SDK stays an optional
// peer dependency, like `porto`/`@coinbase/wallet-sdk` elsewhere in this package.
type MossWalletSdk = {
  events: { onStatusChange(listener: (status?: any) => void): void }
  initialise(parameters: WalletSdkConfig): Promise<any>
  status(): Promise<any>
  connect(): Promise<any>
  disconnect(): Promise<any>
  callContract(request: unknown): Promise<TransactionResult>
  signData(request: unknown): Promise<SignDataResponse>
  signMessage(message: string): Promise<SignDataResponse>
  balances(request: BalancesRequest): Promise<OwnedTokenResponse[]>
  deposit(): Promise<void>
  getFromContract(request: GetFromContractRequest): Promise<unknown>
  getPermissions(address?: string): Promise<GetPermissionsResponse | undefined>
  grantPermissions(
    request: GrantPermissionsRequest,
  ): Promise<GrantPermissionsResponse>
  authenticate(): Promise<AuthenticateResponse>
  manageAccount(request: MossWalletManageAccountRequest): Promise<void>
  open(): Promise<void>
  revokePermissions(): Promise<void>
  send(request: SendRequest): Promise<TransactionResult>
  swap(request: SwapRequest): Promise<TransactionResult>
  transfer(request: TransferRequest): Promise<TransactionResult>
}

async function loadMossWalletSdk(): Promise<{ mega: MossWalletSdk }> {
  return await (() => {
    // safe webpack optional peer dependency dynamic import
    try {
      return import(
        /* turbopackOptional: true */
        '@megaeth-labs/wallet-sdk'
      )
    } catch {
      throw new Error('dependency "@megaeth-labs/wallet-sdk" not found')
    }
  })()
}

const chainByNetwork = {
  mainnet: megaeth,
  testnet: megaethTestnet,
}

function getMossWalletChain(network: MossWalletNetwork = 'mainnet') {
  return chainByNetwork[network]
}

function createDisconnectedError(message = 'MOSS Wallet is not connected.') {
  return new ProviderDisconnectedError(new Error(message))
}

function createInternalError(message: string, cause?: unknown) {
  if (cause instanceof Error && 'code' in cause) return cause
  return new InternalRpcError(
    cause instanceof Error ? cause : new Error(message),
  )
}

function createInvalidParamsError(message: string) {
  return new InvalidParamsRpcError(new Error(message))
}

function createMethodNotFoundError(method: string) {
  return new MethodNotFoundRpcError(
    new Error(`Unsupported method "${method}".`),
    { method },
  )
}

function createUserRejectedError(message: string) {
  return new UserRejectedRequestError(new Error(message))
}

function normalizeProviderRequestError(
  error: unknown,
  fallbackMessage = 'MOSS Wallet request failed.',
) {
  if (error instanceof Error && 'code' in error) return error
  return new InternalRpcError(
    error instanceof Error ? error : new Error(fallbackMessage),
  )
}

const unsupportedTransactionFields = [
  'accessList',
  'authorizationList',
  'blobs',
  'gas',
  'gasPrice',
  'maxFeePerBlobGas',
  'maxFeePerGas',
  'maxPriorityFeePerGas',
  'nonce',
  'type',
] as const

function normalizeAddressParam(
  method: string,
  field: string,
  value: string,
): Address {
  try {
    return getAddress(value as Address)
  } catch {
    throw createInvalidParamsError(
      `"${method}" "${field}" must be a valid address.`,
    )
  }
}

function normalizeBigIntParam(
  method: string,
  field: string,
  value: unknown,
): bigint {
  try {
    return BigInt(value as string | number | bigint)
  } catch {
    throw createInvalidParamsError(
      `"${method}" "${field}" must be a valid bigint-compatible value.`,
    )
  }
}

function getRequiredObjectParam<T>(
  method: string,
  params: T | readonly [T],
): T {
  if (Array.isArray(params)) {
    if (params.length === 0 || params[0] === undefined) {
      throw createInvalidParamsError(`"${method}" requires a request object.`)
    }
    return params[0] as T
  }
  if (!params || typeof params !== 'object') {
    throw createInvalidParamsError(`"${method}" requires a request object.`)
  }
  return params as T
}

function getRequiredCallContractParam(
  method: string,
  params: CallContractRequestParameter,
): CallContractRequest | CallContractRequest[] {
  if (Array.isArray(params)) {
    if (params.length === 0) {
      throw createInvalidParamsError(`"${method}" requires a request object.`)
    }
    if (params.length === 1) {
      const value = params[0]
      if (!value || typeof value !== 'object') {
        throw createInvalidParamsError(`"${method}" requires a request object.`)
      }
      return Array.isArray(value) ? [...value] : value
    }
    return [...params] as CallContractRequest[]
  }
  if (!params || typeof params !== 'object') {
    throw createInvalidParamsError(`"${method}" requires a request object.`)
  }
  return params as CallContractRequest
}

function getOptionalObjectParam<T>(
  method: string,
  params: T | readonly [T?] | undefined,
): T | undefined {
  if (params === undefined) return undefined
  if (Array.isArray(params)) {
    if (params.length > 1) {
      throw createInvalidParamsError(
        `"${method}" accepts at most one request object.`,
      )
    }
    return params[0] as T | undefined
  }
  if (typeof params !== 'object') {
    throw createInvalidParamsError(`"${method}" requires a request object.`)
  }
  return params as T
}

function getOptionalStringParam(
  method: string,
  params: string | readonly [string?] | undefined,
) {
  if (params === undefined) return undefined
  if (Array.isArray(params)) {
    if (params.length > 1) {
      throw createInvalidParamsError(
        `"${method}" accepts at most one address parameter.`,
      )
    }
    const value = params[0]
    if (value === undefined) return undefined
    if (typeof value !== 'string') {
      throw createInvalidParamsError(`"${method}" expects an address string.`)
    }
    return value
  }
  if (typeof params !== 'string') {
    throw createInvalidParamsError(`"${method}" expects an address string.`)
  }
  return params
}

function unwrapGrantPermissions(result: { status: 'approved' | 'cancelled' }) {
  if (result.status === 'cancelled') {
    throw createUserRejectedError('User rejected the permissions request.')
  }
  return result
}

function unwrapAuthenticateResult(result: AuthenticateResponse) {
  if (result.status === 'cancelled') {
    throw createUserRejectedError('User rejected the authentication request.')
  }
  if (result.status === 'error' || !result.jwt) {
    throw createInternalError(
      result.error ?? 'MOSS Wallet authentication failed.',
    )
  }
  return result
}

function unwrapSignResult(
  result: {
    error?: string
    signature?: string
    status: 'cancelled' | 'error' | 'success'
  },
  cancelledMessage: string,
  fallbackMessage: string,
) {
  if (result.status === 'cancelled') {
    throw createUserRejectedError(cancelledMessage)
  }
  if (result.status === 'error' || !result.signature) {
    throw createInternalError(result.error ?? fallbackMessage)
  }
  return result.signature as Hex
}

function unwrapTransactionResult(
  result: TransactionResult,
  cancelledMessage: string,
) {
  if (result.status === 'cancelled') {
    throw createUserRejectedError(cancelledMessage)
  }
  if (result.status !== 'approved') {
    throw createInternalError(result.error ?? 'MOSS Wallet transaction failed.')
  }
  return result
}

function normalizePersonalSignParameters(
  account: Address,
  params: readonly [string, string] | readonly [string, Address],
) {
  const [first, second] = params
  if (typeof first !== 'string' || typeof second !== 'string') {
    throw createInvalidParamsError(
      '"personal_sign" requires a message and account.',
    )
  }

  let message = first
  let address = second

  if (isAddress(first) && !isAddress(second)) {
    address = first
    message = second
  }

  const normalizedAddress = normalizeAddressParam(
    'personal_sign',
    'account',
    address,
  )

  if (normalizedAddress !== account) {
    throw createInvalidParamsError(
      '"personal_sign" account does not match the connected account.',
    )
  }

  if (isHex(message)) {
    try {
      message = hexToString(message)
    } catch {
      throw createInvalidParamsError(
        '"personal_sign" only supports hex payloads that can be decoded to UTF-8 text.',
      )
    }
  }

  return { address: normalizedAddress, message }
}

function normalizeTypedDataParameters(
  account: Address,
  params: MossWalletTypedDataParameters,
) {
  const [address, typedData] = params
  const normalizedAddress = normalizeAddressParam(
    'eth_signTypedData_v4',
    'account',
    address,
  )

  if (normalizedAddress !== account) {
    throw createInvalidParamsError(
      '"eth_signTypedData_v4" account does not match the connected account.',
    )
  }

  if (typeof typedData === 'string') {
    try {
      return JSON.parse(typedData)
    } catch {
      throw createInvalidParamsError(
        '"eth_signTypedData_v4" expects a valid JSON string or typed data object.',
      )
    }
  }

  return typedData
}

function normalizeSendTransactionRequest(
  account: Address,
  chainId: number,
  params: MossWalletSendTransactionParameters,
) {
  const [request] = params

  if (!request || typeof request !== 'object') {
    throw createInvalidParamsError(
      '"eth_sendTransaction" requires a transaction object.',
    )
  }

  const transaction = request as MossWalletRpcTransactionRequest &
    Record<string, RpcTransactionRequest[keyof RpcTransactionRequest]>

  for (const field of unsupportedTransactionFields) {
    if (transaction[field] !== undefined) {
      throw createInvalidParamsError(
        `"eth_sendTransaction" does not support the "${field}" field for MOSS Wallet.`,
      )
    }
  }

  if (!transaction.to) {
    throw createInvalidParamsError(
      '"eth_sendTransaction" requires a "to" address.',
    )
  }

  if (transaction.from) {
    const normalizedFrom = normalizeAddressParam(
      'eth_sendTransaction',
      'from',
      transaction.from,
    )
    if (normalizedFrom !== account) {
      throw createInvalidParamsError(
        '"eth_sendTransaction" "from" must match the connected MOSS Wallet account.',
      )
    }
  }

  if (transaction.chainId !== undefined) {
    const transactionChainId = Number(transaction.chainId)
    if (
      !Number.isFinite(transactionChainId) ||
      transactionChainId !== chainId
    ) {
      throw createInvalidParamsError(
        '"eth_sendTransaction" chainId must match the configured MOSS Wallet network.',
      )
    }
  }

  if (transaction.data !== undefined && !isHex(transaction.data)) {
    throw createInvalidParamsError(
      '"eth_sendTransaction" "data" must be a hex string.',
    )
  }

  const normalizedTo = normalizeAddressParam(
    'eth_sendTransaction',
    'to',
    transaction.to,
  )
  const normalizedValue =
    transaction.value === undefined
      ? 0n
      : normalizeBigIntParam('eth_sendTransaction', 'value', transaction.value)

  return {
    data: transaction.data,
    address: normalizedTo,
    value: normalizedValue,
  }
}

type ListenerMap = {
  [event in keyof EIP1193EventMap]: Set<EIP1193EventMap[event]>
}

function createListenerMap(): ListenerMap {
  return {
    accountsChanged: new Set(),
    chainChanged: new Set(),
    connect: new Set(),
    disconnect: new Set(),
    message: new Set(),
  }
}

class MossWalletProviderImplementation implements Provider {
  readonly #listeners = createListenerMap()
  readonly #mega: MossWalletSdk
  #account: Address | undefined
  #initializationPromise: Promise<void> | undefined
  #initialized = false
  #isConnected = false

  readonly chain
  readonly chainId
  readonly chainIdHex

  constructor(
    mega: MossWalletSdk,
    readonly parameters: WalletSdkConfig,
  ) {
    this.#mega = mega
    this.chain = getMossWalletChain(parameters.network as MossWalletNetwork)
    this.chainId = this.chain.id
    this.chainIdHex = numberToHex(this.chainId)

    mega.events.onStatusChange((status) => {
      this.applyStatus(status)
    })
  }

  get account() {
    return this.#account
  }

  async disconnect() {
    await this.ensureInitialized()
    const status = await this.#mega.disconnect()
    this.applyStatus(status)
  }

  async ensureInitialized() {
    if (this.#initialized) return

    this.#initializationPromise ??= (async () => {
      const initialStatus =
        (await this.#mega.initialise(this.parameters)) ??
        (await this.#mega.status())
      this.applyStatus(initialStatus)
      this.#initialized = true
    })().finally(() => {
      this.#initializationPromise = undefined
    })

    await this.#initializationPromise
  }

  on<event extends keyof ListenerMap>(
    event: event,
    listener: EIP1193EventMap[event],
  ) {
    this.#listeners[event].add(listener)
  }

  applyStatus(status?: { status?: string; address?: string }) {
    const nextAccount =
      status?.status === 'connected' && status.address
        ? getAddress(status.address)
        : undefined
    const previousAccount = this.#account
    const wasConnected = this.#isConnected

    this.#account = nextAccount
    this.#isConnected = Boolean(nextAccount)

    const previousAccounts = previousAccount ? [previousAccount] : []
    const nextAccounts = nextAccount ? [nextAccount] : []

    const accountsChanged =
      previousAccounts.length !== nextAccounts.length ||
      previousAccounts.some((account, index) => account !== nextAccounts[index])

    if (accountsChanged) {
      this.emit('accountsChanged', nextAccounts)
    }

    if (!wasConnected && this.#isConnected) {
      this.emit('connect', { chainId: this.chainIdHex })
    }

    if (wasConnected && !this.#isConnected) {
      this.emit(
        'disconnect',
        new ProviderDisconnectedError(new Error('MOSS Wallet disconnected.')),
      )
    }
  }

  removeListener<event extends keyof ListenerMap>(
    event: event,
    listener: EIP1193EventMap[event],
  ) {
    this.#listeners[event].delete(listener)
  }

  async request<method extends MossWalletRequestMethod>(
    parameters: MossWalletRequestParameters<method>,
  ): Promise<MossWalletRequestReturnType<method>> {
    try {
      return (await this.#handleRequest(
        parameters as MossWalletRequest,
      )) as MossWalletRequestReturnType<method>
    } catch (error) {
      throw normalizeProviderRequestError(error)
    }
  }

  async #handleRequest(request: MossWalletRequest) {
    await this.ensureInitialized()
    const mega = this.#mega

    switch (request.method) {
      case 'eth_accounts': {
        const account = this.account
        return account ? [account] : []
      }

      case 'eth_chainId':
        return this.chainIdHex

      case 'eth_requestAccounts': {
        const status = await mega.connect()
        this.applyStatus(status)

        if (status.status === 'cancelled') {
          throw createUserRejectedError('User rejected the connection request.')
        }
        if (status.status !== 'connected' || !status.address) {
          throw createInternalError(
            'MOSS Wallet did not return a connected account.',
          )
        }
        return [getAddress(status.address)]
      }

      case 'eth_sendTransaction': {
        const account = this.#expectConnectedAccount()
        const normalizedRequest = normalizeSendTransactionRequest(
          account,
          this.chainId,
          request.params,
        )
        const result = await mega.callContract(normalizedRequest)
        const approvedResult = unwrapTransactionResult(
          result,
          'User rejected the transaction request.',
        )
        if (!approvedResult.receipt?.hash) {
          throw createInternalError(
            'MOSS Wallet approved the transaction without a receipt hash.',
          )
        }
        return approvedResult.receipt.hash
      }

      case 'eth_signTypedData_v4': {
        const account = this.#expectConnectedAccount()
        const typedData = normalizeTypedDataParameters(account, request.params)
        return unwrapSignResult(
          await mega.signData({ data: typedData }),
          'User rejected the typed data signature request.',
          'MOSS Wallet did not return a typed data signature.',
        )
      }

      case 'personal_sign': {
        const account = this.#expectConnectedAccount()
        const { message } = normalizePersonalSignParameters(
          account,
          request.params,
        )
        return unwrapSignResult(
          await mega.signMessage(message),
          'User rejected the message signature request.',
          'MOSS Wallet did not return a message signature.',
        )
      }

      case 'wallet_balances': {
        const balancesRequest =
          getOptionalObjectParam<BalancesRequest>(
            request.method,
            request.params,
          ) ?? {}
        return await mega.balances(balancesRequest)
      }

      case 'wallet_callContract': {
        const callContractRequest = getRequiredCallContractParam(
          request.method,
          request.params,
        )
        const result = await mega.callContract(callContractRequest)
        return unwrapTransactionResult(
          result,
          'User rejected the contract call request.',
        )
      }

      case 'wallet_deposit':
        await mega.deposit()
        return

      case 'wallet_getFromContract': {
        const getFromContractRequest =
          getRequiredObjectParam<GetFromContractRequest>(
            request.method,
            request.params,
          )
        return await mega.getFromContract(getFromContractRequest)
      }

      case 'wallet_getPermissions': {
        const address = getOptionalStringParam(request.method, request.params)
        return await mega.getPermissions(address)
      }

      case 'wallet_grantPermissions': {
        const grantPermissionsRequest =
          getRequiredObjectParam<GrantPermissionsRequest>(
            request.method,
            request.params,
          )
        const result = await mega.grantPermissions(grantPermissionsRequest)
        return unwrapGrantPermissions(result)
      }

      case 'wallet_authenticate': {
        const result = await mega.authenticate()
        return unwrapAuthenticateResult(result)
      }

      case 'wallet_manageAccount': {
        const manageAccountRequest =
          getRequiredObjectParam<MossWalletManageAccountRequest>(
            request.method,
            request.params,
          )
        await mega.manageAccount(manageAccountRequest)
        return
      }

      case 'wallet_open':
        await mega.open()
        return

      case 'wallet_revokePermissions':
        await mega.revokePermissions()
        return

      case 'wallet_signData': {
        const signDataRequest = getRequiredObjectParam<SignDataRequest>(
          request.method,
          request.params,
        )
        const result = await mega.signData(signDataRequest)
        unwrapSignResult(
          result,
          'User rejected the typed data signature request.',
          'MOSS Wallet did not return a typed data signature.',
        )
        return result
      }

      case 'wallet_send': {
        const sendRequest = getRequiredObjectParam<SendRequest>(
          request.method,
          request.params,
        )
        const result = await mega.send(sendRequest)
        return unwrapTransactionResult(
          result,
          'User rejected the send request.',
        )
      }

      case 'wallet_swap': {
        const swapRequest = getRequiredObjectParam<SwapRequest>(
          request.method,
          request.params,
        )
        const result = await mega.swap(swapRequest)
        return unwrapTransactionResult(
          result,
          'User rejected the swap request.',
        )
      }

      case 'wallet_transfer': {
        const transferRequest = getRequiredObjectParam<TransferRequest>(
          request.method,
          request.params,
        )
        const result = await mega.transfer(transferRequest)
        return unwrapTransactionResult(
          result,
          'User rejected the transfer request.',
        )
      }
    }

    throw createMethodNotFoundError((request as { method: string }).method)
  }

  #expectConnectedAccount() {
    const account = this.account
    if (!account) throw createDisconnectedError()
    return account
  }

  private emit<event extends keyof ListenerMap>(
    event: event,
    payload: ListenerMap[event] extends Set<(value: infer item) => void>
      ? item
      : never,
  ) {
    for (const listener of [...this.#listeners[event]]) {
      listener(payload as never)
    }
  }
}

let activeProvider: MossWalletProviderImplementation | undefined
let activeProviderKey: string | undefined

function serializeParameters(parameters: WalletSdkConfig) {
  return JSON.stringify({
    debug: parameters.debug ?? false,
    devMode: parameters.devMode ?? false,
    logging: parameters.logging ?? null,
    network: parameters.network,
    sponsorMode: parameters.sponsorMode ?? null,
    sponsorToken: parameters.sponsorToken ?? null,
    sponsorUrl: parameters.sponsorUrl ?? null,
  })
}

mossWallet.type = 'injected' as const

/**
 * Connector for [MOSS Wallet](https://moss.megaeth.com), MegaETH's embedded
 * SDK wallet. Wraps `@megaeth-labs/wallet-sdk` (an optional peer dependency,
 * loaded lazily — only resolved if a dapp actually configures this
 * connector).
 *
 * The SDK initializes a single embedded session per page load, so only one
 * `mossWallet(...)` configuration is supported per `Config`.
 */
type Properties = {
  balances(request?: BalancesRequest): Promise<OwnedTokenResponse[]>
  callContract(
    request: CallContractRequest | CallContractRequestBatch,
  ): Promise<TransactionResult>
  deposit(): Promise<undefined>
  getFromContract(request: GetFromContractRequest): Promise<unknown>
  getPermissions(address?: string): Promise<GetPermissionsResponse | undefined>
  grantPermissions(
    request: GrantPermissionsRequest,
  ): Promise<GrantPermissionsResponse>
  authenticate(): Promise<AuthenticateResponse>
  manageAccount(request: MossWalletManageAccountRequest): Promise<undefined>
  open(): Promise<undefined>
  revokePermissions(): Promise<undefined>
  send(request: SendRequest): Promise<TransactionResult>
  signData(request: SignDataRequest): Promise<SignDataResponse>
  swap(request: SwapRequest): Promise<TransactionResult>
  transfer(request: TransferRequest): Promise<TransactionResult>
}

export function mossWallet(parameters: MossWalletParameters = {}) {
  const normalizedParameters: WalletSdkConfig = {
    ...parameters,
    network: parameters.network ?? 'mainnet',
  } as WalletSdkConfig
  const chain = getMossWalletChain(
    normalizedParameters.network as MossWalletNetwork,
  )

  let providerPromise: Promise<MossWalletProviderImplementation> | undefined

  const getProvider = () => {
    providerPromise ??= (async () => {
      const providerKey = serializeParameters(normalizedParameters)

      if (activeProvider) {
        if (activeProviderKey !== providerKey) {
          throw new Error(
            'MOSS Wallet SDK can only be initialized once per page load. Use a single connector configuration.',
          )
        }
        return activeProvider
      }

      const { mega } = await loadMossWalletSdk()
      activeProvider = new MossWalletProviderImplementation(
        mega,
        normalizedParameters,
      )
      activeProviderKey = providerKey

      return activeProvider
    })()

    return providerPromise
  }

  let accountsChanged: Connector['onAccountsChanged'] | undefined
  let connect: Connector['onConnect'] | undefined
  let disconnect: Connector['onDisconnect'] | undefined

  return createConnector<Provider, Properties>((config) => ({
    id: 'mossWallet',
    name: 'MOSS Wallet',
    type: mossWallet.type,
    rdns: 'com.megaeth.account',
    icon: mossWalletIcon,

    async setup() {
      if (!config.chains.some((item) => item.id === chain.id)) {
        throw new ChainNotConfiguredError()
      }

      const provider = await this.getProvider()

      if (!accountsChanged) {
        accountsChanged = this.onAccountsChanged.bind(this)
        provider.on('accountsChanged', accountsChanged)
      }
      if (!connect) {
        const onConnect = this.onConnect?.bind(this)
        if (!onConnect) return
        connect = onConnect
        provider.on('connect', onConnect)
      }
      if (!disconnect) {
        disconnect = this.onDisconnect.bind(this)
        provider.on('disconnect', disconnect)
      }
    },

    async connect<withCapabilities extends boolean = false>({
      chainId,
      withCapabilities,
    }: {
      chainId?: number | undefined
      isReconnecting?: boolean | undefined
      withCapabilities?: withCapabilities | boolean | undefined
    } = {}) {
      const configuredChain = config.chains.find((item) => item.id === chain.id)
      if (!configuredChain) throw new ChainNotConfiguredError()

      const provider = await this.getProvider()

      if (chainId && chainId !== configuredChain.id) {
        await this.switchChain?.({ chainId })
      }

      const accounts = await provider.request({ method: 'eth_requestAccounts' })

      return {
        accounts: (withCapabilities
          ? accounts.map((address) => ({
              address: getAddress(address),
              capabilities: {},
            }))
          : accounts.map((address) => getAddress(address))) as never,
        chainId: configuredChain.id,
      }
    },

    async disconnect() {
      const provider = await this.getProvider()
      await provider.disconnect()
    },

    balances(request?: BalancesRequest) {
      return this.getProvider().then((provider) =>
        provider.request({
          method: 'wallet_balances',
          params: request === undefined ? undefined : [request],
        }),
      )
    },

    callContract(request: CallContractRequest | CallContractRequestBatch) {
      return this.getProvider().then((provider) =>
        provider.request({ method: 'wallet_callContract', params: [request] }),
      )
    },

    deposit() {
      return this.getProvider().then((provider) =>
        provider.request({ method: 'wallet_deposit' }),
      )
    },

    getFromContract(request: GetFromContractRequest) {
      return this.getProvider().then((provider) =>
        provider.request({
          method: 'wallet_getFromContract',
          params: [request],
        }),
      )
    },

    getPermissions(address?: string) {
      return this.getProvider().then((provider) =>
        provider.request({
          method: 'wallet_getPermissions',
          params: address === undefined ? undefined : [address],
        }),
      )
    },

    grantPermissions(request: GrantPermissionsRequest) {
      return this.getProvider().then((provider) =>
        provider.request({
          method: 'wallet_grantPermissions',
          params: [request],
        }),
      )
    },

    authenticate() {
      return this.getProvider().then((provider) =>
        provider.request({ method: 'wallet_authenticate' }),
      )
    },

    manageAccount(request: MossWalletManageAccountRequest) {
      return this.getProvider().then((provider) =>
        provider.request({ method: 'wallet_manageAccount', params: [request] }),
      )
    },

    open() {
      return this.getProvider().then((provider) =>
        provider.request({ method: 'wallet_open' }),
      )
    },

    revokePermissions() {
      return this.getProvider().then((provider) =>
        provider.request({ method: 'wallet_revokePermissions' }),
      )
    },

    send(request: SendRequest) {
      return this.getProvider().then((provider) =>
        provider.request({ method: 'wallet_send', params: [request] }),
      )
    },

    signData(request: SignDataRequest) {
      return this.getProvider().then((provider) =>
        provider.request({ method: 'wallet_signData', params: [request] }),
      )
    },

    swap(request: SwapRequest) {
      return this.getProvider().then((provider) =>
        provider.request({ method: 'wallet_swap', params: [request] }),
      )
    },

    transfer(request: TransferRequest) {
      return this.getProvider().then((provider) =>
        provider.request({ method: 'wallet_transfer', params: [request] }),
      )
    },

    async getAccounts() {
      const provider = await this.getProvider()
      const accounts = await provider.request({ method: 'eth_accounts' })
      return accounts.map((account) => getAddress(account))
    },

    async getChainId() {
      const provider = await this.getProvider()
      const chainId = await provider.request({ method: 'eth_chainId' })
      return Number(chainId)
    },

    async getProvider() {
      return getProvider()
    },

    async isAuthorized() {
      try {
        return (await this.getAccounts()).length > 0
      } catch {
        return false
      }
    },

    async switchChain({ chainId }) {
      const configuredChain = config.chains.find((item) => item.id === chain.id)
      if (!configuredChain) throw new ChainNotConfiguredError()

      if (chainId === configuredChain.id) {
        return configuredChain
      }

      throw new SwitchChainNotSupportedError({ connector: this as never })
    },

    onAccountsChanged(accounts) {
      config.emitter.emit('change', {
        accounts: accounts.map((account) => getAddress(account)),
      })
    },

    onChainChanged(chainId) {
      config.emitter.emit('change', { chainId: Number(chainId) })
    },

    async onConnect(connectInfo) {
      const accounts = await this.getAccounts()
      if (accounts.length === 0) return

      config.emitter.emit('connect', {
        accounts,
        chainId: Number(connectInfo.chainId),
      })
    },

    onDisconnect() {
      config.emitter.emit('disconnect')
    },
  }))
}

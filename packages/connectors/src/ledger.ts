import { ContextModuleBuilder } from '@ledgerhq/context-module'
import {
  ConsoleLogger,
  DeviceManagementKitBuilder,
  type DiscoveredDevice,
} from '@ledgerhq/device-management-kit'
import { SignerEthBuilder } from '@ledgerhq/device-signer-kit-ethereum'
import { webHidTransportFactory } from '@ledgerhq/device-transport-kit-web-hid'
import {
  ChainNotConfiguredError,
  ProviderNotFoundError,
  createConnector,
} from '@wagmi/core'
import type { Compute, ExactPartial } from '@wagmi/core/internal'
import type { Subscription } from 'rxjs'
import {
  type Address,
  type Hex,
  SwitchChainError,
  type TransactionSerializable,
  type TransactionSerialized,
  UserRejectedRequestError,
  getAddress,
  hexToBytes,
  numberToHex,
  serializeTransaction,
} from 'viem'

export type LedgerParameters = Compute<
  ExactPartial<{
    /**
     * Enable debug logging
     * @default false
     */
    debug?: boolean | undefined
    /**
     * Derivation path for Ethereum accounts
     * @default "44'/60'/0'/0/0"
     */
    derivationPath?: string | undefined
    /**
     * Origin token for Device Management Kit
     * @default 'wagmi'
     */
    originToken?: string | undefined
  }>
>

ledger.type = 'ledger' as const
export function ledger(parameters: LedgerParameters = {}) {
  type Provider = {
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
    on: (event: string, listener: (...args: unknown[]) => void) => void
    removeListener: (
      event: string,
      listener: (...args: unknown[]) => void,
    ) => void
    emit: (event: string, ...args: unknown[]) => void
  }

  let provider: Provider | undefined
  let currentAccounts: Address[] = []
  let currentChainId = 1
  let dmk: ReturnType<DeviceManagementKitBuilder['build']> | null = null
  let signer: ReturnType<SignerEthBuilder['build']> | null = null
  let sessionId: string | null = null

  const findDevice = async (): Promise<DiscoveredDevice | null> => {
    if (!dmk) return null

    return new Promise((resolve, reject) => {
      const subscription: Subscription = dmk!.startDiscovering({}).subscribe({
        next: (device: DiscoveredDevice) => {
          if (device) {
            clearTimeout(timeout)
            subscription.unsubscribe()
            if (parameters.debug) {
              console.info('Found Ledger device:', device)
            }
            resolve(device)
          }
        },
        error: (error: any) => {
          clearTimeout(timeout)
          subscription.unsubscribe()
          if (parameters.debug) {
            console.error('Device discovery error:', error)
          }
          reject(
            new Error(
              `Device discovery failed: ${error?.message || 'Unknown error'}`,
            ),
          )
        },
      })

      const timeout = setTimeout(() => {
        subscription?.unsubscribe()
        reject(
          new Error(
            'Device discovery timeout. Please ensure your Ledger is connected and unlocked.',
          ),
        )
      }, 10000) // 10 second timeout
    })
  }

  const handleLedgerSubscription = async <T>(
    observable: any,
    options: {
      onCompleted: (output: any) => T
      errorMessage: string
    },
  ): Promise<T> => {
    const { onCompleted, errorMessage } = options

    return new Promise<T>((resolve, reject) => {
      const subscription: Subscription = observable.subscribe({
        next: (response: any) => {
          if (response.status === 'error') {
            subscription.unsubscribe()
            const deviceMessage =
              response.error?.message || 'no response from device'
            const deviceErrorCode = response.error?.errorCode
            let message = `${deviceMessage}`
            message = deviceErrorCode
              ? `${message}, error code: ${deviceErrorCode}`
              : message
            return reject(new Error(message))
          }

          if (response.status !== 'completed') return

          subscription.unsubscribe()
          if (response?.output) {
            resolve(onCompleted(response.output))
          } else {
            reject(new Error(errorMessage))
          }
        },
        error: (error: any) => {
          subscription.unsubscribe()
          reject(new Error(error?.message || errorMessage))
        },
      })
    })
  }

  const signPersonalMessage = async (
    message: string,
    address: string,
  ): Promise<string> => {
    if (!signer) {
      throw new Error('Ledger device not connected. Please connect first.')
    }

    // Verify the address matches the current account
    if (!currentAccounts.includes(getAddress(address))) {
      throw new Error('Address does not match connected Ledger account')
    }

    try {
      // Convert hex message to bytes
      const messageBytes = new Uint8Array(
        message.startsWith('0x')
          ? Array.from(Buffer.from(message.slice(2), 'hex'))
          : Array.from(Buffer.from(message, 'utf8')),
      )

      if (parameters.debug) {
        console.info('Signing personal message:', {
          message,
          address,
          messageBytes,
        })
      }

      const derivationPath = parameters.derivationPath || "44'/60'/0'/0/0"
      const signature = await handleLedgerSubscription(
        signer.signMessage(derivationPath, messageBytes).observable,
        {
          onCompleted: (output: any) => output,
          errorMessage: 'Failed to sign message with Ledger device',
        },
      )

      // Convert Ledger signature format to standard format
      const r = `0x${signature.r}`
      const s = `0x${signature.s}`
      const v = signature.v

      // Combine into standard signature format
      const fullSignature = r + s.slice(2) + v.toString(16).padStart(2, '0')

      if (parameters.debug) {
        console.info('Message signed successfully:', {
          signature,
          fullSignature,
        })
      }

      return fullSignature
    } catch (error) {
      if (parameters.debug) {
        console.error('Error signing message:', error)
      }

      if (/user rejected|denied|cancelled/i.test((error as Error).message)) {
        throw new UserRejectedRequestError(error as Error)
      }

      throw error
    }
  }

  const signTypedData = async (
    address: string,
    typedData: any,
  ): Promise<string> => {
    if (!signer) {
      throw new Error('Ledger device not connected. Please connect first.')
    }

    // Verify the address matches the current account
    if (!currentAccounts.includes(getAddress(address))) {
      throw new Error('Address does not match connected Ledger account')
    }

    try {
      if (parameters.debug) {
        console.info('Signing typed data:', { address, typedData })
      }

      const derivationPath = parameters.derivationPath || "44'/60'/0'/0/0"

      // Parse typed data
      const parsedTypedData =
        typeof typedData === 'string' ? JSON.parse(typedData) : typedData
      const { domain, types, message, primaryType } = parsedTypedData

      const signature = await handleLedgerSubscription(
        signer.signTypedData(derivationPath, {
          domain,
          types,
          message,
          primaryType,
        }).observable,
        {
          onCompleted: (output: any) => output,
          errorMessage: 'Failed to sign typed data with Ledger device',
        },
      )

      // Convert Ledger signature format to standard format
      const r = `0x${signature.r}`
      const s = `0x${signature.s}`
      const v = signature.v

      // Combine into standard signature format
      const fullSignature = r + s.slice(2) + v.toString(16).padStart(2, '0')

      if (parameters.debug) {
        console.info('Typed data signed successfully:', {
          signature,
          fullSignature,
        })
      }

      return fullSignature
    } catch (error) {
      if (parameters.debug) {
        console.error('Error signing typed data:', error)
      }

      if (/user rejected|denied|cancelled/i.test((error as Error).message)) {
        throw new UserRejectedRequestError(error as Error)
      }

      throw error
    }
  }

  const signTransaction = async (transaction: any): Promise<string> => {
    if (!signer) {
      throw new Error('Ledger device not connected. Please connect first.')
    }

    // Verify the from address matches the current account
    if (
      transaction.from &&
      !currentAccounts.includes(getAddress(transaction.from))
    ) {
      throw new Error('From address does not match connected Ledger account')
    }

    try {
      if (parameters.debug) {
        console.info('Signing transaction:', transaction)
      }

      // Convert transaction to proper format for Ledger
      const serializedTx = await serializeTransactionForLedger(transaction)

      const derivationPath = parameters.derivationPath || "44'/60'/0'/0/0"
      const signature = await handleLedgerSubscription(
        signer.signTransaction(derivationPath, serializedTx).observable,
        {
          onCompleted: (output: any) => output,
          errorMessage: 'Failed to sign transaction with Ledger device',
        },
      )

      // Convert Ledger signature format to standard format
      // Check if signature components already have 0x prefix
      const r = (
        signature.r.startsWith('0x') ? signature.r : `0x${signature.r}`
      ) as Hex
      const s = (
        signature.s.startsWith('0x') ? signature.s : `0x${signature.s}`
      ) as Hex
      const v = BigInt(signature.v) // Ensure v is a bigint

      if (parameters.debug) {
        console.info('Ledger signature received:', {
          rawR: signature.r,
          rawS: signature.s,
          rawV: signature.v,
          r,
          s,
          v,
          vType: typeof v,
        })
      }

      // Reconstruct the complete signed transaction
      // First, parse the transaction to the same format we used for serialization
      const parseHexValue = (value: any): bigint => {
        if (!value || value === '0x' || value === '0x0') {
          return 0n
        }
        if (typeof value === 'string' && value.startsWith('0x')) {
          return BigInt(value)
        }
        if (typeof value === 'number') {
          return BigInt(value)
        }
        if (typeof value === 'bigint') {
          return value
        }
        return BigInt(value)
      }

      const parseNonce = (value: any): number | undefined => {
        if (!value && value !== 0) return undefined
        if (typeof value === 'string' && value.startsWith('0x')) {
          return Number(BigInt(value))
        }
        return Number(value)
      }

      const gasLimit = transaction.gas || transaction.gasLimit
      const parsedGasLimit = parseHexValue(gasLimit)

      let signedTx: TransactionSerialized

      // Handle EIP-1559 transactions
      if (transaction.maxFeePerGas || transaction.maxPriorityFeePerGas) {
        signedTx = serializeTransaction(
          {
            type: 'eip1559',
            nonce: parseNonce(transaction.nonce),
            gas: parsedGasLimit,
            to: transaction.to as Address,
            value: parseHexValue(transaction.value),
            data: (transaction.data || '0x') as Hex,
            chainId: currentChainId,
            maxFeePerGas: parseHexValue(transaction.maxFeePerGas),
            maxPriorityFeePerGas: parseHexValue(
              transaction.maxPriorityFeePerGas,
            ),
          },
          { r, s, v },
        )
      } else {
        signedTx = serializeTransaction(
          {
            type: 'legacy',
            nonce: parseNonce(transaction.nonce),
            gasPrice: parseHexValue(transaction.gasPrice),
            gas: parsedGasLimit,
            to: transaction.to as Address,
            value: parseHexValue(transaction.value),
            data: (transaction.data || '0x') as Hex,
            chainId: currentChainId,
          },
          { r, s, v },
        )
      }

      if (parameters.debug) {
        console.info('Complete signed transaction:', signedTx)
      }

      return signedTx
    } catch (error) {
      if (parameters.debug) {
        console.error('Error signing transaction:', error)
      }

      if (/user rejected|denied|cancelled/i.test((error as Error).message)) {
        throw new UserRejectedRequestError(error as Error)
      }

      throw error
    }
  }

  const sendTransaction = async (
    transaction: any,
    rpcUrl?: string,
  ): Promise<string> => {
    const getRpcUrl = () => rpcUrl || getDefaultRpcUrl()
    if (parameters.debug) {
      console.info(
        'Ledger sendTransaction called with transaction:',
        transaction,
      )
    }

    // Validate transaction has required fields
    if (!transaction) {
      throw new Error('Transaction object is required')
    }

    // Ensure we have a from address
    if (!transaction.from) {
      if (currentAccounts.length > 0) {
        transaction.from = currentAccounts[0]
      } else {
        throw new Error('No account available for transaction')
      }
    }

    // Get the current nonce if not provided
    if (!transaction.nonce) {
      if (parameters.debug) {
        console.info('Fetching current nonce for address:', transaction.from)
      }

      try {
        const nonceResponse = await fetch(getRpcUrl(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getTransactionCount',
            params: [transaction.from, 'pending'],
            id: Date.now(),
          }),
        })

        if (!nonceResponse.ok) {
          throw new Error(`HTTP error! status: ${nonceResponse.status}`)
        }

        const nonceResult = await nonceResponse.json()

        if (nonceResult.error) {
          throw new Error(`Failed to get nonce: ${nonceResult.error.message}`)
        }

        transaction.nonce = nonceResult.result

        if (parameters.debug) {
          console.info(
            'Current nonce for address:',
            transaction.from,
            '=',
            transaction.nonce,
          )
        }
      } catch (error) {
        if (parameters.debug) {
          console.error('Error fetching nonce:', error)
        }
        throw new Error(`Failed to get current nonce: ${error}`)
      }
    }

    // Check for gas fields and provide defaults if missing
    const hasGas = transaction.gas || transaction.gasLimit
    if (!hasGas) {
      if (parameters.debug) {
        console.error('Transaction missing gas fields:', {
          gas: transaction.gas,
          gasLimit: transaction.gasLimit,
          allKeys: Object.keys(transaction),
          fullTransaction: transaction,
        })
        console.info('Adding default gas limit of 21000 for basic transaction')
      }

      // Add default gas limit for basic transactions
      transaction.gasLimit = '0x5208' // 21000 in hex
    }

    // Check for gas price fields and provide defaults if missing
    const hasGasPrice = transaction.gasPrice || transaction.maxFeePerGas
    if (!hasGasPrice) {
      if (parameters.debug) {
        console.error('Transaction missing gas price fields:', {
          gasPrice: transaction.gasPrice,
          maxFeePerGas: transaction.maxFeePerGas,
          maxPriorityFeePerGas: transaction.maxPriorityFeePerGas,
        })
        console.info(
          'Adding default gas price of 20 gwei for basic transaction',
        )
      }

      // Add default gas price for basic transactions (20 gwei)
      transaction.gasPrice = '0x4a817c800' // 20 gwei in hex
    }

    try {
      // Sign the transaction with Ledger
      const signedTransaction = await signTransaction(transaction)

      if (parameters.debug) {
        console.info('Transaction signed by Ledger:', signedTransaction)
        console.info('Broadcasting transaction to network...')
      }

      // Broadcast the signed transaction to the network
      // We need to use the current RPC endpoint to broadcast
      const response = await fetch(getRpcUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_sendRawTransaction',
          params: [signedTransaction],
          id: Date.now(),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.error) {
        if (parameters.debug) {
          console.error('RPC error broadcasting transaction:', result.error)
        }
        throw new Error(`Transaction broadcast failed: ${result.error.message}`)
      }

      const txHash = result.result

      if (parameters.debug) {
        console.info('Transaction broadcasted successfully:', txHash)
      }

      return txHash
    } catch (error) {
      if (parameters.debug) {
        console.error('Error in sendTransaction:', error)
      }
      throw error
    }
  }

  // Helper function to get current RPC URL (will be moved inside connector)
  const getDefaultRpcUrl = (): string => {
    // Fallback to public RPC URLs based on chain ID
    if (currentChainId === 11155111) {
      // Sepolia
      return 'https://sepolia.drpc.org/'
    }
    if (currentChainId === 1) {
      // Mainnet
      return 'https://eth.drpc.org/'
    }
    if (currentChainId === 137) {
      // Polygon
      return 'https://polygon.drpc.org/'
    }
    if (currentChainId === 42161) {
      // Arbitrum
      return 'https://arbitrum.drpc.org/'
    }
    if (currentChainId === 10) {
      // Optimism
      return 'https://optimism.drpc.org/'
    }
    // Default to mainnet
    return 'https://eth.drpc.org/'
  }

  const serializeTransactionForLedger = async (
    transaction: any,
  ): Promise<Uint8Array> => {
    try {
      // Convert transaction to proper viem format
      let tx: TransactionSerializable

      // Convert hex strings to proper values
      const parseHexValue = (value: any): bigint => {
        if (!value || value === '0x' || value === '0x0') {
          return 0n
        }
        if (typeof value === 'string' && value.startsWith('0x')) {
          return BigInt(value)
        }
        if (typeof value === 'number') {
          return BigInt(value)
        }
        if (typeof value === 'bigint') {
          return value
        }
        return BigInt(value)
      }

      const parseNonce = (value: any): number | undefined => {
        if (!value && value !== 0) return undefined
        if (typeof value === 'string' && value.startsWith('0x')) {
          return Number(BigInt(value))
        }
        return Number(value)
      }

      // Ensure we have proper gas values
      const gasLimit = transaction.gas || transaction.gasLimit
      if (!gasLimit) {
        if (parameters.debug) {
          console.error('Transaction missing gas/gasLimit:', transaction)
        }
        throw new Error('Transaction must include gas or gasLimit')
      }

      // Parse gas limit
      const parsedGasLimit = parseHexValue(gasLimit)
      if (parsedGasLimit === 0n) {
        if (parameters.debug) {
          console.error('Gas limit is zero:', { gasLimit, parsedGasLimit })
        }
        throw new Error('Gas limit cannot be zero')
      }

      // Handle EIP-1559 transactions
      if (transaction.maxFeePerGas || transaction.maxPriorityFeePerGas) {
        const maxFeePerGas = transaction.maxFeePerGas
        const maxPriorityFeePerGas = transaction.maxPriorityFeePerGas

        if (!maxFeePerGas) {
          throw new Error('EIP-1559 transaction must include maxFeePerGas')
        }
        if (!maxPriorityFeePerGas) {
          throw new Error(
            'EIP-1559 transaction must include maxPriorityFeePerGas',
          )
        }

        tx = {
          type: 'eip1559',
          nonce: parseNonce(transaction.nonce),
          gas: parsedGasLimit,
          to: transaction.to as Address,
          value: parseHexValue(transaction.value),
          data: (transaction.data || '0x') as Hex,
          chainId: currentChainId,
          maxFeePerGas: parseHexValue(maxFeePerGas),
          maxPriorityFeePerGas: parseHexValue(maxPriorityFeePerGas),
        }
      } else {
        const gasPrice = transaction.gasPrice
        if (!gasPrice) {
          throw new Error('Legacy transaction must include gasPrice')
        }

        tx = {
          type: 'legacy',
          nonce: parseNonce(transaction.nonce),
          gasPrice: parseHexValue(gasPrice),
          gas: parsedGasLimit,
          to: transaction.to as Address,
          value: parseHexValue(transaction.value),
          data: (transaction.data || '0x') as Hex,
          chainId: currentChainId,
        }
      }

      if (parameters.debug) {
        console.info('Original transaction:', transaction)
        console.info('Parsed transaction for Ledger:', tx)
        console.info('Gas limit:', tx.gas?.toString())
        if (tx.type === 'eip1559') {
          console.info('Max fee per gas:', tx.maxFeePerGas?.toString())
          console.info(
            'Max priority fee per gas:',
            tx.maxPriorityFeePerGas?.toString(),
          )
        } else {
          console.info('Gas price:', tx.gasPrice?.toString())
        }
      }

      // Serialize the transaction using viem
      const serialized = serializeTransaction(tx)

      // Convert hex string to Uint8Array for Ledger
      const bytes = hexToBytes(serialized)

      if (parameters.debug) {
        console.info('Transaction serialized:', { serialized, bytes })
      }

      return bytes
    } catch (error) {
      if (parameters.debug) {
        console.error('Error serializing transaction:', error)
        console.error('Transaction object:', transaction)
      }
      throw new Error(
        `Failed to serialize transaction: ${(error as Error).message}`,
      )
    }
  }

  return createConnector<Provider>((config) => {
    // Helper function to get current RPC URL with access to config
    const getCurrentRpcUrl = (): string => {
      // Try to get RPC URL from wagmi config first
      const currentChain = config.chains.find(
        (chain) => chain.id === currentChainId,
      )
      if (currentChain?.rpcUrls?.default?.http?.[0]) {
        return currentChain.rpcUrls.default.http[0]
      }

      // Fallback to default RPC URLs
      return getDefaultRpcUrl()
    }

    return {
      id: 'ledger',
      name: 'Ledger',
      type: ledger.type,

      async connect({ chainId } = {}) {
        try {
          await this.getProvider()

          if (parameters.debug) {
            console.info('Connecting to Ledger device...')
          }

          // Initialize Device Management Kit with proper configuration
          if (!dmk) {
            dmk = new DeviceManagementKitBuilder()
              .addLogger(new ConsoleLogger())
              .addTransport(webHidTransportFactory)
              .build()

            if (parameters.debug) {
              console.info('Device Management Kit initialized')
            }
          }

          // Find and connect to device
          const device = await findDevice()
          if (!device) {
            throw new Error(
              'No Ledger device detected. Please ensure your Ledger is connected and unlocked.',
            )
          }

          // Connect to the device
          if (!sessionId) {
            sessionId = await dmk.connect({ device })
            if (parameters.debug) {
              console.info('Connected to device with session ID:', sessionId)
            }
          }

          // Initialize signer with context module
          if (!signer) {
            const originToken = parameters.originToken || 'wagmi'
            const contextModule = new ContextModuleBuilder({
              originToken,
            }).build()

            signer = new SignerEthBuilder({ dmk, sessionId })
              .withContextModule(contextModule)
              .build()

            if (parameters.debug) {
              console.info('Signer initialized with origin token:', originToken)
            }
          }

          // Get address from device
          const derivationPath = parameters.derivationPath || "44'/60'/0'/0/0"
          const addressResult = await handleLedgerSubscription(
            signer.getAddress(derivationPath, {
              checkOnDevice: false,
              returnChainCode: false,
            }).observable,
            {
              onCompleted: (output: any) => output.address,
              errorMessage: 'Failed to get address from Ledger device',
            },
          )

          const accounts = [getAddress(addressResult)]
          currentAccounts = accounts

          // Set chain ID if provided
          if (chainId) {
            currentChainId = chainId
          }

          if (parameters.debug) {
            console.info('Successfully connected to Ledger:', {
              accounts,
              chainId: currentChainId,
            })
          }

          return { accounts, chainId: currentChainId }
        } catch (error) {
          if (parameters.debug) {
            console.error('Ledger connect error:', error)
          }

          if (error instanceof UserRejectedRequestError) {
            throw error
          }

          if (
            /user rejected|denied|cancelled/i.test((error as Error).message)
          ) {
            throw new UserRejectedRequestError(error as Error)
          }

          throw error
        }
      },

      async disconnect() {
        try {
          if (parameters.debug) {
            console.info('Disconnecting from Ledger device...')
          }

          // Disconnect from device session first
          if (dmk && sessionId) {
            try {
              await dmk.disconnect({ sessionId })
              if (parameters.debug) {
                console.info('Device session disconnected')
              }
            } catch (error) {
              if (parameters.debug) {
                console.warn('Error disconnecting session:', error)
              }
            }
          }

          // Clean up Device Management Kit resources
          if (dmk) {
            try {
              dmk.close()
              if (parameters.debug) {
                console.info('Device Management Kit closed')
              }
            } catch (error) {
              if (parameters.debug) {
                console.warn('Error closing DMK:', error)
              }
            }
            dmk = null
          }

          // Clear all state
          if (signer) {
            signer = null
          }

          sessionId = null
          currentAccounts = []
          provider = undefined

          // Emit disconnect event
          config.emitter.emit('disconnect')

          if (parameters.debug) {
            console.info('Successfully disconnected from Ledger device')
          }
        } catch (error) {
          if (parameters.debug) {
            console.error('Error during disconnect:', error)
          }
          // Still clear state even if there were errors
          dmk = null
          signer = null
          sessionId = null
          currentAccounts = []
          provider = undefined
        }
      },

      async getAccounts() {
        // If we have cached accounts and are connected, return them
        if (currentAccounts.length > 0 && signer && sessionId) {
          return currentAccounts
        }

        // If not connected, return empty array
        if (!signer || !sessionId) {
          if (parameters.debug) {
            console.info(
              'Not connected to Ledger device, returning empty accounts',
            )
          }
          return []
        }

        // Try to refresh accounts from device
        try {
          if (parameters.debug) {
            console.info('Refreshing accounts from Ledger device...')
          }

          const derivationPath = parameters.derivationPath || "44'/60'/0'/0/0"
          const addressResult = await handleLedgerSubscription(
            signer.getAddress(derivationPath, {
              checkOnDevice: false,
              returnChainCode: false,
            }).observable,
            {
              onCompleted: (output: any) => output.address,
              errorMessage: 'Failed to get address from Ledger device',
            },
          )

          const accounts = [getAddress(addressResult)]
          currentAccounts = accounts

          if (parameters.debug) {
            console.info('Refreshed accounts from device:', accounts)
          }

          return accounts
        } catch (error) {
          if (parameters.debug) {
            console.error('Error refreshing accounts:', error)
          }
          // Return cached accounts if refresh fails
          return currentAccounts
        }
      },

      async getChainId() {
        if (parameters.debug) {
          console.info('Getting chain ID:', currentChainId)
        }
        return currentChainId
      },

      async getProvider() {
        if (!provider) {
          const eventListeners: {
            [key: string]: ((...args: unknown[]) => void)[]
          } = {}

          provider = {
            async request({ method, params = [] }) {
              switch (method) {
                case 'eth_accounts':
                case 'eth_requestAccounts':
                  return currentAccounts
                case 'eth_chainId':
                  return numberToHex(currentChainId)
                case 'personal_sign': {
                  const [message, address] = params as [string, string]
                  return await signPersonalMessage(message, address)
                }
                case 'eth_sign': {
                  const [address, message] = params as [string, string]
                  return await signPersonalMessage(message, address)
                }
                case 'eth_signTypedData':
                case 'eth_signTypedData_v3':
                case 'eth_signTypedData_v4': {
                  const [address, typedData] = params as [string, any]
                  return await signTypedData(address, typedData)
                }
                case 'eth_sendTransaction': {
                  const [transaction] = params as [any]
                  // Get the proper RPC URL from config
                  const rpcUrl = getCurrentRpcUrl()
                  return await sendTransaction(transaction, rpcUrl)
                }
                case 'eth_signTransaction': {
                  const [transaction] = params as [any]
                  return await signTransaction(transaction)
                }
                default:
                  throw new Error(`Unsupported method: ${method}`)
              }
            },

            on(event: string, listener: (...args: unknown[]) => void) {
              if (!eventListeners[event]) {
                eventListeners[event] = []
              }
              eventListeners[event].push(listener)
            },

            removeListener(
              event: string,
              listener: (...args: unknown[]) => void,
            ) {
              if (eventListeners[event]) {
                const index = eventListeners[event].indexOf(listener)
                if (index > -1) {
                  eventListeners[event].splice(index, 1)
                }
              }
            },

            emit(event: string, ...args: unknown[]) {
              if (eventListeners[event]) {
                for (const listener of eventListeners[event]) {
                  listener(...args)
                }
              }
            },
          }
        }
        return provider
      },

      async isAuthorized() {
        try {
          // Check if we have accounts and are connected to device
          const hasAccounts = currentAccounts.length > 0
          const isConnected =
            signer !== null && sessionId !== null && dmk !== null

          if (parameters.debug) {
            console.info('Authorization check:', {
              hasAccounts,
              isConnected,
              accountsCount: currentAccounts.length,
              sessionId: sessionId ? 'present' : 'null',
              signer: signer ? 'present' : 'null',
              dmk: dmk ? 'present' : 'null',
            })
          }

          return hasAccounts && isConnected
        } catch (error) {
          if (parameters.debug) {
            console.error('Error checking authorization:', error)
          }
          return false
        }
      },

      async switchChain({ chainId }) {
        const chain = config.chains.find((chain) => chain.id === chainId)
        if (!chain) throw new SwitchChainError(new ChainNotConfiguredError())

        currentChainId = chainId
        config.emitter.emit('change', { chainId })

        return chain
      },

      onAccountsChanged(accounts) {
        if (accounts.length === 0) {
          config.emitter.emit('disconnect')
        } else {
          config.emitter.emit('change', {
            accounts: accounts.map((x) => getAddress(x)),
          })
        }
      },

      onChainChanged(chain) {
        const chainId = Number(chain)
        currentChainId = chainId
        config.emitter.emit('change', { chainId })
      },

      onDisconnect(_error) {
        config.emitter.emit('disconnect')
        currentAccounts = []
      },

      // Ledger-specific methods
      async getDevices() {
        if (!dmk) {
          throw new Error('Device Management Kit not initialized')
        }

        try {
          if (!sessionId) {
            if (parameters.debug) {
              console.info('No session ID, returning empty devices list')
            }
            return []
          }

          const device = await dmk.getConnectedDevice({ sessionId })
          if (parameters.debug) {
            console.info('Connected device:', device)
          }
          return device ? [device] : []
        } catch (error) {
          if (parameters.debug) {
            console.error('Error getting devices:', error)
          }
          return []
        }
      },

      async getSelectedDevice() {
        if (!dmk || !sessionId) {
          return null
        }

        try {
          const device = await dmk.getConnectedDevice({ sessionId })

          if (parameters.debug) {
            console.info('Selected device:', device)
          }

          return device || null
        } catch (error) {
          if (parameters.debug) {
            console.error('Error getting selected device:', error)
          }
          return null
        }
      },

      async selectDevice(device: any) {
        if (!dmk) {
          throw new Error('Device Management Kit not initialized')
        }

        try {
          // Connect to the specific device
          const connectResult = await dmk.connect({ device })
          sessionId = connectResult

          if (parameters.debug) {
            console.info('Selected device:', device, 'Session:', sessionId)
          }

          return connectResult
        } catch (error) {
          if (parameters.debug) {
            console.error('Error selecting device:', error)
          }
          throw error
        }
      },
    }
  })
}

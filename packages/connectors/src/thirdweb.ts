import { type CreateConnectorFn, createConnector } from '@wagmi/core'
import { defineChain } from 'thirdweb'
import {
  EIP1193,
  type InAppWalletConnectionOptions,
  ecosystemWallet,
  inAppWallet as thirdwebInAppWallet,
} from 'thirdweb/wallets'
import type { InAppWalletCreationOptions } from 'thirdweb/wallets/in-app'
import type { Address } from 'viem/accounts'

/**
 * Connect to an in-app wallet using the auth strategy of your choice.
 * @param args - Options for the in-app wallet connection.
 * @returns A wagmi connector.
 * @example
 * ```ts
 * import { createThirdwebClient } from "thirdweb";
 * import { http, createConfig } from "wagmi";
 * import { inAppWallet } from "@wagmi/connectors";
 *
 * const client = createThirdwebClient({
 *   clientId: "...",
 * })
 *
 * export const config = createConfig({
 *  chains: [sepolia],
 *  connectors: [
 *    inAppWallet({
 *      client,
 *      strategy: "google",
 *   }),
 *  ],
 *  transports: {
 *    [sepolia.id]: http(),
 *  },
 * });
 * ```
 */
export function inAppWallet(
  args: InAppWalletConnectionOptions &
    InAppWalletCreationOptions & { ecosystemId?: `ecosystem.${string}` },
): CreateConnectorFn {
  const { client, ecosystemId } = args
  const wallet = ecosystemId
    ? ecosystemWallet(ecosystemId, { partnerId: args.partnerId })
    : thirdwebInAppWallet(args)
  return createConnector((config) => ({
    id: 'in-app-wallet',
    name: 'In-App wallet',
    type: 'in-app',
    connect: async (params) => {
      const chain = defineChain(params?.chainId || 1)
      const account = params?.isReconnecting
        ? await wallet.autoConnect({
            client,
            chain,
          })
        : await wallet.connect(args)
      return { accounts: [account.address as Address], chainId: chain.id }
    },
    disconnect: async () => {
      await wallet.disconnect()
    },
    getAccounts: async () => {
      const account = wallet.getAccount()
      if (!account) {
        throw new Error('Wallet not connected')
      }
      return [account.address as Address]
    },
    getChainId: async () => {
      return wallet.getChain()?.id || 1
    },
    getProvider: async (params) => {
      return EIP1193.toProvider({
        wallet,
        client,
        chain: wallet.getChain() || defineChain(params?.chainId || 1),
      })
    },
    isAuthorized: async () => true,
    switchChain: async (params) => {
      const chain = config.chains.find((x) => x.id === params.chainId)
      if (!chain) {
        throw new Error(`Chain ${params.chainId} not supported`)
      }
      await wallet.switchChain(defineChain(chain.id))
      return chain
    },
    onAccountsChanged: () => {
      // no-op
    },
    onChainChanged: () => {
      // no-op
    },
    onDisconnect: () => {
      // no-op
    },
  }))
}

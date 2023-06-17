# Migration Guide

## 2.0.x Breaking Changes

### createConfig

- Renamed `autoConnect` to `reconnectOnMount` and defaulted to `true`.
- Removed `logger`
- `publicClient` versus `transports`

### Chains

- Removed `mainnet` and `sepolia` from main export (use `viem/chains` entrypoint instead)
- Removed `wagmi/chains` entrypoint (use `viem/chains` instead)

### Providers

- Removed `configureChains` (use `createConfig.transports`)
- Removed `alchemy`, `infura`, `public`, `jsonRpc` providers (use `createConfig.transports`)

### Connectors

- Import all connectors from `wagmi/connectors` entrypoint
- Renamed `CoinbaseWalletConnector` to `coinbaseWallet` (function instead of class)
- Renamed `InjectedConnector` to `injected` (function instead of class)
- Renamed `LedgerConnector` to `ledger` (function instead of class)
- Removed `MetaMaskConnector` (use `injected({ wallet: 'metaMask' })` instead)
- Removed `MockConnector` (TODO: Should we replace with something? `@wagmi/test.testConnector`?)
- Renamed `SafeConnector` to `safe` (function instead of class)
- Renamed `WalletConnectConnector` to `walletConnect` (function instead of class)
- Renamed `injected.getProvider` to `wallet`

### Hooks

- "Mutation" hooks (e.g. `useConnect`, `useContractWrite`, `useSendTransaction`) now pass through all TanStack Query parameters under the `mutation` key parameter
- "Query" hooks (e.g. `useBalance`, `useEnsName`, `useContractRead`) now pass through all TanStack Query parameters under the `query` key parameter
- Removed `useNetwork` (use `useAccount.chainId` instead) (TODO: should we add `chain` to `useAccount`?)
- Renamed `useSwitchNetwork` to `useSwitchChain`
- Removed `useInfiniteQuery`, `useMutation`, `useQuery`, `useQueryClient` (TODO: Should we export from wagmi? If TanStack Query was peer dependency, could tell folks to import from there instead.)
- Removed `usePublicClient` (use `config.getPublicClient` instead)
- Removed `useWebSocketClient` (use `config.getWebSocketClient` instead)

### Constants

- ABIs (TODO: Need to figure out if we want to keep them, export from viem, etc.)
  - `erc20ABI`
  - `erc721ABI`
  - `erc4626ABI`

### Errors

- TBD

### Actions

- Removed global `config` (all actions now take `config` as first parameter)
- Renamed `fetchBalance` to `getBalance`
- Renamed `fetchBlockNumber` to `getBlockNumber`
- Renamed `fetchEnsAddress` to `getEnsAddress`
- Renamed `fetchEnsAvatar` to `getEnsAvatar`
- Renamed `fetchEnsName` to `getEnsName`
- Renamed `fetchEnsResolver` to `getEnsResolver`
- Renamed `fetchFeeData` to `getFeeData`
- Renamed `fetchToken` to `getToken`
- Renamed `fetchTransaction` to `getTransaction`
- Removed `getContract` (use `viem.getContract` instead)
- Removed `getNetwork` (use `useAccount.chainId` instead) (TODO: should we add `chain` to `getAccount`?)
- Removed `getPublicClient` (use `config.getPublicClient` instead)
- Removed `getWebSocketClient` (use `config.getWebSocketClient` instead)
- Renamed `switchNetwork` to `switchChain`
- Renamed `waitForTransaction` to `waitForTransactionReceipt`
- Renamed `watchNetwork` to `watchChain`
- Removed `watchPublicClient` and `watchWebSocketClient` (TODO: Getters are coming from `config` now. Do we want to keep these?)
- Removed `watchWalletClient` (TODO: Keep this around?)

### Config

- Removed `config.connector` (use `config.state.connections[config.state.current].connector` instead)
- Removed `config.data` (use `config.state.connections[config.state.current]` instead)
- Removed `config.error`
- Removed `config.lastUsedChainId` (use `config.state.connections[config.state.current].chainId` instead)
- Removed `config.publicClient` (use `config.getPublicClient()` instead)
- Removed `config.status` (use `config.state.status` instead)
- Removed `config.webSocketClient` (use `config.getWebSocketClient()` instead) (TODO: not implemented yet)
- Removed `config.clearState` (use `config.reset()` instead)
- Removed `config.autoConnect()` (use `reconnect` action instead)
- Renamed `config.setConnectors` (TODO: Was someone using this? Dynamic? Might want to figure out a better name/API)
- Removed `config.setLastUsedConnector` (use `config.storage?.setItem('recentConnectorId', connectorId)` instead)
- Removed `getConfig` (`config` should be passed explicitly to actions instead of using global `config`)
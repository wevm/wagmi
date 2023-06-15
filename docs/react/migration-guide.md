# Migration Guide

## 2.0.x Breaking Changes

- No longer publishing separate CJS tag

### createConfig

- Renamed `autoConnect` to `reconnectOnMount`
- Removed `logger` (TODO: should we keep this?)
- `publicClient`/`webSocketClient` versus `transports`/`webSocketTransports` (TODO: need to figure out exactly what this is going to look like)

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
- Removed `config.setLastUsedConnector`
- Removed `getConfig` (`config` should be passed explicitly to actions instead of using global `config`)

### WagmiConfig

- Renamed `config` to `value`
- Renamed `Context` to `WagmiContext`

### Chains

- Removed `mainnet` and `sepolia` from main export (use `viem/chains` entrypoint instead)
- Removed `wagmi/chains` entrypoint (use `viem/chains` instead)
- Removed `Chain` type export (use `viem/chains` instead)

### Providers

- Removed `configureChains` (use `createConfig.transports` and `createConfig.webSocketTransports`)
- Removed `alchemy`, `infura`, `public`, `jsonRpc` providers (use `createConfig.transports` and `createConfig.webSocketTransports`)

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
- Renamed `useContractEvent` to `useContractEventWatch`
- Removed `useNetwork` (use `useAccount.chainId` instead) (TODO: should we add `chain` to `useAccount`?)
- Renamed `useSwitchNetwork` to `useSwitchChain`
- Renamed `useWaitForTransaction` to `useWaitForTransactionReceipt`
- Removed `useInfiniteQuery`, `useMutation`, `useQuery`, `useQueryClient` (TODO: Should we export from wagmi? If TanStack Query was peer dependency, could tell folks to import from there instead.)
- Removed `usePublicClient` (use `config.getPublicClient` instead)
- Removed `useWebSocketClient` (use `config.getWebSocketClient` instead)
- Deprecated `useFeeData`?
- Deprecated `useToken`?

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
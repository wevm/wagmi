////////////////////////////////////////////////////////////////////////////////
// Actions

export {
  type ConnectParameters,
  type ConnectReturnType,
  connect,
  type ConnectMutationOptions,
  connectMutationOptions,
} from './actions/connect.js'

export {
  type DisconnectParameters,
  disconnect,
  type DisconnectMutationOptions,
  disconnectMutationOptions,
} from './actions/disconnect.js'

export {
  type GetAccountReturnType,
  getAccount,
  type WatchAccountParameters,
  type WatchAccountReturnType,
  watchAccount,
} from './actions/getAccount.js'

export {
  type GetBlockNumberParameters,
  type GetBlockNumberReturnType,
  getBlockNumber,
  type WatchBlockNumberParameters,
  type WatchBlockNumberReturnType,
  watchBlockNumber,
  type GetBlockNumberQueryOptions,
  getBlockNumberQueryOptions,
} from './actions/getBlockNumber.js'

////////////////////////////////////////////////////////////////////////////////
// Config

export {
  type Connection,
  type Connector,
  type Config,
  type CreateConfigParameters,
  createConfig,
} from './config.js'

////////////////////////////////////////////////////////////////////////////////
// Connectors

export {
  type ConnectorEventMap,
  type CreateConnectorFn,
  createConnector,
} from './connector.js'

////////////////////////////////////////////////////////////////////////////////
// Emitter

export {
  type EventData,
  Emitter,
  createEmitter,
} from './emitter.js'

////////////////////////////////////////////////////////////////////////////////
// Errors

export {
  ChainNotConfiguredError,
  ConnectorNotFoundError,
  ConnectorAlreadyConnectedError,
} from './errors.js'

////////////////////////////////////////////////////////////////////////////////
// Storage

export {
  type Storage,
  createStorage,
  noopStorage,
} from './storage.js'

////////////////////////////////////////////////////////////////////////////////
// Utilities

export { deepEqual } from './utils/deepEqual.js'
export { normalizeChainId } from './utils/normalizeChainId.js'

////////////////////////////////////////////////////////////////////////////////
// Types

export { type Prettify } from './types.js'

////////////////////////////////////////////////////////////////////////////////
// @wagmi/connectors

export {
  type InjectedParameters,
  injected,
  type WalletConnectParameters,
  walletConnect,
} from '@wagmi/connectors'

////////////////////////////////////////////////////////////////////////////////
// @wagmi/chains

export {
  type Chain,
  arbitrum,
  arbitrumGoerli,
  arbitrumNova,
  aurora,
  auroraTestnet,
  avalanche,
  avalancheFuji,
  baseGoerli,
  boba,
  bronos,
  bronosTestnet,
  bsc,
  bscTestnet,
  canto,
  celo,
  celoAlfajores,
  celoCannoli,
  confluxESpace,
  cronos,
  crossbell,
  dfk,
  dogechain,
  ekta,
  ektaTestnet,
  evmos,
  evmosTestnet,
  fantom,
  fantomTestnet,
  filecoin,
  filecoinCalibration,
  filecoinHyperspace,
  flare,
  flareTestnet,
  foundry,
  fuse,
  gnosis,
  gnosisChiado,
  goerli,
  haqqMainnet,
  haqqTestedge2,
  hardhat,
  harmonyOne,
  iotex,
  iotexTestnet,
  klaytn,
  lineaTestnet,
  localhost,
  mainnet,
  metis,
  metisGoerli,
  moonbaseAlpha,
  moonbeam,
  moonriver,
  neonDevnet,
  nexi,
  oasys,
  okc,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  polygonZkEvm,
  polygonZkEvmTestnet,
  pulsechain,
  pulsechainV4,
  scrollTestnet,
  sepolia,
  skaleBlockBrawlers,
  skaleCalypso,
  skaleCalypsoTestnet,
  skaleChaosTestnet,
  skaleCryptoBlades,
  skaleCryptoColosseum,
  skaleEuropa,
  skaleEuropaTestnet,
  skaleExorde,
  skaleHumanProtocol,
  skaleNebula,
  skaleNebulaTestnet,
  skaleRazor,
  skaleTitan,
  skaleTitanTestnet,
  shardeumSphinx,
  songbird,
  songbirdTestnet,
  syscoin,
  taraxa,
  taraxaTestnet,
  telos,
  telosTestnet,
  thunderTestnet,
  wanchain,
  wanchainTestnet,
  xdc,
  xdcTestnet,
  zhejiang,
  zkSync,
  zkSyncTestnet,
} from '@wagmi/chains'

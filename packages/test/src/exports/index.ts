// biome-ignore lint/performance/noBarrelFile: entrypoint module
export { chain, mainnet, mainnet2, optimism } from '../chains.js'
export {
  mainnet2TestClient,
  mainnetTestClient,
  optimismTestClient,
  testClient,
} from '../clients.js'
export { config } from '../config.js'
export {
  abi,
  accounts,
  address,
  bytecode,
  privateKey,
  typedData,
  walletConnectProjectId,
} from '../constants.js'

export { addressRegex, transactionHashRegex } from '../regex.js'

export { wait } from '../utils.js'

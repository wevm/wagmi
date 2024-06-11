// biome-ignore lint/performance/noBarrelFile: entrypoint module
export { chain, mainnet, mainnet2, optimism } from '../chains.js'

export {
  abi,
  accounts,
  address,
  bytecode,
  privateKey,
  typedData,
  walletConnectProjectId,
} from '../constants.js'

export {
  testClient,
  mainnetTestClient,
  mainnet2TestClient,
  optimismTestClient,
} from '../clients.js'

export { config } from '../config.js'

export { addressRegex, transactionHashRegex } from '../regex.js'

export { wait } from '../utils.js'

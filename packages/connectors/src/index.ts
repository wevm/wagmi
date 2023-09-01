export { Connector } from './base'
export type { ConnectorData, ConnectorEvents } from './base'

export {
  ChainNotConfiguredForConnectorError,
  ConnectorNotFoundError,
} from './errors'

export { normalizeChainId } from './utils/normalizeChainId'

export type { WindowProvider } from './types'

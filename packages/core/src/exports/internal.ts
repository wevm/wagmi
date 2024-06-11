////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  type WatchChainsParameters,
  type WatchChainsReturnType,
  watchChains,
} from '../actions/watchChains.js'

////////////////////////////////////////////////////////////////////////////////
// Emitter
////////////////////////////////////////////////////////////////////////////////

export {
  type EventData,
  Emitter,
  createEmitter,
} from '../createEmitter.js'

////////////////////////////////////////////////////////////////////////////////
// Types
////////////////////////////////////////////////////////////////////////////////

export { type SelectChains } from '../types/chain.js'

export {
  type ChainIdParameter,
  type ConnectorParameter,
  type ScopeKeyParameter,
} from '../types/properties.js'

export {
  type Evaluate,
  type ExactPartial,
  type Mutable,
  type Omit,
  type OneOf,
  type UnionEvaluate,
  type UnionOmit,
  type UnionPartial,
} from '../types/utils.js'

////////////////////////////////////////////////////////////////////////////////
// Utilities
////////////////////////////////////////////////////////////////////////////////

export { deepEqual } from '../utils/deepEqual.js'

export { uid } from '../utils/uid.js'

export { loadDefault } from '../utils/loadDefault.js'

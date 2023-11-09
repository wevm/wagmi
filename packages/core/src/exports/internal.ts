////////////////////////////////////////////////////////////////////////////////
// Connectors

export {
  type InjectedParameters,
  injected,
} from '../connectors/injected.js'

export {
  type MockParameters,
  mock,
} from '../connectors/mock.js'

////////////////////////////////////////////////////////////////////////////////
// Emitter

export {
  type EventData,
  Emitter,
  createEmitter,
} from '../createEmitter.js'

////////////////////////////////////////////////////////////////////////////////
// Query

export { type ScopeKeyParameter } from '../query/types.js'

////////////////////////////////////////////////////////////////////////////////
// Types

export { type ChainIdParameter } from '../types/properties.js'

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

export { deepEqual } from '../utils/deepEqual.js'

export { uid } from '../utils/uid.js'

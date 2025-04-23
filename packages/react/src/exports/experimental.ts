////////////////////////////////////////////////////////////////////////////////
// Hooks
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  /** @deprecated This is no longer experimental – use `import type { UseCallsStatusParameters } from 'wagmi'` instead. */
  type UseCallsStatusParameters,
  /** @deprecated This is no longer experimental – use `import type { UseCallsStatusReturnType } from 'wagmi'` instead. */
  type UseCallsStatusReturnType,
  /** @deprecated This is no longer experimental – use `import { useCallsStatus } from 'wagmi'` instead. */
  useCallsStatus,
} from '../hooks/useCallsStatus.js'

export {
  /** @deprecated This is no longer experimental – use `import type { UseCapabilitiesParameters } from 'wagmi'` instead. */
  type UseCapabilitiesParameters,
  /** @deprecated This is no longer experimental – use `import type { UseCapabilitiesReturnType } from 'wagmi'` instead. */
  type UseCapabilitiesReturnType,
  /** @deprecated This is no longer experimental – use `import { useCapabilities } from 'wagmi'` instead. */
  useCapabilities,
} from '../hooks/useCapabilities.js'

export {
  /** @deprecated This is no longer experimental – use `import type { UseSendCallsParameters } from 'wagmi'` instead. */
  type UseSendCallsParameters,
  /** @deprecated This is no longer experimental – use `import type { UseSendCallsReturnType } from 'wagmi'` instead. */
  type UseSendCallsReturnType,
  /** @deprecated This is no longer experimental – use `import { useSendCalls } from 'wagmi'` instead. */
  useSendCalls,
} from '../hooks/useSendCalls.js'

export {
  /** @deprecated This is no longer experimental – use `import type { UseShowCallsStatusParameters } from 'wagmi'` instead. */
  type UseShowCallsStatusParameters,
  /** @deprecated This is no longer experimental – use `import type { UseShowCallsStatusReturnType } from 'wagmi'` instead. */
  type UseShowCallsStatusReturnType,
  /** @deprecated This is no longer experimental – use `import { useShowCallsStatus } from 'wagmi'` instead. */
  useShowCallsStatus,
} from '../hooks/useShowCallsStatus.js'

export {
  /** @deprecated This is no longer experimental – use `import type { UseWaitForCallsStatusParameters } from 'wagmi'` instead. */
  type UseWaitForCallsStatusParameters,
  /** @deprecated This is no longer experimental – use `import type { UseWaitForCallsStatusReturnType } from 'wagmi'` instead. */
  type UseWaitForCallsStatusReturnType,
  /** @deprecated This is no longer experimental – use `import { useWaitForCallsStatus } from 'wagmi'` instead. */
  useWaitForCallsStatus,
} from '../hooks/useWaitForCallsStatus.js'

export {
  /** @deprecated Use `UseSendCallsParameters` instead. */
  type UseWriteContractsParameters,
  /** @deprecated Use `UseSendCallsReturnType` instead. */
  type UseWriteContractsReturnType,
  /** @deprecated Use `useSendCalls` instead. */
  useWriteContracts,
} from '../experimental/hooks/useWriteContracts.js'

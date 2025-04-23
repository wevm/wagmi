////////////////////////////////////////////////////////////////////////////////
// Actions
////////////////////////////////////////////////////////////////////////////////

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
  /** @deprecated This is no longer experimental – use `import type { GetCallsStatusErrorType } from '@wagmi/core'` instead. */
  type GetCallsStatusErrorType,
  /** @deprecated This is no longer experimental – use `import type { GetCallsStatusParameters } from '@wagmi/core'` instead. */
  type GetCallsStatusParameters,
  /** @deprecated This is no longer experimental – use `import type { GetCallsStatusReturnType } from '@wagmi/core'` instead. */
  type GetCallsStatusReturnType,
  /** @deprecated This is no longer experimental – use `import { getCallsStatus } from '@wagmi/core'` instead. */
  getCallsStatus,
} from '../actions/getCallsStatus.js'

export {
  /** @deprecated This is no longer experimental – use `import type { GetCapabilitiesErrorType } from '@wagmi/core'` instead. */
  type GetCapabilitiesErrorType,
  /** @deprecated This is no longer experimental – use `import type { GetCapabilitiesParameters } from '@wagmi/core'` instead. */
  type GetCapabilitiesParameters,
  /** @deprecated This is no longer experimental – use `import type { GetCapabilitiesReturnType } from '@wagmi/core'` instead. */
  type GetCapabilitiesReturnType,
  /** @deprecated This is no longer experimental – use `import { getCapabilities } from '@wagmi/core'` instead. */
  getCapabilities,
} from '../actions/getCapabilities.js'

export {
  /** @deprecated This is no longer experimental – use `import type { SendCallsErrorType } from '@wagmi/core'` instead. */
  type SendCallsErrorType,
  /** @deprecated This is no longer experimental – use `import type { SendCallsParameters } from '@wagmi/core'` instead. */
  type SendCallsParameters,
  /** @deprecated This is no longer experimental – use `import type { SendCallsReturnType } from '@wagmi/core'` instead. */
  type SendCallsReturnType,
  /** @deprecated This is no longer experimental – use `import { sendCalls } from '@wagmi/core'` instead. */
  sendCalls,
} from '../actions/sendCalls.js'

export {
  /** @deprecated This is no longer experimental – use `import type { ShowCallsStatusErrorType } from '@wagmi/core'` instead. */
  type ShowCallsStatusErrorType,
  /** @deprecated This is no longer experimental – use `import type { ShowCallsStatusParameters } from '@wagmi/core'` instead. */
  type ShowCallsStatusParameters,
  /** @deprecated This is no longer experimental – use `import type { ShowCallsStatusReturnType } from '@wagmi/core'` instead. */
  type ShowCallsStatusReturnType,
  /** @deprecated This is no longer experimental – use `import { showCallsStatus } from '@wagmi/core'` instead. */
  showCallsStatus,
} from '../actions/showCallsStatus.js'

export {
  /** @deprecated This is no longer experimental – use `import type { WaitForCallsStatusErrorType } from '@wagmi/core'` instead. */
  type WaitForCallsStatusErrorType,
  /** @deprecated This is no longer experimental – use `import type { WaitForCallsStatusParameters } from '@wagmi/core'` instead. */
  type WaitForCallsStatusParameters,
  /** @deprecated This is no longer experimental – use `import type { WaitForCallsStatusReturnType } from '@wagmi/core'` instead. */
  type WaitForCallsStatusReturnType,
  /** @deprecated This is no longer experimental – use `import { waitForCallsStatus } from '@wagmi/core'` instead. */
  waitForCallsStatus,
} from '../actions/waitForCallsStatus.js'

export {
  /** @deprecated Use `SendCallsErrorType` instead. */
  type WriteContractsErrorType,
  /** @deprecated Use `SendCallsParameters` instead. */
  type WriteContractsParameters,
  /** @deprecated Use `SendCallsReturnType` instead. */
  type WriteContractsReturnType,
  /** @deprecated Use `sendCalls` instead. */
  writeContracts,
} from '../experimental/actions/writeContracts.js'

////////////////////////////////////////////////////////////////////////////////
// Tanstack Query
////////////////////////////////////////////////////////////////////////////////

export {
  /** @deprecated This is no longer experimental – use `import type { GetCallsStatusData } from '@wagmi/core/query'` instead. */
  type GetCallsStatusData,
  /** @deprecated This is no longer experimental – use `import type { GetCallsStatusOptions } from '@wagmi/core/query'` instead. */
  type GetCallsStatusOptions,
  /** @deprecated This is no longer experimental – use `import type { GetCallsStatusQueryFnData } from '@wagmi/core/query'` instead. */
  type GetCallsStatusQueryFnData,
  /** @deprecated This is no longer experimental – use `import type { GetCallsStatusQueryKey } from '@wagmi/core/query'` instead. */
  type GetCallsStatusQueryKey,
  /** @deprecated This is no longer experimental – use `import { getCallsStatusQueryOptions } from '@wagmi/core/query'` instead. */
  getCallsStatusQueryOptions,
  /** @deprecated This is no longer experimental – use `import { getCallsStatusQueryKey } from '@wagmi/core/query'` instead. */
  getCallsStatusQueryKey,
} from '../query/getCallsStatus.js'

export {
  /** @deprecated This is no longer experimental – use `import type { GetCapabilitiesData } from '@wagmi/core/query'` instead. */
  type GetCapabilitiesData,
  /** @deprecated This is no longer experimental – use `import type { GetCapabilitiesOptions } from '@wagmi/core/query'` instead. */
  type GetCapabilitiesOptions,
  /** @deprecated This is no longer experimental – use `import type { GetCapabilitiesQueryFnData } from '@wagmi/core/query'` instead. */
  type GetCapabilitiesQueryFnData,
  /** @deprecated This is no longer experimental – use `import type { GetCapabilitiesQueryKey } from '@wagmi/core/query'` instead. */
  type GetCapabilitiesQueryKey,
  /** @deprecated This is no longer experimental – use `import { getCapabilitiesQueryOptions } from '@wagmi/core/query'` instead. */
  getCapabilitiesQueryOptions,
  /** @deprecated This is no longer experimental – use `import { getCapabilitiesQueryKey } from '@wagmi/core/query'` instead. */
  getCapabilitiesQueryKey,
} from '../query/getCapabilities.js'

export {
  /** @deprecated This is no longer experimental – use `import type { SendCallsData } from '@wagmi/core/query'` instead. */
  type SendCallsData,
  /** @deprecated This is no longer experimental – use `import type { SendCallsMutate } from '@wagmi/core/query'` instead. */
  type SendCallsMutate,
  /** @deprecated This is no longer experimental – use `import type { SendCallsMutateAsync } from '@wagmi/core/query'` instead. */
  type SendCallsMutateAsync,
  /** @deprecated This is no longer experimental – use `import type { SendCallsVariables } from '@wagmi/core/query'` instead. */
  type SendCallsVariables,
  /** @deprecated This is no longer experimental – use `import { sendCallsMutationOptions } from '@wagmi/core/query'` instead. */
  sendCallsMutationOptions,
} from '../query/sendCalls.js'

export {
  /** @deprecated This is no longer experimental – use `import type { ShowCallsStatusData } from '@wagmi/core/query'` instead. */
  type ShowCallsStatusData,
  /** @deprecated This is no longer experimental – use `import type { ShowCallsStatusMutate } from '@wagmi/core/query'` instead. */
  type ShowCallsStatusMutate,
  /** @deprecated This is no longer experimental – use `import type { ShowCallsStatusMutateAsync } from '@wagmi/core/query'` instead. */
  type ShowCallsStatusMutateAsync,
  /** @deprecated This is no longer experimental – use `import type { ShowCallsStatusVariables } from '@wagmi/core/query'` instead. */
  type ShowCallsStatusVariables,
  /** @deprecated This is no longer experimental – use `import { showCallsStatusMutationOptions } from '@wagmi/core/query'` instead. */
  showCallsStatusMutationOptions,
} from '../query/showCallsStatus.js'

export {
  /** @deprecated This is no longer experimental – use `import type { WaitForCallsStatusData } from '@wagmi/core/query'` instead. */
  type WaitForCallsStatusData,
  /** @deprecated This is no longer experimental – use `import type { WaitForCallsStatusOptions } from '@wagmi/core/query'` instead. */
  type WaitForCallsStatusOptions,
  /** @deprecated This is no longer experimental – use `import type { WaitForCallsStatusQueryFnData } from '@wagmi/core/query'` instead. */
  type WaitForCallsStatusQueryFnData,
  /** @deprecated This is no longer experimental – use `import type { WaitForCallsStatusQueryKey } from '@wagmi/core/query'` instead. */
  type WaitForCallsStatusQueryKey,
  /** @deprecated This is no longer experimental – use `import { waitForCallsStatusQueryKey } from '@wagmi/core/query'` instead. */
  waitForCallsStatusQueryKey,
  /** @deprecated This is no longer experimental – use `import { waitForCallsStatusQueryOptions } from '@wagmi/core/query'` instead. */
  waitForCallsStatusQueryOptions,
} from '../query/waitForCallsStatus.js'

export {
  /** @deprecated Use `SendCallsData` instead. */
  type WriteContractsData,
  /** @deprecated Use `SendCallsMutate` instead. */
  type WriteContractsMutate,
  /** @deprecated Use `SendCallsMutateAsync` instead. */
  type WriteContractsMutateAsync,
  /** @deprecated Use `SendCallsVariables` instead. */
  type WriteContractsVariables,
  /** @deprecated Use `sendCallsMutationOptions` instead. */
  writeContractsMutationOptions,
} from '../experimental/query/writeContracts.js'

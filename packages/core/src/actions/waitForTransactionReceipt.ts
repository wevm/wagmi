import type { Chain } from 'viem'
import { hexToString, withTimeout } from 'viem'
import {
  call,
  getTransaction,
  type WaitForTransactionReceiptErrorType as viem_WaitForTransactionReceiptErrorType,
  type WaitForTransactionReceiptParameters as viem_WaitForTransactionReceiptParameters,
  type WaitForTransactionReceiptReturnType as viem_WaitForTransactionReceiptReturnType,
  waitForTransactionReceipt as viem_waitForTransactionReceipt,
} from 'viem/actions'

import type { Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type { ChainIdParameter } from '../types/properties.js'
import type { Compute, IsNarrowable } from '../types/utils.js'
import { getAction } from '../utils/getAction.js'

export type WaitForTransactionReceiptParameters<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
> = Compute<
  viem_WaitForTransactionReceiptParameters & ChainIdParameter<config, chainId>
>

export type WaitForTransactionReceiptReturnType<
  config extends Config = Config,
  chainId extends
    config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = Compute<
  {
    [key in keyof chains]: viem_WaitForTransactionReceiptReturnType<
      IsNarrowable<chains[key], Chain> extends true ? chains[key] : undefined
    > & { chainId: chains[key]['id'] }
  }[number]
>

export type WaitForTransactionReceiptErrorType =
  viem_WaitForTransactionReceiptErrorType

export async function waitForTransactionReceipt<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: WaitForTransactionReceiptParameters<config, chainId>,
): Promise<WaitForTransactionReceiptReturnType<config, chainId>> {
  const { chainId, timeout = 0, ...rest } = parameters

  const client = config.getClient({ chainId })
  const action = getAction(
    client,
    viem_waitForTransactionReceipt,
    'waitForTransactionReceipt',
  )
  const receipt = await action({ ...rest, timeout })

  if (receipt.status === 'reverted') {
    // Decoding the revert reason is a best-effort enhancement over the reverted
    // receipt viem already returned: it issues extra RPC calls
    // (`eth_getTransactionByHash` + a replay `eth_call`) that a successful
    // receipt never triggers. Those calls can fail, or — through a `fallback`
    // transport that advances to an unhealthy endpoint — hang indefinitely,
    // leaving the receipt promise stranded (wevm/wagmi#4972). Bound the lookup
    // with a timeout so a slow/dead endpoint can never prevent settlement; on
    // timeout still throw a reverted-transaction error. Prefer the caller's
    // `timeout` when provided, else a default (matching viem's HTTP default so a
    // legitimately slow response isn't preempted before the transport times out).
    //
    // `timeout` defaults to 0, which viem treats as "no timeout" for the receipt
    // wait; `> 0` makes it explicit that 0 means "no caller timeout" and must use
    // the internal bound (viem's `withTimeout` only arms a timer for `> 0`, so 0
    // would otherwise leave the reason lookup unbounded again).
    const reasonLookupTimeout = timeout > 0 ? timeout : 10_000
    let error: Error
    try {
      error = await withTimeout(
        async () => {
          const action_getTransaction = getAction(
            client,
            getTransaction,
            'getTransaction',
          )
          const { from: account, ...txn } = await action_getTransaction({
            hash: receipt.transactionHash,
          })
          const action_call = getAction(client, call, 'call')
          const code = await action_call({
            ...(txn as any),
            account,
            data: txn.input,
            gasPrice: txn.type !== 'eip1559' ? txn.gasPrice : undefined,
            maxFeePerGas: txn.type === 'eip1559' ? txn.maxFeePerGas : undefined,
            maxPriorityFeePerGas:
              txn.type === 'eip1559' ? txn.maxPriorityFeePerGas : undefined,
          })
          const reason = code?.data
            ? hexToString(`0x${code.data.substring(138)}`)
            : 'unknown reason'
          return new Error(reason)
        },
        {
          timeout: reasonLookupTimeout,
          errorInstance: new Error('unknown reason'),
        },
      )
    } catch (err) {
      // A failed reason lookup (RPC error, `call` revert error, or timeout) must
      // still settle the reverted-tx path — surface whatever error we have.
      error = err as Error
    }
    throw error
  }

  return {
    ...receipt,
    chainId: client.chain.id,
  } as WaitForTransactionReceiptReturnType<config, chainId>
}

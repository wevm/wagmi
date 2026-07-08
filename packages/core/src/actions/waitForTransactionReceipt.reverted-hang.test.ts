// Regression test for wevm/wagmi#4972 — models the actual EXP4b mechanism
// (see investigation-4972-experimental.md §11/§12), not a synthetic single hang.
//
// On a *reverted* receipt, `@wagmi/core`'s `waitForTransactionReceipt` runs a
// wagmi-only revert-reason decode: `eth_getTransactionByHash` + a replay
// `eth_call` (methods a *successful* receipt never triggers). Through a
// `fallback([primary, secondary])` transport, when the primary answers that
// replay `eth_call` with a **non-`shouldThrow`** error (a plain JSON-RPC/server
// error, NOT an `ExecutionRevertedError`), viem's fallback advances to the
// secondary endpoint. If the secondary's `eth_call` never usefully resolves, the
// `await` at waitForTransactionReceipt.ts:70 strands and the action never settles.
//
// This is stronger than "any awaited never-resolving transport hangs": the hang
// only reaches the dead endpoint *because* wagmi (a) makes revert-only extra
// calls and (b) does not bound/guard the decode, so viem's correct-by-design
// fallback-advance routes it to the unhealthy RPC. A success receipt takes none
// of that path.
//
// Deterministic + Anvil-independent (in-memory viem transports). `revertedHang`
// FAILS before a fix (action never settles); the recorded RPC trace proves the
// EXP4b advance actually happened. `successControl` is the control.
import { custom, fallback } from 'viem'
import { expect, test } from 'vitest'

import { createConfig } from '../createConfig.js'
import { waitForTransactionReceipt } from './waitForTransactionReceipt.js'

const hash =
  '0x745367f76807d411b7fa4c3a552a62e3e45303ef40145fff04d84b867c2575d3' as const
const b32 = `0x${'ab'.repeat(32)}` as const
const addr = `0x${'11'.repeat(20)}` as const
const from = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' as const
const chainId = 84532

const receipt = (status: '0x0' | '0x1') => ({
  transactionHash: hash,
  transactionIndex: '0x0',
  blockHash: b32,
  blockNumber: '0x1',
  from,
  to: addr,
  cumulativeGasUsed: '0x5208',
  gasUsed: '0x5208',
  contractAddress: null,
  logs: [],
  logsBloom: `0x${'00'.repeat(256)}`,
  status,
  effectiveGasPrice: '0x1',
  type: '0x2',
})
const tx = {
  hash,
  nonce: '0x0',
  blockHash: b32,
  blockNumber: '0x1',
  transactionIndex: '0x0',
  from,
  to: addr,
  value: '0x0',
  gas: '0x5208',
  input: '0xdeadbeef',
  type: '0x2',
  maxFeePerGas: '0x2',
  maxPriorityFeePerGas: '0x1',
  chainId: '0x14a34',
  v: '0x1',
  r: b32,
  s: b32,
}

const chain = {
  id: chainId,
  name: 'Base Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: ['http://127.0.0.1:0'] } },
} as const

type TraceEntry = { endpoint: 'primary' | 'secondary'; method: string }

// One labelled transport. `ethCall`:
//  - 'answer' → returns `0x` (healthy replay, no revert reason)
//  - 'server-error' → throws a non-`ExecutionRevertedError` JSON-RPC server error
//    (code -32000) → viem `fallback` does NOT `shouldThrow` → advances to next
//  - 'hang' → never resolves (models the dead/unhealthy endpoint)
function endpointTransport(
  endpoint: 'primary' | 'secondary',
  receiptStatus: '0x0' | '0x1',
  ethCall: 'answer' | 'server-error' | 'hang',
  trace: TraceEntry[],
) {
  return custom(
    {
      async request({ method }: { method: string }) {
        trace.push({ endpoint, method })
        switch (method) {
          case 'eth_chainId':
            return '0x14a34'
          case 'eth_blockNumber':
            return '0x2'
          case 'eth_getTransactionReceipt':
            return receipt(receiptStatus)
          case 'eth_getTransactionByHash':
            return tx
          case 'eth_call':
            if (ethCall === 'hang') return new Promise(() => {})
            if (ethCall === 'server-error') {
              const error = new Error('Internal server error') as Error & {
                code: number
              }
              // Non-`shouldThrow` for viem fallback → advances to the next
              // transport (unlike a true ExecutionRevertedError, code 3).
              error.code = -32000
              throw error
            }
            return '0x'
          default:
            return '0x'
        }
      },
    },
    { retryCount: 0 },
  )
}

function makeConfig(receiptStatus: '0x0' | '0x1') {
  const trace: TraceEntry[] = []
  // Primary: healthy for receipt/getTransaction, but its revert-replay eth_call
  // fails with a server error. Secondary: its eth_call hangs (dead endpoint).
  const transport = fallback(
    [
      endpointTransport('primary', receiptStatus, 'server-error', trace),
      endpointTransport('secondary', receiptStatus, 'hang', trace),
    ],
    { rank: false, retryCount: 0 },
  )
  const config = createConfig({
    chains: [chain],
    pollingInterval: 20,
    storage: null,
    transports: { [chainId]: transport },
  } as any)
  return { config, trace }
}

// Trace filtered to the meaningful methods, with adjacent duplicates collapsed
// (block-number polling can re-hit eth_getTransactionReceipt).
const KEY = new Set([
  'eth_getTransactionReceipt',
  'eth_getTransactionByHash',
  'eth_call',
])
function keyTrace(trace: TraceEntry[]) {
  const out: TraceEntry[] = []
  for (const e of trace) {
    if (!KEY.has(e.method)) continue
    const prev = out[out.length - 1]
    if (prev && prev.endpoint === e.endpoint && prev.method === e.method)
      continue
    out.push(e)
  }
  return out
}

async function settlesWithin(promise: Promise<unknown>, ms: number) {
  let timer: NodeJS.Timeout
  const deadline = new Promise<'__unsettled__'>((resolve) => {
    timer = setTimeout(() => resolve('__unsettled__'), ms)
  })
  try {
    const result = await Promise.race([
      promise.then(
        () => 'resolved' as const,
        () => 'rejected' as const,
      ),
      deadline,
    ])
    return result !== '__unsettled__'
  } finally {
    clearTimeout(timer!)
  }
}

test('#4972 regression: reverted receipt whose primary reason-decode eth_call errors advances the fallback to a hanging secondary and must still settle', async () => {
  const { config, trace } = makeConfig('0x0')
  // Pass an explicit `timeout` to bound the revert-reason lookup quickly (same
  // `withTimeout` code path the internal 10s default uses). Before the fix the
  // decode is unbounded and never settles; after the fix it settles within the
  // bound. Deadline sits well above the 500ms lookup timeout.
  const settled = await settlesWithin(
    waitForTransactionReceipt(config, { hash, chainId, timeout: 500 } as any),
    2000,
  )

  // Mechanism proof (EXP4b): receipt + getTransaction on the primary, primary
  // eth_call errors, viem fallback advances → secondary eth_call. This holds
  // both before and after any fix (the fallback-advance is viem, by design).
  expect(keyTrace(trace)).toEqual([
    { endpoint: 'primary', method: 'eth_getTransactionReceipt' },
    { endpoint: 'primary', method: 'eth_getTransactionByHash' },
    { endpoint: 'primary', method: 'eth_call' },
    { endpoint: 'secondary', method: 'eth_call' },
  ])

  // The bug (C8): the action never settles before the deadline.
  // Before fix: false. After fix (bounded/guarded decode): true.
  expect(settled).toBe(true)
})

test('#4972 control: successful receipt resolves without touching eth_call or the secondary endpoint', async () => {
  const { config, trace } = makeConfig('0x1')
  const settled = await settlesWithin(
    waitForTransactionReceipt(config, { hash, chainId } as any),
    2000,
  )

  // Success skips the revert branch entirely: only eth_getTransactionReceipt on
  // the primary; no eth_call anywhere; the hanging secondary is never reached.
  expect(keyTrace(trace)).toEqual([
    { endpoint: 'primary', method: 'eth_getTransactionReceipt' },
  ])
  expect(trace.some((e) => e.method === 'eth_call')).toBe(false)
  expect(trace.some((e) => e.endpoint === 'secondary')).toBe(false)
  expect(settled).toBe(true)
})

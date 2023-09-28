import { useState } from 'react'
import type { Hex } from 'viem'
import { useWatchPendingTransactions } from 'wagmi'

export function WatchPendingTransactions() {
  const [hashes, setHashes] = useState<Hex[]>([])
  useWatchPendingTransactions({
    listener: (hashes) => setHashes((x) => [...x, ...hashes]),
  })

  return (
    <div>
      <details>
        <summary>{hashes.length} hashes logged</summary>
        {hashes.reverse().join('\n')}
      </details>
    </div>
  )
}

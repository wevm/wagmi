import { fetchBlockNumber, watchBlockNumber } from '@wagmi/core'
import React, { useEffect, useState } from 'react'

export default function BlockNumber() {
  const [blockNumber, setBlockNumber] = useState<number | undefined>()

  useEffect(() => {
    ;(async () => {
      setBlockNumber(await fetchBlockNumber())
      const unwatch = watchBlockNumber(setBlockNumber)
      return unwatch
    })()
  }, [])

  return <div>Block number: {blockNumber}</div>
}

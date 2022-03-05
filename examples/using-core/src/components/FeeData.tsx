import { FetchFeeDataResult, fetchFeeData, watchFeeData } from '@wagmi/core'
import React, { useEffect, useState } from 'react'

export default function FeeData() {
  const [feeData, setFeeData] = useState<FetchFeeDataResult>()

  useEffect(() => {
    ;(async () => {
      setFeeData(await fetchFeeData())
      const unwatch = watchFeeData({ listenToBlock: true }, setFeeData)
      return unwatch
    })()
  }, [])

  return <div>Fee data: {JSON.stringify(feeData)}</div>
}

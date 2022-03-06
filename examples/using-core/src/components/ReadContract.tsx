import { readContract } from '@wagmi/core'
import { Result } from 'ethers/lib/utils'
import React, { useEffect, useState } from 'react'

import wagmigotchiABI from './wagmigotchi-abi.json'

export default function ReadContract() {
  const [result, setResult] = useState<Result>()
  useEffect(() => {
    ;(async () => {
      const result = await readContract(
        {
          addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
          contractInterface: wagmigotchiABI,
        },
        'getAlive',
      )
      setResult(result)
    })()
  }, [])
  return <div>Is Wagmigotchi alive?: {JSON.stringify(result)}</div>
}

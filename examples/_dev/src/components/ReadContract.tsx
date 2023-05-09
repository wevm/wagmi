import { useState } from 'react'
import type { Address } from 'wagmi'
import { useContractRead } from 'wagmi'

import { wagmigotchiContractConfig } from './contracts'

export const ReadContract = () => {
  return (
    <div>
      <div>
        <GetAlive />
      </div>
      {false && (
        <div>
          <Love />
        </div>
      )}
    </div>
  )
}

const GetAlive = () => {
  const { data, isRefetching, isSuccess, refetch } = useContractRead({
    ...wagmigotchiContractConfig,
    functionName: 'getAlive',
  })

  return (
    <div>
      Is wagmigotchi alive?: {isSuccess && <span>{data ? 'yes' : 'no'}</span>}
      <button
        disabled={isRefetching}
        onClick={() => refetch()}
        style={{ marginLeft: 4 }}
      >
        {isRefetching ? 'loading...' : 'refetch'}
      </button>
    </div>
  )
}

const Love = () => {
  const [address, setAddress] = useState<Address>(
    '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  )
  const { data, isFetching, isRefetching, isSuccess } = useContractRead({
    ...wagmigotchiContractConfig,
    functionName: 'love',
    args: [address],
    enabled: Boolean(address),
  })

  const [value, setValue] = useState('')

  return (
    <div>
      Get wagmigotchi love:
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="wallet address"
        style={{ marginLeft: 4 }}
        value={value}
      />
      <button onClick={() => setAddress(value as Address)}>
        {isFetching
          ? isRefetching
            ? 'refetching...'
            : 'fetching...'
          : 'fetch'}
      </button>
      {isSuccess && <div>{data?.toString()}</div>}
    </div>
  )
}

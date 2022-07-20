import { useState } from 'react'
import { useContractRead } from 'wagmi'

import wagmigotchiAbi from './wagmigotchi-abi.json'

const wagmigotchiContractConfig = {
  addressOrName: '0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7',
  contractInterface: wagmigotchiAbi,
}

export const ReadContract = () => {
  return (
    <div>
      <div>
        <GetAlive />
      </div>
      <div>
        <Love />
      </div>
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
  const [address, setAddress] = useState<string>('')
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
      <button onClick={() => setAddress(value)}>
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

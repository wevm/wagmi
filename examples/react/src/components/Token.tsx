import { useState } from 'react'
import type { Address } from 'wagmi'
import { useToken } from 'wagmi'

export const Token = () => {
  const [address, setAddress] = useState<Address>(
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  )
  const { data, isError, isLoading, refetch } = useToken({ address })

  if (isLoading) return <div>Fetching token…</div>
  if (isError) return <div>Error fetching token</div>
  return (
    <div>
      {data?.totalSupply?.formatted} {data?.symbol}
      <div>
        <input
          onChange={(e) => setAddress(e.target.value as Address)}
          placeholder="token address"
          value={address}
        />
        <button onClick={() => refetch()}>fetch</button>
      </div>
    </div>
  )
}

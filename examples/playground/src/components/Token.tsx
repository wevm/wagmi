import { useState } from 'react'
import { useToken } from 'wagmi'

export const Token = () => {
  const { data, isError, isLoading, getToken } = useToken({
    address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
  })

  const [address, setAddress] = useState<string>()

  if (isLoading) return <div>Fetching token…</div>
  if (isError) return <div>Error fetching token</div>
  return (
    <div>
      {data?.totalSupply?.formatted} {data?.symbol}
      <div>
        <input
          onChange={(e) => setAddress(e.target.value)}
          placeholder="token address"
          value={address}
        />
        <button onClick={() => getToken({ address })}>fetch</button>
      </div>
    </div>
  )
}

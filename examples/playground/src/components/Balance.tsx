import { useState } from 'react'
import { useAccount, useBalance } from 'wagmi'

export const Balance = () => {
  return (
    <div>
      <div>
        <AccountBalance />
      </div>
      <div>
        <FindBalance />
      </div>
    </div>
  )
}

const AccountBalance = () => {
  const { data: account } = useAccount()
  const { data, refetch } = useBalance({
    addressOrName: account?.address,
    enabled: false,
    watch: true,
  })

  return (
    <div>
      {data?.formatted}
      <button onClick={() => refetch()}>fetch</button>
    </div>
  )
}

const FindBalance = () => {
  const { data, isLoading, getBalance } = useBalance()

  const [address, setAddress] = useState('')

  return (
    <div>
      Find balance:{' '}
      <input
        onChange={(e) => setAddress(e.target.value)}
        placeholder="wallet address"
        value={address}
      />
      <button onClick={() => getBalance({ addressOrName: address })}>
        {isLoading ? 'fetching...' : 'fetch'}
      </button>
      <div>{data?.formatted}</div>
    </div>
  )
}

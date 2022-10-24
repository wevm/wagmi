import { useState } from 'react'
import { useAccount, useAllowance, useToken } from 'wagmi'

export const Allowance = () => {
  return (
    <div>
      <div>
        <AccountAllowance />
      </div>
      <div>
        <FindAllowance />
      </div>
    </div>
  )
}

const AccountAllowance = () => {
  const { address } = useAccount()
  const { data: tokenData } = useToken({
    address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  })
  const { data, refetch } = useAllowance({
    ownerAddressOrName: address,
    spenderAddressOrName: 'smakosh.eth',
    token: tokenData?.address,
    formatUnits: tokenData?.decimals,
    watch: true,
    enabled: !!tokenData || !!address,
  })

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {data?.formatted}
      <button onClick={() => refetch()}>fetch</button>
    </div>
  )
}

const FindAllowance = () => {
  const [ownerAddress, setOwnerAddress] = useState('')
  const [spenderAddress, setSpenderAddress] = useState('')
  const [tokenAddress, setTokenAddress] = useState<`0x${string}` | undefined>()
  const { data: tokenData, refetch: refetchToken } = useToken({
    address: tokenAddress,
  })
  const { data, isLoading, refetch } = useAllowance({
    ownerAddressOrName: ownerAddress,
    spenderAddressOrName: spenderAddress,
    token: tokenData?.address,
    formatUnits: tokenData?.decimals,
    enabled:
      !!tokenData || !!ownerAddress || !!spenderAddress || !!tokenAddress,
  })

  const [valueOwner, setValueOwner] = useState('')
  const [valueSpender, setValueSpender] = useState('')
  const [valueToken, setValueToken] = useState<`0x${string}` | undefined>()

  return (
    <div>
      Find allowance:{' '}
      <input
        onChange={(e) => setValueOwner(e.target.value)}
        placeholder="Owner wallet address"
        value={valueOwner}
      />
      <input
        onChange={(e) => setValueSpender(e.target.value)}
        placeholder="Spender wallet address"
        value={valueSpender}
      />
      <select onChange={(e) => setValueToken(e.target.value as `0x${string}`)}>
        <option value="0x07865c6E87B9F70255377e024ace6630C1Eaa37F">USDC</option>
        <option value="0x73967c6a0904aA032C103b4104747E88c566B1A2">DAI</option>
      </select>
      Or{' '}
      <input
        onChange={(e) => setValueToken(e.target.value as `0x${string}`)}
        placeholder="Token address"
        value={valueToken}
      />
      <button
        onClick={() => {
          if (valueToken === tokenAddress) {
            refetchToken()
          }

          if (
            valueOwner === ownerAddress &&
            valueSpender === spenderAddress &&
            valueToken === tokenAddress
          ) {
            refetch()
          } else {
            setOwnerAddress(valueOwner)
            setSpenderAddress(valueSpender)
            setTokenAddress(valueToken)
          }
        }}
      >
        {isLoading ? 'fetching...' : 'fetch'}
      </button>
      <div>{data?.formatted}</div>
    </div>
  )
}

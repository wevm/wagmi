import { verifyTypedData } from 'ethers/lib/utils'
import { useSignTypedData } from 'wagmi'

const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
} as const

// The named list of all type definitions
const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
} as const

const value = {
  from: {
    name: 'Cow',
    wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  },
  to: {
    name: 'Bob',
    wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  },
  contents: 'Hello, Bob!',
} as const

export const SignTypedData = () => {
  const { data, error, isLoading, signTypedData } = useSignTypedData({
    domain,
    types,
    value,
  })

  return (
    <div>
      <button disabled={isLoading} onClick={() => signTypedData()}>
        {isLoading ? 'Check Wallet' : 'Sign Message'}
      </button>

      {data && (
        <div>
          <div>signature {data}</div>
          <div>
            recovered address {verifyTypedData(domain, types, value, data)}
          </div>
        </div>
      )}

      <div>{error && (error?.message ?? 'Failed to sign message')}</div>
    </div>
  )
}

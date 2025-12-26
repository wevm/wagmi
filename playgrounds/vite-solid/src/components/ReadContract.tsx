import { useReadContract } from '@wagmi/solid'

import { wagmiContractConfig } from '../contracts'

export function ReadContract() {
  const balance = useReadContract(() => ({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
  }))

  return (
    <div>
      <h2>Read Contract</h2>
      <div>Balance: {balance.data?.toString()}</div>
    </div>
  )
}

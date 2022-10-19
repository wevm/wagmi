import { useAccount, useContractRead, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { data: ensNameData } = useEnsName({ address })

  const result = useContractRead({
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: [
      {
        type: 'function',
        name: 'balanceOf',
        stateMutability: 'view',
        inputs: [{ type: 'address', name: 'account' }],
        outputs: [{ type: 'uint256', name: 'balance' }],
      },
    ],
    functionName: 'balanceOf',
    args: ['0x123'],
  })
  result.data

  return (
    <div>
      {ensNameData ?? address}
      {ensNameData ? ` (${address})` : null}
    </div>
  )
}

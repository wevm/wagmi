import { useContractReads } from 'wagmi'

export const wagmigotchiContractConfig = {
  addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
  contractInterface: [
    {
      inputs: [],
      name: 'getAlive',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'love',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ],
}

export const mlootContractConfig = {
  addressOrName: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  contractInterface: [
    {
      inputs: [
        { internalType: 'address', name: 'owner', type: 'address' },
        { internalType: 'uint256', name: 'index', type: 'uint256' },
      ],
      name: 'tokenOfOwnerByIndex',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
  ],
}

export function ReadContracts() {
  const { data, isSuccess, isLoading } = useContractReads({
    contracts: [
      {
        ...wagmigotchiContractConfig,
        functionName: 'love',
        args: '0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c',
      },
      {
        ...wagmigotchiContractConfig,
        functionName: 'love',
        args: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
      },
      { ...wagmigotchiContractConfig, functionName: 'getAlive' },
      {
        ...mlootContractConfig,
        functionName: 'tokenOfOwnerByIndex',
        args: ['0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', 0],
      },
    ],
  })

  return (
    <div>
      <div>Data:</div>
      {isLoading && <div>loading...</div>}
      {isSuccess && data?.map((data) => <div>{JSON.stringify(data)}</div>)}
    </div>
  )
}

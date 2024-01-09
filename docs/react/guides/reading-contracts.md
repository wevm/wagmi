# Reading Contracts

The [`useReadContract` Hook](/react/api/hooks/useReadContract) allows you to read data on a smart contract, from a `view` or `pure` (read-only) function. They can only read the state of the contract, and cannot make any changes to it. Since read-only methods do not change the state of the contract, they do not require any gas to be executed, and can be called by any user without the need to pay for gas.

The component below shows how to retrieve the token balance of an address from the [Wagmi Example](https://etherscan.io/token/0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2) contract

:::code-group

```tsx [read-contract.tsx]
import { useReadContract } from 'wagmi'

function ReadContract() {
  const { data: balance } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
  })

  return (
    <div>Balance: {balance?.toString()}</div>
  )
}
```

:::

## Loading & Error States

The [`useReadContract` Hook](/react/api/hooks/useReadContract) also returns loading & error states, which can be used to display a loading indicator while the data is being fetched, or an error message if contract execution reverts.

:::code-group

```tsx [read-contract.tsx]
import { type BaseError, useReadContract } from 'wagmi'

function ReadContract() {
  const { 
    data: balance,
    error, // [!code ++]
    isPending // [!code ++]
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: 'balanceOf',
    args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
  })

  if (isPending) return <div>Loading...</div> // [!code ++]

  if (error) // [!code ++]
    return ( // [!code ++]
      <div> // [!code ++]
        Error: {(error as BaseError).shortMessage || error.message} // [!code ++]
      </div> // [!code ++]
    )  // [!code ++]

  return (
    <div>Balance: {balance?.toString()}</div>
  )
}
```

:::

## Calling Multiple Functions

We can use the [`useContractRead` Hook](/react/api/hooks/useContractRead) multiple times in a single component to call multiple functions on the same contract, but this ends up being hard to manage as the number of functions increases, especially when we also want to deal with loading & error states. 

Luckily, to make this easier, we can use the [`useContractReads` Hook](/react/api/hooks/useContractReads) to call multiple functions in a single call.

:::code-group

```tsx [read-contract.tsx]
import { type BaseError, useReadContracts } from 'wagmi'

function ReadContract() {
  const { 
    data,
    error,
    isPending
  } = useReadContracts({ 
    contracts: [{ 
      ...wagmiContractConfig,
      functionName: 'balanceOf',
      args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
    }, { 
      ...wagmiContractConfig, 
      functionName: 'ownerOf', 
      args: [69n], 
    }, { 
      ...wagmiContractConfig, 
      functionName: 'totalSupply', 
    }] 
  }) 
  const [balance, ownerOf, totalSupply] = data || [] 

  if (isPending) return <div>Loading...</div>

  if (error)
    return (
      <div>
        Error: {(error as BaseError).shortMessage || error.message}
      </div>
    ) 

  return (
    <>
      <div>Balance: {balance?.toString()}</div>
      <div>Owner of Token 69: {ownerOf?.toString()}</div> 
      <div>Total Supply: {totalSupply?.toString()}</div> 
    </>
  )
}
```

:::

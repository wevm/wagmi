# Write to Contract

The [`useWriteContract` Hook](/react/api/hooks/useWriteContract) allows you to mutate data on a smart contract, from a `payable` or `nonpayable` (write) function. These types of functions require gas to be executed, hence a transaction is broadcasted in order to change the state.

In the guide below, we will teach you how to implement a "Mint NFT" form that takes in a dynamic argument (token ID) using Wagmi. The example below builds on the [Connect Wallet guide](/react/guides/connect-wallet) and uses the [useWriteContract](/react/api/hooks/useWriteContract) & [useWaitForTransaction](/react/api/hooks/useWaitForTransactionReceipt) hooks. 

If you have already completed the [Sending Transactions guide](/react/guides/send-transaction), this guide will look very similar! That's because writing to a contract internally broadcasts & sends a transaction.

## Example

Feel free to check out the example before moving on:

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/edit/vitejs-vite-f5uwlm?embed=1&file=src%2FApp.tsx&hideExplorer=1&view=preview"></iframe>

## Steps

### 1. Connect Wallet

Follow the [Connect Wallet guide](/react/guides/connect-wallet) guide to get this set up.

### 2. Create a new component

Create your `MintNFT` component that will contain the Mint NFT logic.

::: code-group

```tsx [mint-nft.tsx]
import * as React from 'react'
 
export function MintNFT() {
  return (
    <form>
      <input name="tokenId" placeholder="69420" required />
      <button type="submit">Mint</button>
    </form>
  )
}
```

:::

### 3. Add a form handler

Next, we will need to add a handler to the form that will send the transaction when the user hits "Mint". This will be a basic handler in this step.

::: code-group

```tsx [mint-nft.tsx]
import * as React from 'react'
 
export function MintNFT() {
  async function submit(e: React.FormEvent<HTMLFormElement>) { // [!code ++]
    e.preventDefault() // [!code ++]
    const formData = new FormData(e.target as HTMLFormElement) // [!code ++]
    const tokenId = formData.get('tokenId') as string // [!code ++]
  } // [!code ++]

  return (
    <form> // [!code --]
    <form onSubmit={submit}> // [!code ++]
      <input name="tokenId" placeholder="69420" required />
      <button type="submit">Mint</button>
    </form>
  )
}
```

:::

### 4. Hook up the `useWriteContract` Hook

Now that we have the form handler, we can hook up the [`useWriteContract` Hook](/react/api/hooks/useWriteContract) to send the transaction.

::: code-group

```tsx [mint-nft.tsx]
import * as React from 'react'
import { useWriteContract } from 'wagmi' // [!code ++]
import { abi } from './abi' // [!code ++]
 
export function MintNFT() {
  const { data: hash, writeContract } = useWriteContract() // [!code ++]

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const tokenId = formData.get('tokenId') as string 
    writeContract({ // [!code ++]
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code ++]
      abi, // [!code ++]
      functionName: 'mint', // [!code ++]
      args: [BigInt(tokenId)], // [!code ++]
    }) // [!code ++]
  } 

  return (
    <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button type="submit">Mint</button>
      {hash && <div>Transaction Hash: {hash}</div>} // [!code ++]
    </form>
  )
}
```

```ts [abi.ts]
export const abi = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }],
    outputs: [],
  },
] as const
```

:::

### 5. Add loading state (optional)

We can optionally add a loading state to the "Mint" button while we are waiting confirmation from the user's wallet.

::: code-group

```tsx [mint-nft.tsx]
import * as React from 'react'
import { useWriteContract } from 'wagmi'
import { abi } from './abi'
 
export function MintNFT() {
  const { 
    data: hash, 
    isPending, // [!code ++]
    writeContract 
  } = useWriteContract() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const tokenId = formData.get('tokenId') as string 
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'mint',
      args: [BigInt(tokenId)],
    })
  } 

  return (
    <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button 
        disabled={isPending} // [!code ++]
        type="submit"
      >
        Mint // [!code --]
        {isPending ? 'Confirming...' : 'Mint'} // [!code ++]
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
    </form>
  )
}
```

```ts [abi.ts]
export const abi = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }],
    outputs: [],
  },
] as const
```

:::

### 6. Wait for transaction receipt (optional)

We can also display the transaction confirmation status to the user by using the [`useWaitForTransactionReceipt` Hook](/react/api/hooks/useWaitForTransactionReceipt). 

::: code-group

```tsx [mint-nft.tsx]
import * as React from 'react'
import { 
  useWaitForTransactionReceipt, // [!code ++]
  useWriteContract 
} from 'wagmi'
import { abi } from './abi'
 
export function MintNFT() {
  const { 
    data: hash, 
    isPending, 
    writeContract 
  } = useWriteContract() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const tokenId = formData.get('tokenId') as string 
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'mint',
      args: [BigInt(tokenId)],
    })
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = // [!code ++]
    useWaitForTransactionReceipt({ // [!code ++]
      hash, // [!code ++]
    }) // [!code ++]

  return (
    <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Mint'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>} // [!code ++]
      {isConfirmed && <div>Transaction confirmed.</div>} // [!code ++]
    </form>
  )
}
```

```ts [abi.ts]
export const abi = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }],
    outputs: [],
  },
] as const
```

:::

### 7. Handle errors (optional)

If the user rejects the transaction, or the contract reverts, we can display an error message to the user.

::: code-group

```tsx [mint-nft.tsx]
import * as React from 'react'
import { 
  type BaseError, // [!code ++]
  useWaitForTransactionReceipt, 
  useWriteContract 
} from 'wagmi'
import { abi } from './abi'
 
export function MintNFT() {
  const { 
    data: hash,
    error, // [!code ++]  
    isPending, 
    writeContract 
  } = useWriteContract() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const tokenId = formData.get('tokenId') as string 
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'mint',
      args: [BigInt(tokenId)],
    })
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Mint'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      {error && ( // [!code ++]
        <div>Error: {(error as BaseError).shortMessage || error.message}</div> // [!code ++]
      )} // [!code ++]
    </form>
  )
}
```

```ts [abi.ts]
export const abi = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }],
    outputs: [],
  },
] as const
```

:::

### 8. Wire it up!

Finally, we can wire up our Mint NFT component to our application's entrypoint.

::: code-group

```tsx [app.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './config'
import { MintNft } from './mint-nft' // [!code ++]

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <MintNft /> // [!code ++]
      </QueryClientProvider> 
    </WagmiProvider>
  )
}
```

```tsx [mint-nft.tsx]
import * as React from 'react'
import { 
  type BaseError, 
  useWaitForTransactionReceipt, 
  useWriteContract 
} from 'wagmi'
import { abi } from './abi'
 
export function MintNFT() {
  const { 
    data: hash,
    error,   
    isPending, 
    writeContract 
  } = useWriteContract() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const tokenId = formData.get('tokenId') as string 
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi,
      functionName: 'mint',
      args: [BigInt(tokenId)],
    })
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <form onSubmit={submit}>
      <input name="tokenId" placeholder="69420" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Mint'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      {error && ( 
        <div>Error: {(error as BaseError).shortMessage || error.message}</div> 
      )} 
    </form>
  )
}
```

```ts [abi.ts]
export const abi = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ internalType: 'uint32', name: 'tokenId', type: 'uint32' }],
    outputs: [],
  },
] as const
```

```tsx [config.ts]
import { http, createConfig } from 'wagmi'
import { base, mainnet, optimism } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
})
```

:::

[See the Example.](#example)

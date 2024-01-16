# Send Transaction

The following guide teaches you how to send transactions in Wagmi. The example below builds on the [Connect Wallet guide](/react/guides/connect-wallet) and uses the [useSendTransaction](/react/api/hooks/useSendTransaction) & [useWaitForTransaction](/react/api/hooks/useWaitForTransactionReceipt) hooks. 

## Example

Feel free to check out the example before moving on:

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/edit/vitejs-vite-zkzqj7?embed=1&file=src%2FApp.tsx&hideExplorer=1&view=preview"></iframe>

## Steps

### 1. Connect Wallet

Follow the [Connect Wallet guide](/react/guides/connect-wallet) guide to get this set up.

### 2. Create a new component

Create your `SendTransaction` component that will contain the send transaction logic.

::: code-group

```tsx [send-transaction.tsx]
import * as React from 'react'
 
export function SendTransaction() {
  return (
    <form>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button type="submit">Send</button>
    </form>
  )
}
```

:::

### 3. Add a form handler

Next, we will need to add a handler to the form that will send the transaction when the user hits "Send". This will be a basic handler in this step.

::: code-group

```tsx [send-transaction.tsx]
import * as React from 'react'
 
export function SendTransaction() {
  async function submit(e: React.FormEvent<HTMLFormElement>) { // [!code ++]
    e.preventDefault() // [!code ++]
    const formData = new FormData(e.target as HTMLFormElement) // [!code ++]
    const to = formData.get('address') as `0x${string}` // [!code ++]
    const value = formData.get('value') as string // [!code ++]
  } // [!code ++]

  return (
    <form> // [!code --]
    <form onSubmit={submit}> // [!code ++]
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button type="submit">Send</button>
    </form>
  )
}
```

:::

### 4. Hook up the `useSendTransaction` Hook

Now that we have the form handler, we can hook up the [`useSendTransaction` Hook](/react/api/hooks/useSendTransaction) to send the transaction.

::: code-group

```tsx [send-transaction.tsx]
import * as React from 'react'
import { useSendTransaction } from 'wagmi' // [!code ++]
import { parseEther } from 'viem' // [!code ++]
 
export function SendTransaction() {
  const { data: hash, sendTransaction } = useSendTransaction() // [!code ++]

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) }) // [!code ++]
  } 

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button type="submit">Send</button>
      {hash && <div>Transaction Hash: {hash}</div>} // [!code ++]
    </form>
  )
}
```

:::

### 5. Add loading state (optional)

We can optionally add a loading state to the "Send" button while we are waiting confirmation from the user's wallet.

::: code-group

```tsx [send-transaction.tsx]
import * as React from 'react'
import { useSendTransaction } from 'wagmi' 
import { parseEther } from 'viem' 
 
export function SendTransaction() {
  const { 
    data: hash, 
    isPending, // [!code ++]
    sendTransaction 
  } = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) }) 
  } 

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button 
        disabled={isPending} // [!code ++]
        type="submit"
      >
        Send // [!code --]
        {isPending ? 'Confirming...' : 'Send'} // [!code ++]
      </button>
      {hash && <div>Transaction Hash: {hash}</div>} 
    </form>
  )
}
```

:::

### 6. Wait for transaction receipt (optional)

We can also display the transaction confirmation status to the user by using the [`useWaitForTransactionReceipt` Hook](/react/api/hooks/useWaitForTransactionReceipt). 

::: code-group

```tsx [send-transaction.tsx]
import * as React from 'react'
import { 
  useSendTransaction, 
  useWaitForTransactionReceipt // [!code ++]
} from 'wagmi' 
import { parseEther } from 'viem' 
 
export function SendTransaction() {
  const { 
    data: hash, 
    isPending, 
    sendTransaction 
  } = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) }) 
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = // [!code ++]
    useWaitForTransactionReceipt({ // [!code ++]
      hash, // [!code ++]
    }) // [!code ++]

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Send'} 
      </button>
      {hash && <div>Transaction Hash: {hash}</div>} 
      {isConfirming && <div>Waiting for confirmation...</div>} // [!code ++]
      {isConfirmed && <div>Transaction confirmed.</div>} // [!code ++]
    </form>
  )
}
```

:::

### 7. Handle errors (optional)

If the user rejects the transaction, or the user does not have enough funds to cover the transaction, we can display an error message to the user.

::: code-group

```tsx [send-transaction.tsx]
import * as React from 'react'
import { 
  type BaseError, // [!code ++]
  useSendTransaction, 
  useWaitForTransactionReceipt 
} from 'wagmi' 
import { parseEther } from 'viem' 
 
export function SendTransaction() {
  const { 
    data: hash,
    error, // [!code ++] 
    isPending, 
    sendTransaction 
  } = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) }) 
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Send'} 
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

:::

### 8. Wire it up!

Finally, we can wire up our Send Transaction component to our application's entrypoint.

::: code-group

```tsx [app.tsx]
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './config'
import { SendTransaction } from './send-transaction' // [!code ++]

const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <SendTransaction /> // [!code ++]
      </QueryClientProvider> 
    </WagmiProvider>
  )
}
```

```tsx [send-transaction.tsx]
import * as React from 'react'
import { 
  type BaseError, 
  useSendTransaction, 
  useWaitForTransactionReceipt 
} from 'wagmi' 
import { parseEther } from 'viem' 
 
export function SendTransaction() {
  const { 
    data: hash,
    error, 
    isPending, 
    sendTransaction 
  } = useSendTransaction() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const to = formData.get('address') as `0x${string}` 
    const value = formData.get('value') as string 
    sendTransaction({ to, value: parseEther(value) }) 
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button 
        disabled={isPending} 
        type="submit"
      >
        {isPending ? 'Confirming...' : 'Send'} 
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

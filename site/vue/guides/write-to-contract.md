# Write to Contract

The [`useWriteContract` Composable](/vue/api/composables/useWriteContract) allows you to mutate data on a smart contract, from a `payable` or `nonpayable` (write) function. These types of functions require gas to be executed, hence a transaction is broadcasted in order to change the state.

In the guide below, we will teach you how to implement a "Mint NFT" form that takes in a dynamic argument (token ID) using Wagmi. The example below builds on the [Connect Wallet guide](/vue/guides/connect-wallet) and uses the [useWriteContract](/vue/api/composables/useWriteContract) & [useWaitForTransaction](/vue/api/composables/useWaitForTransactionReceipt) composables. 

If you have already completed the [Sending Transactions guide](/vue/guides/send-transaction), this guide will look very similar! That's because writing to a contract internally broadcasts & sends a transaction.

## Example

Feel free to check out the example before moving on:

<iframe frameborder="0" width="100%" height="500px" src="https://stackblitz.com/edit/vitejs-vite-knyxah?embed=1&file=src%2FApp.tsx&hideExplorer=1&view=preview"></iframe>

## Steps

### 1. Connect Wallet

Follow the [Connect Wallet guide](/vue/guides/connect-wallet) guide to get this set up.

### 2. Create a new component

Create your `MintNft` component that will contain the Mint NFT logic.

::: code-group

```vue [MintNft.vue]
<script setup lang="ts">
</script>
 
<template>
  <form>
    <input name="tokenId" placeholder="69420" required />
    <button type="submit">Mint</button>
  </form>
</template>
```

:::

### 3. Add a form handler

Next, we will need to add a handler to the form that will send the transaction when the user hits "Mint". This will be a basic handler in this step.

::: code-group

```vue [MintNft.vue]
<script setup lang="ts">
function submit(event: Event) { // [!code ++]
  const formData = new FormData(e.target as HTMLFormElement) // [!code ++]
  const tokenId = formData.get('tokenId') as string // [!code ++]
} // [!code ++]
</script>

<template
  <form> // [!code --]
  <form @submit.prevent="submit"> // [!code ++]
    <input name="tokenId" placeholder="69420" required />
    <button type="submit">Mint</button>
  </form>
</template>
```

:::

### 4. Hook up the `useWriteContract` Composable

Now that we have the form handler, we can hook up the [`useWriteContract` Composable](/vue/api/composables/useWriteContract) to send the transaction.

::: code-group

```vue [MintNft.vue]
<script setup lang="ts">
import { useWriteContract } from 'wagmi' // [!code ++]
import { abi } from './abi' // [!code ++]

const { data: hash, writeContract } = useWriteContract() // [!code ++]

function submit(event: Event) { 
  const formData = new FormData(e.target as HTMLFormElement) 
  const tokenId = formData.get('tokenId') as string 
  writeContract({ // [!code ++]
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2', // [!code ++]
    abi, // [!code ++]
    functionName: 'mint', // [!code ++]
    args: [BigInt(tokenId)], // [!code ++]
  }) // [!code ++]
} 
</script>

<template
  <form @submit.prevent="submit"> 
    <input name="tokenId" placeholder="69420" required />
    <button type="submit">Mint</button>
    <div v-if="hash">Transaction Hash: {{ hash }}</div> // [!code ++]
  </form>
</template>
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

```vue [MintNft.vue]
<script setup lang="ts">
import { useWriteContract } from 'wagmi'
import { abi } from './abi'

const { 
  data: hash, 
  isPending, // [!code ++]
  writeContract 
} = useWriteContract()

function submit(event: Event) { 
  const formData = new FormData(e.target as HTMLFormElement) 
  const tokenId = formData.get('tokenId') as string 
  writeContract({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi,
    functionName: 'mint',
    args: [BigInt(tokenId)],
  })
} 
</script>

<template
  <form @submit.prevent="submit"> 
    <input name="tokenId" placeholder="69420" required />
    <button :disabled="isPending" type="submit"> // [!code ++]
      <span v-if="isPending">Sending...</span> // [!code ++]
      <span v-else>Send</span> // [!code ++]
    </button>
    <div v-if="hash">Transaction Hash: {{ hash }}</div>
  </form>
</template>
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

We can also display the transaction confirmation status to the user by using the [`useWaitForTransactionReceipt` Composable](/vue/api/composables/useWaitForTransactionReceipt). 

::: code-group

```vue [MintNft.vue]
<script setup lang="ts">
import { 
  useWaitForTransactionReceipt, // [!code ++]
  useWriteContract 
} from 'wagmi'
import { abi } from './abi'

const { 
  data: hash, 
  isPending,
  writeContract 
} = useWriteContract()

function submit(event: Event) { 
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
</script>

<template
  <form @submit.prevent="submit"> 
    <input name="tokenId" placeholder="69420" required />
    <button :disabled="isPending" type="submit">
      <span v-if="isPending">Sending...</span>
      <span v-else>Send</span>
    </button>
    <div v-if="hash">Transaction Hash: {{ hash }}</div>
    <div v-if="isConfirming">Waiting for confirmation...</div> // [!code ++]
    <div v-if="isConfirmed">Transaction Confirmed!</div> // [!code ++]
  </form>
</template>
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

If the user rejects the transaction, or the user does not have enough funds to cover the transaction, we can display an error message to the user.

::: code-group

```vue [MintNft.vue]
<script setup lang="ts">
import { 
  useWaitForTransactionReceipt,
  useWriteContract 
} from 'wagmi'
import { abi } from './abi'

const { 
  data: hash,
  error, // [!code ++] 
  isPending,
  writeContract 
} = useWriteContract()

function submit(event: Event) { 
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
</script>

<template
  <form @submit.prevent="submit"> 
    <input name="tokenId" placeholder="69420" required />
    <button :disabled="isPending" type="submit">
      <span v-if="isPending">Sending...</span>
      <span v-else>Send</span>
    </button>
    <div v-if="hash">Transaction Hash: {{ hash }}</div>
    <div v-if="isConfirming">Waiting for confirmation...</div>
    <div v-if="isConfirmed">Transaction Confirmed!</div>
    <div v-if="error"> // [!code ++]
      Error: {{ (error as BaseError).shortMessage || error.message }} // [!code ++]
    </div> // [!code ++]
  </form>
</template>
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

Finally, we can wire up our Send Transaction component to our application's entrypoint.

:::code-group
```vue [App.vue]
<script setup lang="ts">
import { useConnection } from '@wagmi/vue'
import Connection from './Connection.vue'
import Connect from './Connect.vue'
import MintNft from './MintNft.vue' // [!code ++]

const { isConnected } = useConnection()
</script>

<template>
  <Connection v-if="isConnected" />
  <Connect v-else />
  <MintNft v-if="isConnected" /> // [!code ++]
</template>
```

```vue [MintNft.vue]
<script setup lang="ts">
import { 
  useWaitForTransactionReceipt,
  useWriteContract 
} from 'wagmi'
import { abi } from './abi'

const { 
  data: hash,
  error, 
  isPending,
  writeContract 
} = useWriteContract()

function submit(event: Event) { 
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
</script>

<template
  <form @submit.prevent="submit"> 
    <input name="tokenId" placeholder="69420" required />
    <button :disabled="isPending" type="submit">
      <span v-if="isPending">Sending...</span>
      <span v-else>Send</span>
    </button>
    <div v-if="hash">Transaction Hash: {{ hash }}</div>
    <div v-if="isConfirming">Waiting for confirmation...</div>
    <div v-if="isConfirmed">Transaction Confirmed!</div>
    <div v-if="error">
      Error: {{ (error as BaseError).shortMessage || error.message }}
    </div>
  </form>
</template>
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

[See the Example.](#example)

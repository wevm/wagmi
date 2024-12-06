# Reactivity

To ensure Svelte Runes are reactive, we have opted to return a function from each hook. This pairs very well with the [`$derived.by` rune](https://svelte.dev/docs/svelte/$derived#$derived.by):

```svelte
<script lang="ts">
  import { useAccount } from '@wagmi/svelte';

  const account = $derived.by(useAccount());
</script>

<p>Your address: {account.address}</p>
```

::: tip
If you don't need the return value (such as for `useWatchBlockNumber()`), there is no need to wrap the function in `$derived.by`.
:::

Similarly, if you simply pass an object into the function, it will not be reactive. We have chosen to use Solid-style parameters, meaning you pass arguments as functions:

```svelte
<script lang="ts">
  import { useEnsName } from '@wagmi/svelte';

  const { data: vitalikEns } = $derived.by(
    useEnsName(() => ({
      address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045", // vitalik.eth
    }))
  );
</script>

<p>Vitalik's ENS: {vitalikEns}</p>
```

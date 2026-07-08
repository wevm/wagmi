# Cross-chain Swaps

Wagmi doesn't ship a cross-chain swap aggregator itself, but the primitives it exposes cover the wagmi-facing half of the flow: reading the connected account, switching chains, and signing a source-chain transaction. Aggregation, routing, provider execution, and destination-chain observation live in an external SDK — [`@swapdk/wagmidk`](https://github.com/Swap-DK/wagmidk) is one such library, layered directly on wagmi's peer surface.

## Wagmi building blocks

Every cross-chain flow reuses the same wagmi surface on the source-chain side:

::: code-group

```tsx [swap.tsx]
import { useAccount, useSwitchChain, useWalletClient, useReadContract } from 'wagmi'
import { erc20Abi } from 'viem'

function useSwapContext() {
  const { address, chain } = useAccount()          // where funds come from
  const { switchChainAsync } = useSwitchChain()    // the quote binds to a source chain; user may need to switch
  const { data: walletClient } = useWalletClient() // signing + broadcast primitive

  // For ERC-20 sources: check the router's existing allowance before quoting an approve tx.
  const { data: allowance } = useReadContract({
    address: '0xTokenAddress',
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address!, '0xRouterAddress'],
    query: { enabled: !!address },
  })

  return { address, chain, switchChainAsync, walletClient, allowance }
}
```

:::

That's the whole wagmi-facing surface. The rest happens against an external aggregator.

## What's not in wagmi

Beyond the primitives above, a cross-chain flow has to solve a few non-wagmi problems:

- **Route aggregation.** No single provider covers every corridor. Fetching quotes from multiple providers and picking the best output is an HTTP-level concern.
- **Provider execution paths.** Some providers hand back an EVM router `calldata` you can pass straight to `walletClient.sendTransaction`. Others use a deposit-channel flow — you receive an address and send a plain transfer. Handling both without leaking the distinction to the UI takes an intermediate layer.
- **Approval flow for ERC-20 sources.** The router needs allowance before it can `transferFrom`. `useReadContract` + `useWriteContract` cover the mechanics, but the "approve → wait for receipt → broadcast swap" sequencing has to happen in your app.
- **Destination-chain tracking.** The source-chain tx hash tells you funds left the wallet; it doesn't tell you funds arrived on the destination chain. Polling a `/track` endpoint is the usual pattern, but each provider surfaces status differently.
- **Wallet chain mismatch.** The quote binds to a specific source chain. If the connected wallet is on a different chain, `walletClient.sendTransaction` reverts or targets the wrong network. `useSwitchChain` covers this if you gate the execute step on chain equality.

## Using `@swapdk/wagmidk`

`@swapdk/wagmidk` is a headless React hooks library over the SwapDK swap-engine aggregator (THORChain / MAYAChain / Chainflip). The hook surface (`useSwap`, `useSwapQuote`, `useSwapExecute`, `useSwapStatus`, `useSourceChain`) peer-depends on `wagmi` ^2, `viem` ^2, and `@tanstack/react-query` ^5, so it composes with the wagmi setup you already have:

::: code-group

```tsx [swap-with-swapdk.tsx]
import { useSwap } from '@swapdk/wagmidk'

function Swap() {
  const swap = useSwap({
    from: { chainId: 42161, token: 'native', amount: 10_000_000_000_000_000n }, // 0.01 ETH on Arbitrum
    to: { chain: 'bitcoin' },
    recipient: 'bc1q…',
  })

  if (swap.phase === 'switch-chain') return <button onClick={swap.switchChain}>Switch chain</button>
  if (swap.phase === 'ready')        return <button onClick={swap.execute}>Sign &amp; broadcast</button>
  if (swap.phase === 'pending')      return <span>Tracking… {swap.status}</span>
  if (swap.phase === 'completed')    return <span>Delivered</span>
  return <span>{swap.phase}</span>
}
```

:::

The `useSwap` wrapper synthesises the four primary hooks (`useSwapQuote`, `useSwapExecute`, `useSwapStatus`, `useSourceChain`) with a derived `phase` state machine. For multi-component UIs you can drop down to the primary hooks directly — they share the same react-query keys, so a quote fetched in one component is reused by another.

---

**A note on peer versions.** Third-party SDKs like `@swapdk/wagmidk` peer-depend on wagmi rather than bundle it. When you upgrade wagmi's major version, verify the SDK you use has published a matching release before rolling out — otherwise you can end up with two copies of wagmi in `node_modules` and hit the [`ProviderNotFoundError`](/core/api/errors#providernotfounderror) double-package failure mode.

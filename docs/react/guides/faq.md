<script setup>
const docsPath = 'react'
</script>

# FAQ / Troubleshooting

Collection of frequently asked questions with ideas on how to troubleshoot and resolve them.

<!--@include: @shared/faq.md-->

## How does Wagmi work?

Until there's a more in-depth write-up about Wagmi internals, here is the gist:

- Wagmi is essentially a wrapper around [Viem](https://viem.sh) and TanStack Query that adds connector and multichain support.
- [Connectors](/react/api/connectors) allow Wagmi and Ethereum accounts to communicate with each other.
- The Wagmi [`Config`](/react/api/createConfig#config) manages connections established between Wagmi and Connectors, as well as some global state. [Connections](/react/api/createConfig#connection) come with one or more addresses and a chain ID.
  - If there are connections, the Wagmi `Config` listens for connection changes and updates the [`chainId`](/react/api/createConfig#chainid) based on the ["current" connection](/react/api/createConfig#current). (The Wagmi `Config` can have [many connections established](/react/api/createConfig#connections) at once, but only one connection can be the "current" connection. Usually this is the connection from the last connector that is connected, but can changed based on event emitted from other connectors or through the [`useSwitchAccount`](/react/api/hooks/useSwitchAccount) hook and [`switchAccount`](/core/api/actions/switchAccount) action.)
  - If there are no connections, the Wagmi `Config` defaults the global state `chainId` to the first chain it was created with or last established connection.
  - The global `chainId` can be changed directly using the [`useSwitchChain`](/react/api/hooks/useSwitchChain) hook and [`switchChain`](/core/api/actions/switchChain) action. This works when there are no connections as well as for most connectors (not all connectors support chain switching).
- Wagmi uses the global `chainId` (from the "current" connection or global state) to internally create Viem Client's, which are used by hooks and actions.
- Hooks are constructed by TanStack Query options helpers, exported by the `'@wagmi/core/query'` entrypoint, and some additional code to wire up type parameters, hook into React Context, etc.
- There are three types of hooks: query hooks, mutation hooks, and config hooks. Query hooks, like [`useCall`](/react/api/hooks/useCall), generally read blockchain state and mutation hooks, like [`useSendTransaction`](/react/api/hooks/useSendTransaction), usually change state through sending transactions via the "current" connection. Config hooks are for getting data from and managing the Wagmi `Config` instance, e.g. [`useChainId`](/react/api/hooks/useChainId) and `useSwitchAccount`. Query and mutation hooks usually have corresponding [Viem actions.](https://viem.sh)


<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wevm/wagmi/main/.github/logo-dark.svg">
    <img alt="wagmi logo" src="https://raw.githubusercontent.com/wevm/wagmi/main/.github/logo-light.svg" width="auto" height="60">
  </picture>
</p>

<p align="center">
  React Hooks for Ethereum
<p>

<p align="center">
  <a href="https://www.npmjs.com/package/wagmi">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/wagmi?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/v/wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Version">
    </picture>
  </a>
  <a href="https://github.com/wagmi-dev/wagmi/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/wagmi?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/l/wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="MIT License">
    </picture>
  </a>
  <a href="https://www.npmjs.com/package/wagmi">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/dm/wagmi?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/dm/wagmi?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Downloads per month">
    </picture>
  </a>
  <a href="https://bestofjs.org/projects/wagmi">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/endpoint?colorA=21262d&colorB=21262d&style=flat&url=https://bestofjs-serverless.now.sh/api/project-badge?fullName=wagmi-dev%2Fviem%26since=daily">
      <img src="https://img.shields.io/endpoint?colorA=f6f8fa&colorB=f6f8fa&style=flat&url=https://bestofjs-serverless.now.sh/api/project-badge?fullName=wagmi-dev%2Fviem%26since=daily" alt="Best of JS">
    </picture>
  </a>
</p>

<br>

## Features

- 🚀 20+ hooks for working with wallets, ENS, contracts, transactions, signing, etc.
- 💼 Built-in wallet connectors for MetaMask, WalletConnect, Coinbase Wallet, Injected, and more
- 👟 Caching, request deduplication, multicall, batching, and persistence
- 🌀 Auto-refresh data on wallet, block, and network changes
- 🦄 TypeScript ready (infer types from ABIs and EIP-712 Typed Data)
- 📦 Command-line interface for managing ABIs and code generation
- 🌳 Test suite running against forked Ethereum network

...and a lot more.

## Documentation

For full documentation and examples, visit [wagmi.sh](https://wagmi.sh).

## Installation

Install wagmi and its [viem](https://viem.sh) peer dependency.

```bash
npm install wagmi viem
```

## Quick Start

Connect a wallet in under 60 seconds. LFG.

```tsx
import { WagmiConfig, createConfig, mainnet } from 'wagmi'
import { createPublicClient, http } from 'viem'

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
})

function App() {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig>
  )
}
```

```tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function Profile() {
  const { address } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (address)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}
```

In this example, we create a wagmi `config` and pass it to the `WagmiConfig` React Context. The config is set up to use viem's Public Client and automatically connect to previously connected wallets.

Next, we use the `useConnect` hook to connect an injected wallet (e.g. MetaMask) to the app. Finally, we show the connected account's address with `useAccount` and allow them to disconnect with `useDisconnect`.

We've only scratched the surface for what you can do with wagmi!

—

Check out [RainbowKit](https://rainbowkit.com/docs/introduction), [ConnectKit](https://docs.family.co/connectkit?utm_source=wagmi-dev) or [Web3Modal](https://web3modal.com) to get started with pre-built interface on top of wagmi for managing wallet connections.

## Community

Check out the following places for more wagmi-related content:

- Join the [discussions on GitHub](https://github.com/wagmi-dev/wagmi/discussions)
- Follow [@wevm_dev](https://twitter.com/wevm_dev) on Twitter for project updates
- Share [your project/organization](https://github.com/wagmi-dev/wagmi/discussions/201) using wagmi
- Browse the [awesome-wagmi](https://github.com/wagmi-dev/awesome-wagmi) list of awesome projects and resources

## Support

If you find wagmi useful, please consider supporting development. Thank you 🙏

- [GitHub Sponsors](https://github.com/sponsors/wagmi-dev?metadata_campaign=gh_readme_support)
- [Gitcoin Grant](https://wagmi.sh/gitcoin)
- [wagmi-dev.eth](https://etherscan.io/enslookup-search?search=wagmi-dev.eth)

## Sponsors

<a href="https://paradigm.xyz">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/paradigm-dark.svg">
    <img alt="paradigm logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/paradigm-light.svg" width="auto" height="70">
  </picture>
</a>

<br>

<a href="https://twitter.com/family">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/family-dark.svg">
    <img alt="family logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/family-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://twitter.com/context">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/context-dark.svg">
    <img alt="context logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/context-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://walletconnect.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/walletconnect-dark.svg">
    <img alt="WalletConnect logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/walletconnect-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://looksrare.org">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/looksrare-dark.svg">
    <img alt="LooksRare logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/8923685e23fe9708b74d456c3f9e7a2b90f6abd9/content/sponsors/looksrare-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://twitter.com/prtyDAO">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/partydao-dark.svg">
    <img alt="PartyDAO logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/partydao-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://dynamic.xyz">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/dynamic-dark.svg">
    <img alt="Dynamic logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/dynamic-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://sushi.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/sushi-dark.svg">
    <img alt="Sushi logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/sushi-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://stripe.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/stripe-dark.svg">
    <img alt="Stripe logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/stripe-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://bitkeep.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/bitkeep-dark.svg">
    <img alt="BitKeep logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/bitkeep-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://www.privy.io">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/privy-dark.svg">
    <img alt="Privy logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/privy-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://www.spruceid.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/spruce-dark.svg">
    <img alt="Spruce logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/spruce-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://rollup.id">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/rollup.id-dark.svg">
    <img alt="rollup.id logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/rollup.id-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://pancakeswap.finance/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/pancake-dark.svg">
    <img alt="pancake logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/pancake-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://celo.org/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/celo-dark.svg">
    <img alt="celo logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/celo-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://rainbow.me/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/rainbow-dark.svg">
    <img alt="rainbow logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/rainbow-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://pimlico.io/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/pimlico-dark.svg">
    <img alt="pimlico logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/pimlico-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://zora.co/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/zora-dark.svg">
    <img alt="zora logo" src="https://raw.githubusercontent.com/wagmi-dev/.github/main/content/sponsors/zora-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://lattice.xyz">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/lattice-dark.svg">
    <img alt="lattice logo" src="https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/lattice-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://twitter.com/supafinance">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/supa-dark.svg">
    <img alt="supa logo" src="https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/supa-light.svg" width="auto" height="50">
  </picture>
</a>
<a href="https://zksync.io/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/zksync-dark.svg">
    <img alt="zksync logo" src="https://raw.githubusercontent.com/wevm/.github/main/content/sponsors/zksync-light.svg" width="auto" height="50">
  </picture>
</a>

## Contributing

If you're interested in contributing, please read the [contributing docs](/.github/CONTRIBUTING.md) **before submitting a pull request**.

## Authors

- [@tmm](https://github.com/tmm) (awkweb.eth, [Twitter](https://twitter.com/awkweb))
- [@jxom](https://github.com/jxom) (moxey.eth, [Twitter](https://twitter.com/jakemoxey))

Thanks to julianhutton.eth ([@julianjhutton](https://twitter.com/julianjhutton)) for providing the awesome logo!

## License

[MIT](/LICENSE) License

<br />

<a href="https://vercel.com/?utm_source=wagmi-dev&utm_campaign=oss">
  <img src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg" alt="Powered by Vercel" height="35">
</a>

---
aside: false
editLink: false
title: wagmi
titleTemplate: :title · React Hooks for Ethereum
description: A collection of React Hooks & VanillaJS Actions containing everything you need to start working with Ethereum.
layout: home
---

<script setup lang="ts">
import { VPButton } from 'vitepress/theme'
import HomeSponsors from './.vitepress/theme/components/HomeSponsors.vue'
</script>

<div class="max-w-[1120px] mx-auto vp-doc relative px-[24px] mb-[96px] mt-[32px] md:px-0 md:mb-[64px]">

<div class="pt-[48px] max-sm:pt-0">
  <div class="absolute -left-28 right-0 -top-10 bottom-0 bg-[url('/colosseum-light.svg')] dark:bg-[url('/colosseum.svg')] bg-no-repeat z-[-1] max-sm:w-[200%] max-sm:-left-[200px] max-sm:hidden" />
  <div class="px-7 max-sm:px-0 flex justify-between z-0 max-md:justify-center">
    <div class="space-y-8 max-w-[400px] flex flex-col items-start max-md:items-center">
      <img class="h-[72px] logo max-sm:h-[60px]" src="/logo-light-hug.svg" alt="wagmi logo">
      <div class="font-medium text-[21px] max-sm:text-[18px] text-[#919193] max-md:text-center">A collection of <span class="text-black dark:text-white">React Hooks</span> & <span class="text-black dark:text-white">VanillaJS Actions</span> containing everything you need to start working with Ethereum.</div>
      <div class="flex justify-center space-x-2">
        <VPButton tag="a" size="medium" theme="brand" href="/react/getting-started" text="Get Started" />
        <VPButton class="max-sm:hidden" tag="a" size="medium" theme="alt" href="/react/introduction" text="Why wagmi?" />
        <VPButton tag="a" size="medium" theme="alt" href="https://github.com/wagmi-dev/wagmi" text="View on GitHub" />
      </div>
    </div>
    <div class="flex flex-col justify-between w-[440px] space-y-10 max-lg:w-[300px] max-md:hidden">
      <div id="install-usage" class="h-full">

::: code-group

```bash [npm]
npm i wagmi
```

```bash [pnpm]
pnpm i wagmi
```

```bash [yarn]
yarn add wagmi
```

:::

  </div>
  <!-- TODO: Extract bundle size, stars from respective APIs. -->
  <div class="flex justify-between space-x-5">
  <a href="https://bundlephobia.com/package/wagmi" class="cursor-pointer h-10 flex-1 relative rounded-lg overflow-hidden border border-black/10 dark:border-white/20" style="color: inherit;" rel="noreferrer noopener" target="_blank">
    <div class="absolute flex z-0 p-[6px] h-full w-full">
      <div class="flex-1 bg-white/60 dark:bg-black/40 flex items-center w-full h-full rounded-md">
        <span class="font-medium text-[15px] opacity-80 w-full text-center">size</span>
      </div>
      <div class="flex flex-1 items-center h-full px-2">
        <span class="font-medium text-[15px] text-center w-full text-black dark:text-white">32kB</span>
      </div>
    </div>
    <div class="absolute left-0 right-0 top-0 bottom-0 bg-black/5 dark:bg-white/10 z-[-1]" />
    <div class="absolute left-0 right-0 top-0 bottom-0 backdrop-blur-[2px] backdrop-filter z-[-1]" />
  </a>
  <a href="https://bundlephobia.com/package/wagmi" class="cursor-pointer h-10 flex-1 relative rounded-lg overflow-hidden border border-black/10 dark:border-white/20" style="color: inherit;" rel="noreferrer noopener" target="_blank">
    <div class="absolute flex z-0 p-[6px] h-full w-full">
      <div class="flex-1 bg-white/60 dark:bg-black/40 flex items-center w-full h-full rounded-md">
        <span class="font-medium text-[15px] opacity-80 w-full text-center">stars</span>
      </div>
      <div class="flex flex-1 items-center h-full px-2">
        <span class="font-medium text-[15px] text-center w-full text-black dark:text-white">4.4k</span>
      </div>
    </div>
    <div class="absolute left-0 right-0 top-0 bottom-0 bg-black/5 dark:bg-white/10 z-[-1]" />
    <div class="absolute left-0 right-0 top-0 bottom-0 backdrop-blur-[2px] backdrop-filter z-[-1]" />
  </a>
  <a href="https://github.com/wagmi-dev/wagmi/blob/main/LICENSE" class="cursor-pointer h-10 flex-1 relative rounded-lg overflow-hidden border border-black/10 dark:border-white/20 max-lg:hidden" style="color: inherit;" rel="noreferrer noopener" target="_blank">
    <div class="absolute flex z-0 p-[6px] h-full w-full">
      <div class="flex-1 px-2 bg-white/60 dark:bg-black/40 flex items-center w-full h-full rounded-md">
        <span class="font-medium text-[15px] opacity-80 w-full text-center">license</span>
      </div>
      <div class="flex flex-1 items-center h-full px-2">
        <span class="font-medium text-[15px] text-center w-full text-black dark:text-white">MIT</span>
      </div>
    </div>
    <div class="absolute left-0 right-0 top-0 bottom-0 bg-black/5 dark:bg-white/10 z-[-1]" />
    <div class="absolute left-0 right-0 top-0 bottom-0 backdrop-blur-[2px] backdrop-filter z-[-1]" />
  </a>
  </div>
  </div>
  </div>
</div>

<div class="h-24" />

<div class="max-w-2xl mx-auto">
<h1>Overview</h1>
<hr class="h-2" />

::: code-group

```tsx [App.tsx]
// 1. Import modules.
import { http } from 'viem'
import { createConfig, mainnet } from 'wagmi'
import { injected } from 'wagmi/connectors/injected'
import { Profile } from './Profile'

// 2. Setup wagmi config
const config = createConfig({
  chains: [mainnet],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
})

// 3. Wrap your application in the <WagmiConfig /> provider.
function App() {
  return (
    <WagmiConfig client={client}>
      <Profile />
    </WagmiConfig>
  )
}
```

```tsx [Profile.tsx]
import { useAccount, useConnect, useDisconnect } from 'wagmi'
 
export function Profile() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
 
  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  return <button onClick={() => connect()}>Connect Wallet</button>
}
```

:::

<div class="h-8" />
<h1>Features</h1>
<hr class="h-2" />

wagmi supports all these features out-of-the-box:

- 20+ [React Hooks](/TODO) & [VanillaJS Actions](/TODO) for working with wallets, ENS, contracts, transactions, signing, etc.
- Built-in [Connectors](/TODO) for MetaMask, WalletConnect, Coinbase Wallet, Injected, and more.
- Caching, request deduplication, multicall, batching, and persistence.
- Auto-refresh data on wallet, block, and network changes.
- TypeScript ready ([infer types](/TODO) from ABIs and EIP-712 Typed Data)
- [Command-line interface](/TODO) for managing ABIs and code generation
- Test suite running against [forked](https://ethereum.org/en/glossary/#fork) Ethereum network.

<div class="h-8" />
<h1>Community</h1>
<hr class="h-2" />

Check out the following places for more wagmi-related content:

- Follow [@wagmi_sh](https://twitter.com/wagmi_sh), [@awkweb](https://twitter.com/awkweb), and [@jakemoxey](https://twitter.com/jakemoxey) on Twitter for project updates
- Join the [discussions on GitHub](https://github.com/wagmi-dev/wagmi/discussions)
- [Share your project/organization](https://github.com/wagmi-dev/wagmi/discussions/201) that uses wagmi

<div class="h-8" />
<h1>Support</h1>
<hr class="h-2" />

Help support future development and make wagmi a sustainable open-source project:

- [GitHub Sponsors](https://github.com/sponsors/wagmi-dev?metadata_campaign=docs_support)
- [Gitcoin Grant](https://wagmi.sh/gitcoin)
- [wagmi-dev.eth](https://etherscan.io/enslookup-search?search=wagmi-dev.eth)

<div class="h-8" />
<HomeSponsors/>
</div>

<style scoped>
  html:not(.dark) img.dark {
    display: none;
  }
  .dark img.light {
    display: none;
  }

  .dark .logo {
    filter: invert(1);
  }

  .card {
    background-color: var(--vp-c-bg-soft);
  }

  .language-bash {
    overflow-y: hidden;
  }

  .vp-code-group, .vp-code-group .language-bash {
    height: 100%;
  }

  .vp-code-group .language-bash {
    height: 100%;
    margin-bottom: 0px;
  }

  .vp-code-group {
    margin-top: 0px;
  }

  .vp-code-group .blocks {
    height: calc(100% - 37px);
  }

  .vp-code-group .tabs label {
    font-size: 16px;
  }

  .vp-code-group .tabs {
    justify-content: left;
  }

  .vp-code-group .shiki {
    padding-top: 16px;
  }

  #install-usage .vp-code-group code {
    font-size: 22px;
  }
  
  /* .vp-code-group {
    width: 100% !important;
  } */

  .tabs {
    display: flex;
    justify-content: center;
  }
</style>

</div>

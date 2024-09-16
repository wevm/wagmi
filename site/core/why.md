# Why Wagmi Core

## The Problems

Building Ethereum applications is hard. Apps need to support connecting wallets, multiple chains, signing messages and data, sending transactions, listening for events and state changes, refreshing stale blockchain data, and much more. This is all on top of solving for app-specific use-cases and providing polished user experiences.

The ecosystem is also continuously evolving, meaning you need to adapt to new improvements or get left behind. App developers should not need to worry about connecting tens of different wallets, the intricacies of multi-chain support, typos accidentally sending an order of magnitude more ETH or calling a misspelled contract function, or accidentally spamming their RPC provider, costing thousands in compute units.

Wagmi Core solves all these problems and more — allowing app developers to focus on building high-quality and performant experiences for Ethereum — by focusing on **developer experience**, **performance**, **feature coverage**, and **stability.**

## Developer Experience

Wagmi Core delivers a great developer experience through modular and composable APIs, automatic type safety and inference, and comprehensive documentation.

It provides developers with intuitive building blocks to build their Ethereum apps. While Wagmi Core's APIs might seem more verbose at first, it makes Wagmi Core's modular building blocks extremely flexible. Easy to move around, change, and remove. It also allows developers to better understand Ethereum concepts as well as understand _what_ and _why_ certain properties are being passed through. Learning how to use Wagmi Core is a great way to learn how to interact with Ethereum in general.

Wagmi Core also provides [strongly typed APIs](/core/typescript), allowing consumers to get the best possible experience through [autocomplete](https://twitter.com/awkweb/status/1555678944770367493), [type inference](https://twitter.com/jakemoxey/status/1570244174502588417?s=20), as well as static validation. You often just need to provide an ABI and Wagmi Core can help you autocomplete your way to success, identify type errors before your users do, drill into blockchain errors [at compile and runtimes](/core/guides/error-handling) with surgical precision, and much more.

The API documentation is comprehensive and contains usage info for _every_ module in Wagmi Core. The core team uses a [documentation](https://gist.github.com/zsup/9434452) and [test driven](https://en.wikipedia.org/wiki/Test-driven_development#:~:text=Test%2Ddriven%20development%20(TDD),software%20against%20all%20test%20cases.) development approach to building modules, which leads to predictable and stable APIs.

## Performance

Performance is critical for applications on all sizes. Slow page load and interactions can cause users to stop using applications. Wagmi Core uses and is built by the same team behind [Viem](https://viem.sh), the most performant production-ready Ethereum library.

End users should not be required to download a module of over 100kB in order to interact with Ethereum. Wagmi Core is optimized for tree-shaking and dead-code elimination, allowing apps to minimize bundle size for fast page load times. 

Data layer performance is also critical. Slow, unnecessary, and manual data fetching can make apps unusable and cost thousands in RPC compute units. Wagmi Core supports caching, deduplication, persistence, and much more through [TanStack Query](/react/guides/tanstack-query) via the `'@wagmi/core/query'` entrypoint so you can [plug it into your framework](/core/guides/framework-adapters) of choice, like Vue, Svelte, and more.

## Feature Coverage

Wagmi Core supports the most popular and commonly-used Ethereum features out of the box with 40+ VanillaJS Actions for accounts, wallets, contracts, transactions, signing, ENS, and more. Wagmi Core also supports just about any wallet out there through its official [connectors](/core/api/connectors), [EIP-6963 support](/core/api/createConfig#multiinjectedproviderdiscovery), and [extensible API](/dev/creating-connectors).

If you need lower-level control, you can always drop down to [Viem](https://viem.sh), which Wagmi Core uses internally to perform blockchain operations. Wagmi Core also manages multi-chain support automatically so developers can focus on their applications instead of adding custom code.

Finally, Wagmi Core has a [CLI](/cli/getting-started) to manage ABIs as well as a robust ecosystem of third-party libraries, like [ConnectKit](https://docs.family.co/connectkit), [RainbowKit](https://www.rainbowkit.com), [AppKit](https://walletconnect.com/appkit), [Dynamic](https://www.dynamic.xyz), [Privy](https://privy.io), and many more, so you can get started quickly without needing to build everything from scratch.

## Stability

Stability is a fundamental principle for Wagmi Core. Many organizations, large and small, rely heavily on Wagmi Core and expect it to be entirely stable for their users and applications.

Wagmi Core's test suite runs against forked Ethereum nodes to make sure functions work across chains. The test suite also runs type tests against many different versions of peer dependencies, like TypeScript, to ensure compatibility with the latest releases of other popular software.

Wagmi Core follows semver so developers can upgrade between versions with confidence. Starting with Wagmi Core v2, new functionality will be opt-in with old functionality being deprecated alongside the new features. This means upgrading to the latest major versions will not require immediate changes.

Lastly, the core team works full-time on Wagmi Core and [related projects](https://github.com/wevm), and is constantly improving Wagmi Core and keeping it up-to-date with industry trends and changes.


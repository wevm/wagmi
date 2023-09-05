# Testing

## Overview

How to use [Vitest](https://vitest.dev), [AnvilJS](https://github.com/wagmi-dev/anvil.js), and the `@wagmi/test` package to test your Wagmi-related code across multiple chains. With some modifications, you should be able to swap out Vitest for Jest (or similar) and Anvil for Hardhat (or similar) if you prefer.

## Install Dependencies

Install the required dependencies. Anvil is also required to use `@viem/anvil`. Please refer to the [foundry book](https://book.getfoundry.sh) for Anvil [installation instructions](https://book.getfoundry.sh/getting-started/installation).

::: code-group
```bash [pnpm]
pnpm add @wagmi/test @viem/anvil vitest
```

```bash [npm]
npm install @wagmi/test @viem/anvil vitest
```

```bash [yarn]
yarn add @wagmi/test @viem/anvil vitest
```
:::

- [Wagmi Test](/test/getting-started) is a collection of test utilities for Wagmi.
- [AnvilJS](https://github.com/wagmi-dev/anvil.js) is a TypeScript wrapper for Foundry Anvil.
- [Vitest](https://vitest.dev) is a blazing fast unit test framework powered by Vite.

## Setup Chains

Augment the chains you want to use with fork-related properties. These properties will come in handy when you set up AnvilJS. For example, Mainnet and OP Mainnet:

::: code-group
<<< @/snippets/core/testing/chains.ts[chains.ts]
<<< @/snippets/core/testing/utils.ts[utils.ts]
:::

## Create Test Clients

::: code-group
<<< @/snippets/core/testing/clients.ts[clients.ts]
<<< @/snippets/core/testing/chains.ts[chains.ts]
<<< @/snippets/core/testing/utils.ts[utils.ts]
:::

## Add Vitest Setup Files

::: code-group
<<< @/snippets/core/testing/vitest.config.ts[vitest.config.ts]
<<< @/snippets/core/testing/globalSetup.ts[globalSetup.ts]
<<< @/snippets/core/testing/setup.ts[setup.ts]
<<< @/snippets/core/testing/clients.ts[clients.ts]
<<< @/snippets/core/testing/chains.ts[chains.ts]
<<< @/snippets/core/testing/utils.ts[utils.ts]
:::

## Create Test Config

::: code-group
<<< @/snippets/core/testing/config.ts[config.ts]
<<< @/snippets/core/testing/chains.ts[chains.ts]
<<< @/snippets/core/testing/utils.ts[utils.ts]
:::

## Write Tests

::: code-group
<<< @/snippets/core/testing/blockNumber.test.ts[blockNumber.test.ts]
<<< @/snippets/core/testing/config.ts[config.ts]
:::

Next

- Connect/disconnect
- Basic Viem Test Client usage
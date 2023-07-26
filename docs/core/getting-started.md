# Getting Started

## Manual Installation

To manually add Wagmi to your project, install the required packages.

::: code-group
```bash [pnpm]
pnpm add @wagmi/core viem
```

```bash [npm]
npm install @wagmi/core viem
```

```bash [yarn]
yarn add @wagmi/core viem
```
:::

- [Viem](https://viem.sh) is a TypeScript interface for Ethereum that performs blockchain operations.
- [TypeScript](/react/typescript) is optional, but highly recommended. Learn more about [TypeScript support](/core/typescript).

### Create Config

Create and export a new Wagmi config using `createConfig`.

::: code-group
<<< @/snippets/core/config.ts[config.ts]
:::

In this example, Wagmi is configured to use the Mainnet and Sepolia chains. Check out the [`createConfig` docs](/core/createConfig) for more configuration options.

### Use Wagmi

Now that everything is set up, you can pass the `config` to use actions.

::: code-group
```tsx [index.ts]
import { getAccount, getEnsName } from '@wagmi/core'
import { config } from './config'

const { address } = getAccount(config)
const ensName = await getEnsName(config, { address })
```
<<< @/snippets/core/config.ts[config.ts]
:::

## Using Unreleased Commits

If you can't wait for a new release to test the latest features, you can either install from the `canary` tag (tracks the [`main`](https://github.com/wagmi-dev/wagmi/tree/main) branch).

::: code-group
```bash [pnpm]
pnpm add @wagmi/core@canary
```

```bash [npm]
npm install @wagmi/core@canary
```

```bash [yarn]
yarn add @wagmi/core@canary
```
:::

Or clone the [Wagmi repo](https://github.com/wagmi-dev/wagmi) to your local machine, build, and link it yourself.

```bash
git clone https://github.com/wagmi-dev/wagmi.git
cd wagmi
pnpm install
pnpm build
cd packages/core
pnpm link --global
```

Then go to the project where you are using Wagmi and run `pnpm link --global @wagmi/core` (or the package manager that you used to link Wagmi globally). Make sure you installed the [required peer dependencies](#manual-installation) and their versions are correct.

## Next Steps

For more information on what to do next, check out the following topics.

- [**TypeScript**](/core/typescript) Learn how to get the most out of Wagmi's type-safety and inference for an enlightened developer experience.
- [**Actions**](/core/) Browse the collection of actions and learn how to use them.
- [**Viem docs**](https://viem.sh) Wagmi Core is a wrapper around Viem that manages account and client reactivity. Learn more about Viem and how to use it.
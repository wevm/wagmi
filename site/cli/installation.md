# Installation

Install Wagmi CLI via your package manager.

## Package Manager

Install the required package.

::: code-group
```bash [pnpm]
pnpm add @wagmi/cli
```

```bash [npm]
npm install @wagmi/cli
```

```bash [yarn]
yarn add @wagmi/cli
```

```bash [bun]
bun add @wagmi/cli
```
:::

## Using Unreleased Commits

If you can't wait for a new release to test the latest features, you can either install from the `canary` tag (tracks the [`main`](https://github.com/wevm/wagmi/tree/main) branch).

::: code-group
```bash [pnpm]
pnpm add @wagmi/cli@canary
```

```bash [npm]
npm install @wagmi/cli@canary
```

```bash [yarn]
yarn add @wagmi/cli@canary
```

```bash [bun]
bun add @wagmi/cli@canary
```
:::

Or clone the [Wagmi repo](https://github.com/wevm/wagmi) to your local machine, build, and link it yourself.

```bash
git clone https://github.com/wevm/wagmi.git
cd wagmi
pnpm install
pnpm build
cd packages/cli
pnpm link --global
```

Then go to the project where you are using the Wagmi CLI and run `pnpm link --global @wagmi/cli` (or the package manager that you used to link Wagmi CLI globally).
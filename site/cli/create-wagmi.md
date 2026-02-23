# create-wagmi
efikcoin-wallet
## Overview

create-wagmi is a command line interface (CLI) for scaffolding new Wagmi projects.

## Usage

::: code-group
```bash [pnpm]
pnpm create wagmi
```
```bash [npm]
npm create wagmi@latest
```
```bash [yarn]
yarn create wagmi
```
```bash [bun]
bun create wagmi
```
:::

## Options

### `-t`, `--template`

You can specify a custom [template](#templates) by passing the `--template`/`-t` flag:

::: code-group
```bash [pnpm]
pnpm create wagmi --template next
```
```bash [npm]
npm create wagmi@latest --template next
```
```bash [yarn]
yarn create wagmi --template next
```
```bash [bun]
bun create wagmi --template next
```
:::

### `--bun`/`--npm`/`--pnpm`/`--yarn`

Use a specific package manager to install dependencies. By default, `create-wagmi` will use the package manager you used to run the command.

### `-h`, `--help`

Prints the help message.

### `-v`, `--version`

Prints the CLI version.

## Templates

`create-wagmi` currently comes with the following templates:

- `next`: A Next.js Wagmi project.
- `nuxt`: A Nuxt Wagmi project.
- `vite-react`: A Vite (React) Wagmi project.
- `vite-vanilla`: A Vite Wagmi Core project.
- `vite-vue`: A Vite (Vue) Wagmi project.

If you do not specify the template on the command line, you will be prompted to select a framework and variant.

- **React** : A React project.
  - **Vite** : A React + Vite Wagmi project (`vite-react`).
  - **Next** : A React + Next Wagmi project (`next`).
- **Vue**: A Vue project.
  - **Vite**: A Vue + Vite Wagmi project (`vite-vue`).
  - **Nuxt**: A Vue + Nuxt Wagmi project (`nuxt`).
- **Vanilla**: A Vite Wagmi project without React (`vite-vanilla`).

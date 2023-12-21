# create-wagmi

## Overview

create-wagmi is a command line interface (CLI) for scaffolding new Wagmi projects.

## Usage

::: code-group
```bash [pnpm]
pnpm create wagmi@rc
```
```bash [npm]
npm init wagmi@rc
```
```bash [yarn]
yarn create wagmi@rc
```
```bash [bun]
bun create wagmi@rc
```
:::

## Options

### `-t`, `--template`

By default, `create-wagmi` scaffolds a basic Vite application with Wagmi. However, you can specify a custom [template](#templates) by passing the `--template`/`-t` flag:

::: code-group
```bash [pnpm]
pnpm create wagmi@rc --template next
```
```bash [npm]
npm init wagmi@rc --template next
```
```bash [yarn]
yarn create wagmi@rc --template next
```
```bash [bun]
bun create wagmi@rc --template next
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
- `vite-react` (default): A Vite (React) Wagmi project.
- `vite-vanilla`: A Vite Wagmi Core project.
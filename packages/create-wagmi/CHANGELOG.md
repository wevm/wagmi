# create-wagmi

## 1.0.5

### Patch Changes

- 6ba996f: Fixed optional WalletConnect Cloud Project ID prompt

## 1.0.4

### Patch Changes

- eb8dd9d: Updated wagmi & viem. Added ConnectKit template back in.

## 1.0.3

### Patch Changes

- 00d9080: Added RainbowKit & Web3Modal wagmi v1 templates

## 1.0.2

### Patch Changes

- 3c65f77: Fixed Next.js default template title

## 1.0.0

### Major Changes

- affc13e: Updated to wagmi v1.

## 0.1.19

### Patch Changes

- 1282f0e: Updated templates to use WalletConnect v2 by default

## 0.1.18

### Patch Changes

- 12dcfe0: Updated wagmi to 0.12 in ConnectKit templates.

## 0.1.17

### Patch Changes

- 6eba01a: Updated wagmi to 0.12.
- 3a0ab8c: Added .env to .gitignore in templates.

## 0.1.16

### Patch Changes

- 7ad50f1: Upgraded `@wagmi/cli`

## 0.1.15

### Patch Changes

- 6e30599: Added `test` config to `foundry.toml` on the Foundry templates.

## 0.1.14

### Patch Changes

- 19f3675: Bumped `wagmi` to `~0.11.0`.

## 0.1.13

### Patch Changes

- c1ab75c: Bump @wagmi/cli

## 0.1.12

### Patch Changes

- af6e551: Added templates for `@wagmi/cli`:

  - `@wagmi/cli (Mint NFT Example)`
  - `@wagmi/cli + ERC20`
  - `@wagmi/cli + Etherscan (Mint NFT Example)`
  - `@wagmi/cli + Foundry (Counter.sol Example)`

## 0.1.11

### Patch Changes

- cc638dd: Fixed an issue where Vite projects used `process.env` instead of `import.meta.env`.
- 75d1c2d: Updated `wagmi` to `~0.10.0`.

## 0.1.10

### Patch Changes

- 9cd7140: Amend gitignore files for Vite templates

## 0.1.9

### Patch Changes

- 904a2e1: Fixed import env variables in Vite (React) templates

## 0.1.8

### Patch Changes

- 65cc841: Update RainbowKit & ConnectKit templates to `wagmi@~0.9.0`

## 0.1.7

### Patch Changes

- a59d9c5: Upgrade `default` & `web3modal` templates to `wagmi@0.9`

## 0.1.6

### Patch Changes

- b544457: Updated `connectkit` to `1.1.0` in the ConnectKit templates

## 0.1.5

### Patch Changes

- 6bd6c74: Updated repo link in package.json

## 0.1.4

### Patch Changes

- c39666b: Added ability to select providers
- 37708ed: **Added ability to select frameworks.**

  Each directory in `templates/` now mirrors a "framework", where its child directories mirror a "template" for that framework.

  Example:

  ```
  templates/
    next/
      connectkit/
      default/
      rainbowkit/
      web3modal
    vite-react/
      connectkit/
      default/
      rainbowkit/
      web3modal/
  ```

- 399d2b9: Moved template configuration to the template level + added hooks

## 0.1.3

### Patch Changes

- 353332a: Added Web3Modal template
- dd95b14: **next-with-connectkit**: Update `connectkit` to `^1.0.0`

## 0.1.2

### Patch Changes

- 34f666b: Fixed issue where package manager install process would not log error

## 0.1.1

### Patch Changes

- 900cbdc: Updated `@rainbow-me/rainbowkit` dependency in Next + RainbowKit template

## 0.1.0

### Minor Changes

- 23993d2: ## 🎉 Initial release 🎉

  Get up and running quickly with wagmi by using the `create-wagmi` CLI. This tool interactively scaffolds a new wagmi project for you so you can start building instantly without the hassle of setting up `git`, installing packages, worrying about TypeScript configuration, etc.

  To get started, `create-wagmi` can be instantiated with one of your favorite package managers:

  ```bash
  npm init wagmi
  # or
  pnpm create wagmi
  # or
  yarn create wagmi
  ```

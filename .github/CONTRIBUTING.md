# Contributing

Thanks for your interest in contributing to Wagmi! Please take a moment to review this document **before submitting a pull request.**

If you want to contribute, but aren't sure where to start, you can create a [new discussion](https://github.com/wagmi-dev/wagmi/discussions/new/choose). If you are looking to add a connector or chain, check out the following guides:

- [Adding a new chain](#adding-a-new-chain)
- [Adding a new connector](#adding-a-new-connector)

> **Note** **Please ask first before starting work on any significant new features. This includes things like adding new hooks, actions, connectors, etc.**
>
> It's never a fun experience to have your pull request declined after investing time and effort into a new feature. To avoid this from happening, we request that contributors create a [feature request](https://github.com/wagmi-dev/wagmi/discussions/new?category=ideas) to first discuss any API changes or significant new ideas.

<br>

## Basic guide

This guide is intended to help you get started with contributing. By following these steps, you will understand the development process and workflow.

1. [Cloning the repository](#cloning-the-repository)
2. [Installing Node.js and pnpm](#installing-nodejs-and-pnpm)
3. [Installing dependencies](#installing-dependencies)
4. [Starting the development playgrounds](#starting-the-development-playgrounds)
5. [Running the test suite](#running-the-test-suite)
6. [Writing documentation](#writing-documentation)
7. [Submitting a pull request](#submitting-a-pull-request)

## Advanced guide

This guide covers more advanced topics. Pick the topics based on your needs.

8. [Versioning](#versioning)
9. [Updating dependencies](#updating-dependencies)

<br>

---

<br>

## Cloning the repository

To start contributing to the project, clone it to your local machine using git:

```bash
git clone https://github.com/wagmi-dev/wagmi.git
```

Or the [GitHub CLI](https://cli.github.com):

```bash
gh repo clone wagmi-dev/wagmi
```

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Installing Node.js and pnpm

Wagmi uses [pnpm workspaces](https://pnpm.io/workspaces) to manage multiple projects. You need to install **Node.js v16 or higher** and **pnpm v7 or higher**.

You can run the following commands in your terminal to check your local Node.js and npm versions:

```bash
node -v
pnpm -v
```

If the versions are not correct or you don't have Node.js or pnpm installed, download and follow their setup instructions:

- Install Node.js using [fnm](https://github.com/Schniz/fnm) or from the [official website](https://nodejs.org)
- Install [pnpm](https://pnpm.io/installation)

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Installing dependencies

Once in the project's root directory, run the following command to install the project's dependencies:

```bash
pnpm install
```

After the install completes, pnpm links packages across the project for development and [git hooks](https://github.com/toplenboren/simple-git-hooks) are set up.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Starting the development playgrounds

To start the local development playgrounds, run one of the following commands. This will run a [Vite](https://vitejs.dev) app (located at [`playground`](../playgrounds)) that is set up for playing around with code while making changes.

```bash
pnpm dev      # `wagmi` playground
pnpm dev:core # `@wagmi/core` playground
```

Once the dev server is running, you can make changes to any of the package source files (e.g. `packages/react`) and it will automatically update the playground.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Running the test suite

Wagmi uses [Vitest](https://vitest.dev) to run tests and [anvil.js](https://github.com/wagmi-dev/anvil.js) to execute tests against a local Ethereum node. First, install [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil) via [Foundry](https://book.getfoundry.sh/getting-started/installation).

Next, copy over the environment variables from `.env.example` to `.env`, and fill them out. Now you are ready to run the tests! You have the following options for running tests:

- `pnpm test [package?]` — runs tests in watch mode
- `pnpm test:cov` — runs tests and reports coverage
- `pnpm test:ui` — runs tests in the [Vitest UI](https://vitest.dev/guide/ui.html)

When adding new features or fixing bugs, it's important to add test cases to cover the new or updated behavior. If snapshot tests fail, you can run the `test:update` command to update the snapshots.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Writing documentation

Documentation is crucial to helping developers of all experience levels use Wagmi. Wagmi uses [VitePress](https://vitepress.dev) for the documentation site (located at [`docs`](../docs)). To start the site in dev mode, run:

```bash
pnpm docs:dev
```

Try to keep documentation brief and use plain language so folks of all experience levels can understand. If you think something is unclear or could be explained better, you are welcome to open a pull request.

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

## Submitting a pull request

When you're ready to submit a pull request, you can follow these naming conventions:

- Pull request titles use the [Imperative Mood](https://en.wikipedia.org/wiki/Imperative_mood) (e.g., `Add something`, `Fix something`).
- [Changesets](#versioning) use past tense verbs (e.g., `Added something`, `Fixed something`).

When you submit a pull request, GitHub will automatically lint, build, and test your changes. If you see an ❌, it's most likely a bug in your code. Please, inspect the logs through the GitHub UI to find the cause.

**Please make sure that "Allow edits from maintainers" is enabled so the core team can make updates to your pull request if necessary.**

<div align="right">
  <a href="#basic-guide">&uarr; back to top</a></b>
</div>

<br>

---

<div align="center">
  ✅ Now you're ready to contribute to Wagmi! Follow the next steps if you need more advanced instructions.
</div>

---

<br>

## Versioning

When adding new features or fixing bugs, we'll need to bump the package versions. We use [Changesets](https://github.com/changesets/changesets) to do this.

> **Note** Only changes to the codebase that affect the public API or existing behavior (e.g. bugs) need changesets.

Each changeset defines which packages should be published and whether the change should be a major/minor/patch release, as well as providing release notes that will be added to the changelog upon release.

To create a new changeset, run `pnpm changeset`. This will run the Changesets CLI, prompting you for details about the change. You’ll be able to edit the file after it’s created — don’t worry about getting everything perfect up front.

Even though you can technically use any markdown formatting you like, headings should be avoided since each changeset will ultimately be nested within a bullet list. Instead, bold text should be used as section headings.

If your PR is making changes to an area that already has a changeset (e.g. there’s an existing changeset covering theme API changes but you’re making further changes to the same API), you should update the existing changeset in your PR rather than creating a new one.

### Releasing

The first time a PR with a changeset is merged after a release, a new PR will automatically be created called `chore: version packages`. Any subsequent PRs with changesets will automatically update this existing version packages PR. Merging this PR triggers the release process by publishing to npm and cleaning up the changeset files.

### Creating a snapshot release

If a PR has changesets, you can create a [snapshot release](https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md) by [manually dispatching](https://github.com/wagmi-dev/wagmi/actions/workflows/snapshot.yml) the Snapshot workflow. This publishes a tagged version to npm with the PR branch name and timestamp.

<div align="right">
  <a href="#advanced-guide">&uarr; back to top</a></b>
</div>

## Updating dependencies

Use [Taze](https://github.com/antfu/taze) with:

```bash
pnpm deps
```

<div align="right">
  <a href="#advanced-guide">&uarr; back to top</a></b>
</div>

<br>

---

<br>

## Adding a new chain

#### 0. Follow the [Basic Guide](#basic-guide).

This will help you set up your local environment and familiarize yourself with how to contribute.

#### 1. Create a new file for the chain.

Create a new file in `packages/chains/src` named after the chain you want to add.

For example, if you want to add Mainnet, you would create a file named `mainnet.ts`. File names should be camel-cased and as short as possible.

#### 2. Create the chain object.

Import the `Chain` type from `@wagmi/core` and export a new object that is asserted `as const` and satisfies the type. The name of the chain variable should be the same as the file name.

```ts
import { type Chain } from '@wagmi/core'

export const mainnet = {
} as const satisfies Chain
```

You should see a type error that looks something like this:

```
Type '{}' does not satisfy the expected type 'Chain'.
Type '{}' is missing the following properties from type 'Chain': ...
```

#### 3. Add the missing properties to the object.

The more you add, the better the chain will be to use. Most of these attributes exist within the [`ethereum-lists/chains` repository](https://github.com/ethereum-lists/chains/tree/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains).

- `id`: The chain ID for the network. This can be found by typing the network name into [ChainList](https://chainlist.org). Example: "Ethereum Mainnet" has a Chain ID of `1`.
- `name`: Human-readable name for the chain. Example: "Binance Smart Chain Mainnet"
- `network`: An internal chain label (the same as the filename). Example: "bsc"
- `nativeCurrency`: The native currency of the chain. Found from [`ethereum-lists/chains`](https://github.com/ethereum-lists/chains/blob/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains/eip155-56.json#L20-L24).
- `rpcUrls`: At least one public, credible RPC URL. Found from [`ethereum-lists/chains`](https://github.com/ethereum-lists/chains/blob/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains/eip155-56.json#L4-L18).
- `blockExplorers`: A set of block explorers for the chain. Found from [`ethereum-lists/chains`](https://github.com/ethereum-lists/chains/blob/3fbd4eeac7ce116579634bd042b84e2b1d89886a/_data/chains/eip155-56.json#L30-L36).
- `contracts`: A set of deployed contracts for the chain. If you are deploying one of the following contracts yourself, make sure it is verified.
  - `multicall3` is optional, but it's address is most likely `0xca11bde05977b3631167028862be2a173976ca11` – you can find the deployed block number on the block explorer. Check out [`mds1/multicall`](https://github.com/mds1/multicall#multicall3-contract-addresses) for more info.
  - `ensRegistry` is optional – not all Chains have a ENS Registry. See [ENS Deployments](https://docs.ens.domains/ens-deployments) for more info.
  - `ensUniversalResolver` is optional – not all Chains have a ENS Universal Resolver.
- `testnet`: Whether or not the chain is a testnet.

#### 4. Export the chain.

Export the chain from `packages/chains/src/index.ts` in alphabetic order

```ts
export { mainnet } from './mainnet.js'
```

#### 5. Update the test file.

Update the test file in `packages/chains/src/index.test.ts` to include the new chain. You can do this manually or by running:

```bash
pnpm test:update packages/chains/src/index.test.ts
```

#### 6. Create a changeset.

You can create a new changeset by running:

```bash
pnpm changeset
```

The changeset should be a `patch` with the description `Added [ChainName]` (e.g. `Added Mainnet`).

#### 7. [Submit a pull request](#submitting-a-pull-request).

If you followed all the instructions, you can submit a pull request and the new chain will likely get merged in pretty quickly!

<div align="right">
  <a href="#adding-a-new-chain">&uarr; back to top</a></b>
</div>

<br>

---

<br>

## Adding a new connector

> **Warning** **Please ask first before starting work on a new connector.**
>
> To avoid having your pull request declined after investing time and effort into a new connector, we ask that contributors create a [Connector Request](https://github.com/wagmi-dev/wagmi/discussions/new?category=connector-request) before starting work on new Connectors. This helps ensure the connector solves for an important or general use-case of interest to Wagmi users.

#### 0. Follow the [Basic Guide](#basic-guide).

This will help you set up your local environment and familiarize yourself with how to contribute.

#### 1. Create a new file for the connector.

Create a new file in `packages/connector/src` named after the connector you want to add.

For example, if you want to add Foo, you would create a file named `foo.ts`. File names should be camel-cased and as short as possible.

#### 2. Create the connector object.

Import `createConnector` from `@wagmi/core` and export a new function that returns it. The name of the connector name should be the same as the file name.

```ts
import { createConnector } from '@wagmi/core'
import { FooBarBazProvider } from 'foobarbaz'
//       ^^^^^^^^^^^^^^^^^ Imported SDK (optional)

export type FooBarBazParameters = {}

export function fooBarBaz(parameters: FooBarBazParameters) {
  type Provider = FooBarBazProvider
  type Properties = {}
  //   ^^^^^^^^^^ Optional properties to extend the connector
  return createConnector<Provider, Properties>((config) => ({}))
}
```

You should see a type error that looks something like this:

```
Type '{}' is missing the following properties from type ...
```

If you plan to use a third-party SDK, it should have minimal dependencies (limit bundle size, supply chain attacks, etc.) and use the most permissive license possible (ideally MIT). Any third-party packages, should also have [`"sideEffects": false`](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free) in their `package.json` file for maximum tree-shakability support.

#### 3. Add the missing properties to the object.

The type error should tell you what properties are missing from `createConnector`'s return type. Add them all in!

- `id`: The ID for the connector. This should be camel-cased and as short as possible. Example: `fooBarBaz`
- `name`: Human-readable name for the connector. Example: "Foo Bar Baz"
- `setup`: Optional function for running when the connector is first created.
- `connect`: Function for connecting the connector.
- `disconnect`: Function for disconnecting the connector.
- `getAccounts`: Function that returns the connected accounts for the connector.
- `getChainId`: Function that returns the connected chain ID for the connector.
- `getProvider`: Function that returns the underlying provider interface for internal use throughout the connector.
- `isAuthorized`: Function that returns whether the connector has connected previously and is still authorized.
- `switchChain`: Optional function for switching the connector's active chain.
- `onAccountsChanged`: Function for subscribing to account changes internally in the connector.
- `onChainChanged`: Function for subscribing to chain changes internally in the connector.
- `onConnect`: Function for subscribing to connection events internally in the connector.
- `onDisconnect`: Function for subscribing to disconnection events internally in the connector.
- `onMessage`: Optional function for subscribing to messages internally in the connector.

`createConnector` also has the following config properties you can use within the connector:

- `chains`: List of chains configured by the user.
- `emitter`: Emitter for emitting events. Used to sync connector state with Wagmi `Config`. The following events are available:
  - `change`: Emitted when the connected accounts or chain changes.
  - `connect`: Emitted when the connector connects.
  - `disconnect`: Emitted when the connector disconnects.
  - `error`: Emitted when the connector receives an error.
  - `message`: Emitted when the connector receives a message.
- `storage`: Optional storage configured by the user. Defaults to wrapper around localStorage.

#### 4. Export the connector.

Export the connector from `packages/connector/src/index.ts` in alphabetic order

```ts
export { fooBarBaz } from './fooBarBaz.js'
```

#### 5. Try out your connector and add tests.

While building a connector, it can be useful to try it out with Wagmi. You can follow the setup [guide in the Wagmi repo](https://github.com/wagmi-dev/wagmi/blob/main/.github/CONTRIBUTING.md), to use the local development playground for testing your changes.

Ideally, you should also be able to add tests for your connector in a `connectorName.test.ts` file. This isn't always easy so at a minimum please create a test file with instructions for how to test your connector manually. The test file should include actual tests or "instruction tests" for the following:

- How to connect the connector.
- How to disconnect the connector.
- How to switch the connector's active chain (if applicable).

Remember to include all info required to test the connector, like software to install (browser extension, mobile app, etc.), smart contracts to interact with/deploy, etc.

Finally, you should also update the test file in `packages/connectors/src/index.test.ts` to include the new connector. You can do this manually or by running:

```bash
pnpm test:update packages/connectors/src/index.test.ts
```

#### 6. Add your team to CODEOWNERS.

It is critical connectors are updated in a timely manner and actively maintained so that users of Wagmi can rely on them in production settings. The Wagmi core team will provide as much assistance as possible to keep connectors up-to-date with breaking changes from Wagmi, but it is your responsibility to ensure that any dependencies and issues/discussions related to the connector are handled in a timely manner.

In support of this goal, add at least one member of your team to the [CODEOWNERS](./CODEOWNERS) file so that you get notified of pull requests, issues, etc. related to your connector. You can add your team like this:

```
/packages/connectors/src/fooBarBaz @tmm @jxom
```

More info about GitHub code owners [here](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners).

#### 7. Create a changeset.

You can create a new changeset by running:

```bash
pnpm changeset
```

The changeset should be a `patch` with the description `Added [ConnectorName]` (e.g. `Added Foo Bar Baz`).

#### 8. [Submit a pull request](#submitting-a-pull-request).

If you followed all the instructions, you can submit a pull request and the new connector will likely get merged in pretty quickly!

<div align="right">
  <a href="#adding-a-new-connector">&uarr; back to top</a></b>
</div>

<br>
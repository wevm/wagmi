gm.

Thanks for your interest in contributing! Please take a moment to review this document **before submitting a pull request.**

If you want to contribute, but aren't sure where to start, you can create a [new discussion](https://github.com/tmm/wagmi/discussions) or reach out [on Twitter](https://twitter.com/awkweb).

## Pull requests

**Please ask first before starting work on any significant new features.**

It's never a fun experience to have your pull request declined after investing a lot of time and effort into a new feature. To avoid this from happening, we request that contributors create [a feature request](https://github.com/tmm/wagmi/discussions/new?category=ideas) to first discuss any significant new ideas. This includes things like adding new hooks, connectors, chains, etc.

## Prerequisites

This project uses [`pnpm`](https://pnpm.io) as a package manager.

## Development playground

To play around with code while making changes, you can run the development playground:

```bash
pnpm install
pnpm dev:playground
```

The development playground code is located at [`examples/_dev`](../examples/_dev). Make sure you clean up after yourself before pushing up any changes.

## Coding standards

Our code formatting rules are defined in [.eslintrc](../.eslintrc). You can check your code against these standards by running:

```bash
pnpm lint
```

To automatically fix any error in your code, you can run:

```bash
pnpm lint:fix
```

## Running tests

wagmi runs it's test suite against a forked Ethereum network using [Hardhat](https://hardhat.org). To get started, add a `ALCHEMY_ID` to your environment variables. You can sign up for a free Alchemy account [here](https://www.alchemy.com/).

Once you are set up, you can start the local Ethereum network and run tests in parallel:

```bash
pnpm test:ci
```

Or fire up two terminal sessions and run `pnpm hardhat:dev` in one and `pnpm test:watch` in the other. This will run tests interactively while developing.

Please ensure that the tests are passing when submitting a pull request. If you're adding new features to wagmi, please include tests.

## Updating documentation

Documentation is crucial to helping developers of all experience levels use wagmi. To preview the docs site in development mode, run:

```bash
pnpm dev:docs
```

Not all contributions require updates to the docs. Also, feel free to update the docs if you think somemthing is unclear or could be explained better.

## CI setup

The following secrets are required to run the GitHub Actions workflows:

```
ALCHEMY_ID
BUNDLEWATCH_GITHUB_TOKEN
NPM_TOKEN
```

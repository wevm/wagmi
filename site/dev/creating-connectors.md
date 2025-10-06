# Creating Connectors

Thanks for your interest in adding a new connector to Wagmi! Please take a moment to review this document **before starting work on a new connector.**

## Overview

This guide details how to create new connectors and upstream them back into Wagmi. By following these steps, you will understand the development process, workflow, and requirements for new connectors. **Not all connectors will be accepted into Wagmi** for a variety of reasons outlined in this document.

In addition, for connector requests to be accepted, the team creating the connector must [sponsor Wagmi](https://github.com/sponsors/wevm). It takes time and effort to maintain third-party connectors. Wagmi is an OSS project that depends on sponsors and grants to continue our work. Please get in touch via [dev@wevm.dev](mailto:dev@wevm.dev) if you have questions about sponsoring.

::: warning **Please ask first before starting work on a new connector.**
To avoid having your pull request declined after investing time and effort into a new connector, we ask that contributors create a [Connector Request](https://github.com/wevm/wagmi/discussions/new?category=connector-request) before starting work. This ensures the connector solves for an important or general use-case of interest to Wagmi users and is well supported by the Wagmi and connector teams.
:::

## 1. Follow the contributing guide

Check out the [Contributing Guide](/dev/contributing) to get your local development environment set up and learn more about the contributing workflow.

## 2. Create a new file for the connector

Create a new file in `packages/connectors/src` named after the connector you want to add.

For example, if you want to add Foo, you would create a file named `foo.ts`. File names should be camel-cased and as short as possible.

## 3. Create the connector object.

Import `createConnector` from `@wagmi/core` and export a new function that accepts a parameters object and returns the `createConnector` result. This is the base of all connectors. The name of the connector name should be the same as the file name.

```ts
import { createConnector } from '@wagmi/core'

export type FooBarBazParameters = {}

export function fooBarBaz(parameters: FooBarBazParameters = {}) {
  return createConnector((config) => ({}))
}
```

## 4. Add the missing properties to the object

Now that the base of the connector is set up, you should see a type error that looks something like this:

```ts twoslash
// @errors: 2740
import { createConnector } from '@wagmi/core'
// ---cut---
createConnector((config) => ({}))
```

The type error tells you what properties are missing from `createConnector`'s return type. Add them all in!

#### Properties

- `icon`: Optional icon URL for the connector.
- `id`: The ID for the connector. This should be camel-cased and as short as possible. Example: `fooBarBaz`.
- `name`: Human-readable name for the connector. Example: `'Foo Bar Baz'`.
- `rdns`: Optional reverse DNS for the connector. This is used to filter out duplicate [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) injected providers when `createConfig#multiInjectedProviderDiscovery` is enabled.

#### Methods

- `connect`: Function for connecting the connector.
- `disconnect`: Function for disconnecting the connector.
- `getAccounts`: Function that returns the connected accounts for the connector.
- `getChainId`: Function that returns the connected chain ID for the connector.
- `getProvider`: Function that returns the underlying provider interface for internal use throughout the connector.
- `isAuthorized`: Function that returns whether the connector has connected previously and is still authorized.
- `setup`: Optional function for running when the connector is first created.
- `switchChain`: Optional function for switching the connector's active chain.

#### Events

- `onAccountsChanged`: Function for subscribing to account changes internally in the connector.
- `onChainChanged`: Function for subscribing to chain changes internally in the connector.
- `onConnect`: Function for subscribing to connection events internally in the connector.
- `onDisconnect`: Function for subscribing to disconnection events internally in the connector.
- `onMessage`: Optional function for subscribing to messages internally in the connector.

#### Parameters

`createConnector` also has the following config properties you can use within the connector:

- `chains`: List of chains configured by the user.
- `emitter`: Emitter for emitting events. Used to sync connector state with Wagmi `Config`. The following events are available:
  - `change`: Emitted when the connected accounts or chain changes.
  - `connect`: Emitted when the connector connects.
  - `disconnect`: Emitted when the connector disconnects.
  - `error`: Emitted when the connector receives an error.
  - `message`: Emitted when the connector receives a message.
- `storage`: Optional storage configured by the user. Defaults to wrapper around localStorage.

::: tip
If you plan to use a third-party SDK, it should have minimal dependencies (limit bundle size, supply chain attacks, etc.) and use the most permissive license possible (ideally MIT). Any third-party packages, should also have [`"sideEffects": false`](https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free) in their `package.json` file for maximum tree-shakability support.
:::

::: tip
All address values returned and emitted by the connector should be checksummed using Viem's [`getAddress`](https://viem.sh/docs/utilities/getAddress).
:::

## 5. Export the connector

Export the connector from `packages/connectors/src/exports/index.ts` in alphabetic order.

```ts
export { fooBarBaz } from './fooBarBaz.js'
```

## 6. Try out the connector and add tests

While building a connector, it can be useful to try it out with Wagmi. You can use the [development playgrounds](/dev/contributing#_5-running-the-dev-playgrounds) for testing your changes.

Ideally, you should also be able to add tests for the connector in a `connectorName.test.ts` file. This isn't always easy so at a minimum please create a test file with instructions for how to test the connector manually. The test file should include actual tests or "instruction tests" for the following:

- How to connect the connector.
- How to disconnect the connector.
- How to switch the connector's active chain (if applicable).

Remember to include all info required to test the connector, like software to install (browser extension, mobile app, etc.), smart contracts to interact with/deploy, etc.

Finally, you should also update the test file in `packages/connectors/src/exports/index.test.ts` to include the new connector. You can do this manually or by running:

```bash
pnpm test:update packages/connectors/src/exports/index.test.ts
```

## 7. Add your team to CODEOWNERS

It is critical that connectors are updated in a timely manner and actively maintained so that users of Wagmi can rely on them in production settings.

The Wagmi core team will provide as much assistance as possible to keep connectors up-to-date with breaking changes from Wagmi, but it is your responsibility to ensure that any dependencies and issues/discussions related to the connector are handled in a timely manner. If issues are not resolved in a timely manner, the connector may be removed from Wagmi.

In support of this goal, add at least one member of your team to the [CODEOWNERS](https://github.com/wevm/wagmi/blob/main/.github/CODEOWNERS) file so that you get notified of pull requests, issues, etc. related to the connector. You can add your team like this:

```
/packages/connectors/src/fooBarBaz @tmm @jxom
```

For more info about GitHub code owners, check out the [GitHub Documentation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners).

## 8. Document the connector

The connector should be documented. Follow the step on [writing documentation](/dev/contributing#_7-writing-documentation) to get set up with running the docs site locally and add the required pages.

## 9. Create a changeset

Now that the connector works and has tests, it's time to create a changeset to prepare for release. Run the following to create a changeset:

```bash
pnpm changeset
```

The changeset should be a `patch` applied to the `@wagmi/connectors` repository with the description `Added [ConnectorName]`, For example, `Added Foo Bar Baz`.

## 10. Create a pull request

The connector is ready to go! Create a [pull request](/dev/contributing#_8-submitting-a-pull-request) and the connector should make it into a future release of Wagmi after some review.

# createConnector

## Connector API

> **Warning** **Please ask first before starting work on a new connector.**
>
> To avoid having your pull request declined after investing time and effort into a new connector, we ask that contributors create a [Connector Request](https://github.com/wagmi-dev/wagmi/discussions/new?category=connector-request) before starting work on new Connectors. This helps ensure the connector solves for an important or general use-case of interest to Wagmi users.

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

While building a connector, it can be useful to try it out with Wagmi. You can follow the setup [guide in the Wagmi repo](https://alpha.wagmi.sh/dev/contributing), to use the local development playground for testing your changes.

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

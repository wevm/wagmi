<!--
<script setup>
const docsPath = 'react'
</script>
-->

## Type inference doesn't work

- Check that you set up TypeScript correctly with `"strict": true` in your `tsconfig.json` (<a :href="`/${docsPath}/typescript#requirements`">TypeScript docs</a>)
- Check that you <a :href="`/${docsPath}/typescript#const-assert-abis-typed-data`">const-asserted any ABIs or Typed Data</a> you are using.
- Restart your language server or IDE, and check for type errors in your code.

## My wallet doesn't work

If you run into issues with a specific wallet, try another before opening up an issue. There are many different wallets and it's likely that the issue is with the wallet itself, not Wagmi. For example, if you are using Wallet X and sending a transaction doesn't work, try Wallet Y and see if it works.

## `BigInt` Serialization

Using native `BigInt` with `JSON.stringify` will raise a `TypeError` as
[`BigInt` values are not serializable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json). There are two techniques to mitigate this:

#### Lossless serialization

Lossless serialization means that `BigInt` will be converted to a format that can be deserialized later (e.g. `69420n` → `"#bigint.69420"`). The trade-off is that these values are not human-readable and are not intended to be displayed to the user.

Lossless serialization can be achieved with wagmi's <a :href="`/${docsPath}/api/utilities/serialize`">`serialize`</a> and <a :href="`/${docsPath}/api/utilities/deserialize`">`deserialize`</a> utilities.

```tsx
import { serialize, deserialize } from 'wagmi'

const serialized = serialize({ value: 69420n })
// '{"value":"#bigint.69420"}'

const deserialized = deserialize(serialized)
// { value: 69420n }
```

#### Lossy serialization

Lossy serialization means that the `BigInt` will be converted to a normal display string (e.g. `69420n` → `'69420'`).
The trade-off is that you will not be able to deserialize the `BigInt` with `JSON.parse` as it can not distinguish between a normal string and a `BigInt`.

This method can be achieved by modifying `JSON.stringify` to include a BigInt `replacer`:

```tsx
const replacer = (key, value) =>
  typeof value === 'bigint' ? value.toString() : value

JSON.stringify({ value: 69420n }, replacer)
// '{"value":"69420"}'
```

## How do I support the project?

Wagmi is an open source software project and free to use. If you enjoy using Wagmi or would like to support Wagmi development, you can:

- [Become a sponsor on GitHub](https://github.com/sponsors/wevm)
- Send us crypto
  - Mainnet: 0x4557B18E779944BFE9d78A672452331C186a9f48
  - Multichain: 0xd2135CfB216b74109775236E36d4b433F1DF507B
- [Become a support on Drip](https://www.drips.network/app/projects/github/wevm/wagmi)

If you use Wagmi at work, consider asking your company to sponsor Wagmi. This may not be easy, but **business sponsorships typically make a much larger impact on the sustainability of OSS projects** than individual donations, so you will help us much more if you succeed.

## Is Wagmi production ready?

Yes. Wagmi is very stable and is used in production by thousands of organizations, like [Stripe](https://stripe.com), [Shopify](https://shopify.com), [Coinbase](https://coinbase.com), [ENS](https://ens.domains), [Optimism](https://optimism.com).

## Is Wagmi strict with semver?

Yes, Wagmi is very strict with [semantic versioning](https://semver.org) and we will never introduce breaking changes to the runtime API in a minor version bump.

For exported types, we try our best to not introduce breaking changes in non-major verions, however, [TypeScript doesn't follow semver](https://www.learningtypescript.com/articles/why-typescript-doesnt-follow-strict-semantic-versioning) and often introduces breaking changes in minor releases that can cause Wagmi type issues. See the <a :href="`/${docsPath}/typescript#requirements`">TypeScript docs</a> for more information.

## How can I contribute to Wagmi?

The Wagmi team accepts all sorts of contributions. Check out the [Contributing](/dev/contributing) guide to get started. If you are interested in adding a new connector to Wagmi, check out the [Creating Connectors](/dev/creating-connectors) guide.

## Anything else you want to know?

Please create a new [GitHub Discussion thread](https://github.com/wevm/wagmi). You're also free to suggest changes to this or any other page on the site using the "Suggest changes to this page" button at the bottom of the page.

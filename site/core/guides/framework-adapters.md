# Framework Adapters

Folks often ask if they can use Wagmi with other frameworks, like Svelte, Solid.js, and more.

The short answer is — you already can! Wagmi Core is pure VanillaJS that you can use with any framework. For some, this answer is (understandably) unsatisfying as they want a tight integration between Wagmi Core and their favorite framework's reactivity system, e.g. what Wagmi is for React and Vue.

Someday, we would love to support additional frameworks, but unfortunately the core team doesn't have time to build and support them in a high-quality way at the moment. This could change in the future with additional [sponsors](https://github.com/sponsors/wevm), reshuffling of the roadmap, or if someone from the community wants to lead the effort.

In the meantime, here are some tips on how to create tighter bonds between Wagmi Core and other frameworks.

## Dependency Injection

Once you create a Wagmi Config, you'll need to make sure your framework has access to it inside your higher-level functions (e.g. hooks for React, composables for Vue). For example, Wagmi uses [React Context](https://react.dev/learn/passing-data-deeply-with-context) to inject the Config into React Hooks and update it if it changes. This makes it so your users don't need to pass a Config object every time they use a hook.

## Reactivity Layer

All frameworks approach reactivity in a different way. To hook into your favorite frameworks, reactivity system, it's often helpful to see what other popular libraries for your framework are doing.

The most important thing to hook up Wagmi Core with your framework is to make sure changes to the Wagmi Config are tracked. This enables behavior, like switching chains or connecting accounts, to propagate throughout your app and update state. Check out [`useAccount`](https://github.com/wevm/wagmi/blob/main/packages/react/src/hooks/useAccount.ts), [`useChainId`](https://github.com/wevm/wagmi/blob/main/packages/react/src/hooks/useChainId.ts), [`useClient`](https://github.com/wevm/wagmi/blob/main/packages/react/src/hooks/useClient.ts), and [`useConnectorClient`](https://github.com/wevm/wagmi/blob/main/packages/react/src/hooks/useConnectorClient.ts) — versions of these for your framework are important to get right as they power a lot of internals.

## TanStack Query

Wagmi uses [TanStack Query](https://tanstack.com/query) to enable caching, deduplication, persistence, and more in React and Vue applications. Normally, you would need to find a similar library for your framework, but the good news is TanStack Query supports other frameworks! (Svelte, Solid, and Angular at the time of writing.)

To get started with your framework, install and set up the related TanStack Query adapter. Next, import query keys/functions and mutation functions from the `'@wagmi/core/query'` entrypoint. You can plug these directly into your framework's TanStack Query adapter functions.

If you are building a library, you'll also want to make sure that you wire up generics correctly so type-inference and safety work correctly. The best way to make sure you are doing this correctly, is to see how we do this for React with Wagmi by checking out the [source code](https://github.com/wevm/wagmi/tree/main/packages/react/src/hooks).

## Testing

If you are building a library, you'll want to write tests. Wagmi uses [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) to test hooks. [Testing Library](https://testing-library.com) also supports other frameworks, like Svelte, Solid, and more. You can take a look at how the React tests work and do something similar for your code.

## Proxy Exports

Wagmi proxies exports directly from Wagmi Core and [Viem](https://viem.sh) to make importing easier. You'll likely want to imitate this behavior for your framework.

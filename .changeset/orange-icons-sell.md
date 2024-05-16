---
"@wagmi/connectors": major
---

**Breaking:** Updated default Coinbase SDK in `coinbaseWallet` Connector to v4.x. 

Added a `version` property (defaults to `'4'`) to the `coinbaseWallet` Connector to target a version of the Coinbase SDK:

```diff
coinbaseWallet({
+ version: '3' | '4',
})
```

If `headlessMode` property is set to `true`, then the Connector will target v3 of the Coinbase SDK.

The following properties are removed in v4 of the `coinbaseWallet` Connector:

- `chainId`
- `darkMode`
- `diagnosticLogger`
- `enableMobileDeepLink`
- `jsonRpcUrl`
- `linkApiUrl`
- `overrideIsCoinbaseBrowser`
- `overrideIsCoinbaseWallet`
- `overrideIsMetaMask`
- `reloadOnDisconnect`
- `uiConstructor`

Consumers can still use the above properties in v3 by passing `version: '3'` to the Connector. However, please note that v3 of the Coinbase SDK is deprecated and will be removed in a future release.


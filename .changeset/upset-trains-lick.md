---
"@wagmi/connectors": major
"wagmi": minor
"@wagmi/vue": patch
"@wagmi/solid": patch
---

Migrated MetaMask connector from `@metamask/sdk` to the new `@metamask/connect-evm` package.

## Breaking Changes

### New Peer Dependency

You must install `@metamask/connect-evm` as a peer dependency:

```bash
npm install @metamask/connect-evm
# or
pnpm add @metamask/connect-evm
```

### Parameter Changes

The connector parameters have been simplified and changed to align with the new SDK.

**Removed options:**

- `dappMetadata` - Use `dapp` instead
- `logging` - Use `debug` instead
- `headless` - Use `ui.headless` instead
- `checkInstallationImmediately`
- `checkInstallationOnAllCalls`
- `preferDesktop` - Use `ui.preferExtension` instead
- `openDeeplink` - Use `mobile.preferredOpenLink` instead
- `extensionOnly`
- `infuraAPIKey`
- `communicationLayerPreference`
- `communicationServerUrl`
- `enableAnalytics`
- `shouldShimWeb3`
- `storage`
- `timer`
- `i18nOptions`
- `modals`
- All communication layer options

**New options:**

- `dapp` - Dapp identification (`{ name: string, url?: string, iconUrl?: string }`)
- `debug` - Enable debug logging (boolean)
- `mobile` - Mobile-specific options:
  - `preferredOpenLink` - Custom function to open deeplinks (required for React Native)
  - `useDeeplink` - Use `metamask://` deeplink vs `https://metamask.app.link` universal link
- `ui` - UI configuration options:
  - `headless` - Disable built-in UI
  - `preferExtension` - Prefer browser extension over mobile
  - `showInstallModal` - Show install modal when MetaMask is not installed
- `transport` - Transport configuration:
  - `extensionId` - Extension ID for browser extension transport

**Preserved options:**

- `connectAndSign` - Shortcut to connect and sign a message
- `connectWith` - Connect with any RPC method

### Migration Example

**Before:**

```ts
import { metaMask } from 'wagmi/connectors'

metaMask({
  dappMetadata: {
    name: 'My DApp',
    url: 'https://mydapp.com',
    iconUrl: 'https://mydapp.com/icon.png',
  },
  logging: { sdk: true },
})
```

**After:**

```ts
import { metaMask } from 'wagmi/connectors'

metaMask({
  dapp: {
    name: 'My DApp',
    url: 'https://mydapp.com',
    iconUrl: 'https://mydapp.com/icon.png',
  },
  debug: true,
})
```

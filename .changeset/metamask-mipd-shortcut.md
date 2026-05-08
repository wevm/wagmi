---
"@wagmi/connectors": patch
---

`metaMask` connector now serves the read-only / probe methods (`getProvider`, `isAuthorized`, `getAccounts`, `getChainId`) from the EIP-6963 (MIPD) MetaMask provider when one has been announced and the SDK has not yet been loaded. This lets `reconnect()` probe extension-installed users on every page load without dynamically importing `@metamask/connect-evm` (and its transitive `@metamask/connect-multichain` chunk). User-initiated `connect()` still goes through the SDK as before, so one-tap flows (`connectAndSign`, `connectWith`), `switchChain` auto-fallback, MWP/mobile transports, and event wiring are unchanged. Once `connect()` runs, all subsequent calls go through the SDK — no provider-instance flip-flop. Falls through to the existing SDK path when MIPD is disabled, no MetaMask EIP-6963 announcement is present (e.g. mobile-web without the in-app browser), or in SSR.

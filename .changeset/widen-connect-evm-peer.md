---
"@wagmi/connectors": patch
---

Widened `@metamask/connect-evm` peer dependency range from `~1.0.0` to `^1.0.0` so consumers automatically pick up non-breaking 1.x releases (e.g. the bundle-size improvements in `@metamask/connect-evm@1.1.0+`, which transitively brings `@metamask/connect-multichain@0.13.0` with lazy-loaded MWP infrastructure) without needing a manual `overrides` / `resolutions` entry.

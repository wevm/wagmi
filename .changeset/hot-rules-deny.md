---
"@wagmi/connectors": patch
---

Added timeout to `getInfo` called in `safe` connector since [non-Safe App iFrames cause it to not resolve](https://github.com/safe-global/safe-apps-sdk/issues/263#issuecomment-1029835840).

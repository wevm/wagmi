---
"@wagmi/connectors": major
---

Updated `@metamask/connect-evm` to `1.0.0` and aligned return types. The `connectAndSign` and `connectWith` provider event payloads now emit `signature` and `result` keys (previously `signResponse` and `connectWithResponse`) to match the SDK's declared event shape.

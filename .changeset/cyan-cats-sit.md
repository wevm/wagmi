---
'wagmi': minor
---

**Breaking**: If a `chainId` is passed to `useContractWrite` or `useSendTransaction`, it will no longer attempt to switch chain before sending the transaction. Instead, it will throw an error if the user is on the wrong chain.

> Why? Eagerly prompting to switch chain in these actions created a long-running async task that that makes [iOS App Links](https://wagmi.sh/docs/prepare-hooks/intro#ios-app-link-constraints) vulnerable.

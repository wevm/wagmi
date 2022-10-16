---
'wagmi': patch
---

Added `isFetchedAfterMount` to the return value of hooks.

The `isFetchedAfterMount` will be truthy if the hook has fetched after the component has been mounted. This value can be utilized to not show the result if it has previously been cached.

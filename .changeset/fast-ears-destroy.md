---
'wagmi': patch
---

Fixed an issue where `useContractRead` would perform an unnecessary rerender if another hook had `watch` enabled.

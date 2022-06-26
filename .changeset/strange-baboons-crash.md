---
'wagmi': minor
---

**Breaking**: The "switch network" functionality has been moved out of `useNetwork` into a new `useSwitchNetwork` hook.

The `useNetwork` hook now accepts no configuration and only returns `chain` (renamed from `activeChain`) and `chains`.

```diff
import {
  useNetwork
+ useSwitchNetwork
} from 'wagmi'

const {
- activeChain
+ chain,
  chains,
- data,
- error,
- isError,
- isIdle,
- isLoading,
- isSuccess,
- pendingChainId,
- switchNetwork,
- switchNetworkAsync,
- status,
- reset,
-} = useNetwork({
- chainId: 69,
- onError(error) {},
- onMutate(args) {},
- onSettled(data, error) {},
- onSuccess(data) {}
-})
+} = useNetwork()

+const {
+ data,
+ error,
+ isError,
+ isIdle,
+ isLoading,
+ isSuccess,
+ pendingChainId,
+ switchNetwork,
+ switchNetworkAsync,
+ status,
+ reset,
+} = useSwitchNetwork({
+ chainId: 69,
+ onError(error) {},
+ onMutate(args) {},
+ onSettled(data, error) {},
+ onSuccess(data) {}
+})
```

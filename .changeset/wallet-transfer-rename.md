---
"@wagmi/core": patch
"wagmi": patch
---

`wagmi/tempo`: Renamed `Actions.wallet.send` to `Actions.wallet.transfer` and `Hooks.wallet.useSend` to `Hooks.wallet.useTransfer`. 

Also bumps the `accounts` peer dependency to `~0.12`.

```diff
- await Actions.wallet.send(config, {
-   to: '0x...',
-   token: '0x...',
-   value: '1.5',
- })
+ await Actions.wallet.transfer(config, {
+   amount: '1.5',
+   to: '0x...',
+   token: '0x...',
+ })
```

```diff
- const send = Hooks.wallet.useSend()
+ const transfer = Hooks.wallet.useTransfer()
```

---
'@wagmi/core': minor
'wagmi': minor
---

**Breaking**: Removed the following deprecated chains:

- `ropsten`
- `rinkeby`
- `kovan`
- `optimismKovan`
- `arbitrumRinkeby`

If you feel you still need to include one of these testnets in your application, you will have to define it manually:

```diff
-import { rinkeby } from 'wagmi'
+import { Chain } from 'wagmi'

+export const rinkeby: Chain = {
+ id: 4,
+ name: 'Rinkeby',
+ network: 'rinkeby',
+ nativeCurrency: { name: 'Rinkeby Ether', symbol: 'ETH', decimals: 18 },
+ rpcUrls: {
+   alchemy: 'https://eth-rinkeby.alchemyapi.io/v2',
+   default: 'https://rpc.ankr.com/eth_rinkeby',
+   infura: 'https://rinkeby.infura.io/v3',
+   public: 'https://rpc.ankr.com/eth_rinkeby',
+  },
+ blockExplorers: {
+   etherscan: 'https://rinkeby.etherscan.io',
+   default: 'https://rinkeby.etherscan.io',
+ },
+ ens: {
+   address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
+ },
+ multicall: {
+   address: '0xca11bde05977b3631167028862be2a173976ca11',
+   blockCreated: 10299530,
+ },
+ testnet: true,
}
```

You can reference these removed chains [here](https://github.com/wagmi-dev/wagmi/blob/389765f7d9af063ab0df07389a2bbfbc10a41060/packages/core/src/constants/chains.ts).

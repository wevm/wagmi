import "../chunk-MQXBDTVK.js";

// src/providers/public.ts
import { providers } from "ethers";
function publicProvider({
  priority,
  stallTimeout,
  weight
} = {}) {
  return function(chain) {
    if (!chain.rpcUrls.default)
      return null;
    return {
      chain,
      provider: () => {
        const provider = new providers.StaticJsonRpcProvider(
          chain.rpcUrls.default,
          {
            chainId: chain.id,
            name: chain.network
          }
        );
        return Object.assign(provider, { priority, stallTimeout, weight });
      }
    };
  };
}
export {
  publicProvider
};

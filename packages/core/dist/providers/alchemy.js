import "../chunk-MQXBDTVK.js";

// src/providers/alchemy.ts
import { providers } from "ethers";
function alchemyProvider({
  apiKey,
  priority,
  stallTimeout,
  weight
}) {
  return function(chain) {
    if (!chain.rpcUrls.alchemy)
      return null;
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.alchemy}/${apiKey}`
        }
      },
      provider: () => {
        const provider = new providers.AlchemyProvider(chain.id, apiKey);
        return Object.assign(provider, { priority, stallTimeout, weight });
      },
      webSocketProvider: () => new providers.AlchemyWebSocketProvider(chain.id, apiKey)
    };
  };
}
export {
  alchemyProvider
};

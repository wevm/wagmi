import "../chunk-MQXBDTVK.js";

// src/providers/infura.ts
import { providers } from "ethers";
function infuraProvider({
  apiKey,
  priority,
  stallTimeout,
  weight
}) {
  return function(chain) {
    if (!chain.rpcUrls.infura)
      return null;
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: `${chain.rpcUrls.infura}/${apiKey}`
        }
      },
      provider: () => {
        const provider = new providers.InfuraProvider(chain.id, apiKey);
        return Object.assign(provider, { priority, stallTimeout, weight });
      },
      webSocketProvider: () => new providers.InfuraWebSocketProvider(chain.id, apiKey)
    };
  };
}
export {
  infuraProvider
};

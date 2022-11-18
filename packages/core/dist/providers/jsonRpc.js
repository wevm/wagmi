import "../chunk-MQXBDTVK.js";

// src/providers/jsonRpc.ts
import { providers } from "ethers";
function jsonRpcProvider({
  priority,
  rpc,
  stallTimeout,
  static: static_ = true,
  weight
}) {
  return function(chain) {
    const rpcConfig = rpc(chain);
    if (!rpcConfig || rpcConfig.http === "")
      return null;
    return {
      chain: {
        ...chain,
        rpcUrls: {
          ...chain.rpcUrls,
          default: rpcConfig.http
        }
      },
      provider: () => {
        const RpcProvider = static_ ? providers.StaticJsonRpcProvider : providers.JsonRpcProvider;
        const provider = new RpcProvider(rpcConfig.http, {
          ensAddress: chain.ens?.address,
          chainId: chain.id,
          name: chain.network
        });
        return Object.assign(provider, { priority, stallTimeout, weight });
      },
      ...rpcConfig.webSocket && {
        webSocketProvider: () => new providers.WebSocketProvider(
          rpcConfig.webSocket,
          chain.id
        )
      }
    };
  };
}
export {
  jsonRpcProvider
};

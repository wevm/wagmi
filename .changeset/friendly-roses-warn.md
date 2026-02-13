import { createCDPEmbeddedWalletConnector } from "@coinbase/cdp-wagmi";
import { createConfig, http } from "wagmi";
import { baseSepolia, sepolia } from "viem/chains";

// Create the CDP connector
const cdpConnector = createCDPEmbeddedWalletConnector({
  cdpConfig: {
    projectId: "your-project-id",
  },
  providerConfig: {
    chains: [baseSepolia, sepolia],
    transports: {
      [baseSepolia.id]: http(),
      [sepolia.id]: http(),
    },
    announceProvider: true,
  },
});

// Use with wagmi config
const config = createConfig({
  chains: [baseSepolia, sepolia],
  connectors: [cdpConnector],
  transports: {
    [baseSepolia.id]: http(),
    [sepolia.id]: http(),
  },
});---
"@wagmi/connectors": patch
---

Add createCDPEmbeddedWalletConnector function

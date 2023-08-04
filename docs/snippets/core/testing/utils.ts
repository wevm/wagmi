export function getRpcUrls({ port }: { port: number }) {
  // The id of the current test worker.
  // This is used by the anvil proxy to route requests to the correct anvil instance.
  const pool = process.env.VITEST_POOL_ID!
  return {
    port,
    rpcUrls: {
      // These rpc urls are automatically used in the transports.
      default: {
        // Note how we append the worker id to the local rpc urls.
        http: [`http://127.0.0.1:${port}/${pool}`],
        webSocket: [`ws://127.0.0.1:${port}/${pool}`],
      },
      public: {
        // Note how we append the worker id to the local rpc urls.
        http: [`http://127.0.0.1:${port}/${pool}`],
        webSocket: [`ws://127.0.0.1:${port}/${pool}`],
      },
    },
  } as const
}

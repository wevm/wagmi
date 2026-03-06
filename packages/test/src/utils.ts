declare const VITEST_POOL_OFFSET: number | undefined

const projectOffset =
  typeof VITEST_POOL_OFFSET !== 'undefined' ? VITEST_POOL_OFFSET : 0
const poolId =
  (typeof process !== 'undefined' && Number(process.env.VITEST_POOL_ID ?? 1)) ||
  1
const pool = poolId + projectOffset

export function getRpcUrls({ port }: { port: number }) {
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

export async function wait(time: number) {
  return new Promise((res) => setTimeout(res, time))
}

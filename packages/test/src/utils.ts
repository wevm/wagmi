type VitestWorker = {
  ctx?: { projectName?: string | undefined } | undefined
  filepath?: string | undefined
}

export function getPoolId() {
  const worker = (globalThis as { __vitest_worker__?: VitestWorker })
    .__vitest_worker__
  const filepath = worker?.filepath
  if (filepath) {
    const identity = `${worker.ctx?.projectName ?? 'test'}:${filepath}`
    return hash(identity)
  }

  const poolId =
    typeof process !== 'undefined' ? process.env.VITEST_POOL_ID : undefined
  if (poolId) return hash(poolId)

  return hash(`${Date.now()}:${Math.random()}`)
}

export function getRpcUrls({ port }: { port: number }) {
  const pool = getPoolId()
  return {
    port,
    rpcUrls: {
      // Scope each test file to its own proxied backend instance.
      default: {
        http: [`http://127.0.0.1:${port}/${pool}`],
        webSocket: [`ws://127.0.0.1:${port}/${pool}`],
      },
      public: {
        http: [`http://127.0.0.1:${port}/${pool}`],
        webSocket: [`ws://127.0.0.1:${port}/${pool}`],
      },
    },
  } as const
}

export async function wait(time: number) {
  return new Promise((res) => setTimeout(res, time))
}

function hash(value: string) {
  let hash = 2_166_136_261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16_777_619)
  }
  return hash >>> 0 || 1
}

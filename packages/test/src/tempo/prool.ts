import { type Instance, Server } from 'prool'
import * as TestContainers from 'prool/testcontainers'

export const port = Number(import.meta.env.RPC_PORT ?? 4000)

export async function createServer() {
  const tag = import.meta.env.VITE_NODE_TAG ?? '1.0.0-rc.1'
  const args = {
    blockTime: '2ms',
    log: import.meta.env.VITE_NODE_LOG,
    port,
  } satisfies Instance.tempo.Parameters

  return Server.create({
    instance: TestContainers.Instance.tempo({
      ...args,
      image: `ghcr.io/tempoxyz/tempo:${tag}`,
    }),
    port,
  })
}

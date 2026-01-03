import { type Instance, Server } from 'prool'
import * as TestContainers from 'prool/testcontainers'

export default async function () {
  const port = 4000
  const args = {
    blockTime: '2ms',
    log: import.meta.env.VITE_NODE_LOG,
    port,
  } satisfies Instance.tempo.Parameters
  const tag = import.meta.env.VITE_NODE_TAG ?? '0.8.0'
  const server = Server.create({
    instance: TestContainers.Instance.tempo({
      ...args,
      image: `ghcr.io/tempoxyz/tempo:${tag}`,
    }),
    port,
  })
  await server.start()
  return async () => await server.stop()
}

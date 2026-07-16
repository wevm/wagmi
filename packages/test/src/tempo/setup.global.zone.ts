import * as TestContainers from 'prool/testcontainers'
import type { Address } from 'viem'
import type { TestProject } from 'vitest/node'

export default async function setup(project: TestProject) {
  const instance = TestContainers.Instance.tempoZone({
    image: `ghcr.io/tempoxyz/tempo-zone:${process.env.VITE_TEMPO_ZONE_TAG ?? 'latest'}`,
    l1: {
      image: `ghcr.io/tempoxyz/tempo:${process.env.VITE_TEMPO_TAG ?? 'latest'}`,
    },
    dev: {
      key: '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    },
    log: process.env.VITE_TEMPO_LOG,
    startupTimeout: 120_000,
  })
  const logs: string[] = []
  instance.on('message', (message) => logs.push(message))

  try {
    await instance.start()

    const output = logs.join('\n')
    const metadata = output.match(
      /Zone ID:\s*(\d+)[\s\S]*?Chain ID:\s*(\d+)[\s\S]*?ZoneFactory:\s*(0x[a-fA-F0-9]{40})[\s\S]*?Portal:\s*(0x[a-fA-F0-9]{40})/i,
    )
    const zoneId = metadata?.[1]
    const chainId = metadata?.[2]
    const factoryAddress = metadata?.[3]
    const portalAddress = metadata?.[4]

    // Prool 0.2.10 exposes the mapped auto-L1 and private RPC endpoints here.
    const endpoints = instance._internal
    const l1 = endpoints.l1
    const privateRpc = endpoints.privateRpc
    if (
      !zoneId ||
      !chainId ||
      !factoryAddress ||
      !portalAddress ||
      !l1 ||
      !privateRpc
    )
      throw new Error(`Tempo Zone startup metadata missing.\n${output}`)

    project.provide('tempoZone', {
      chainId: Number(chainId),
      factoryAddress: factoryAddress as Address,
      l1RpcUrl: `ws://${l1.host}:${l1.wsPort}`,
      portalAddress: portalAddress as Address,
      privateRpcUrl: `http://${privateRpc.host}:${privateRpc.port}`,
      publicRpcUrl: `http://${instance.host}:${instance.port}`,
      zoneId: Number(zoneId),
    })
  } catch (error) {
    await instance.stop()
    throw error
  }

  return () => instance.stop()
}

import * as os from 'node:os'
import * as path from 'node:path'
import { Instance, Server } from 'prool'
import {
  GenericContainer,
  PullPolicy,
  type StartedTestContainer,
  Wait,
} from 'testcontainers'

const isMacOS = os.platform() === 'darwin'

function toFlagCase(str: string, separator = '-') {
  const keys = []
  for (const part of str.split('.')) {
    if (!part) continue
    keys.push(
      part
        .replace(/\s+/g, separator)
        .replace(/([a-z])([A-Z])/g, `$1${separator}$2`)
        .toLowerCase(),
    )
  }
  return `--${keys.join('.')}`
}

function toArgs(
  obj: Record<string, unknown>,
  options: { arraySeparator?: string | null } = {},
): string[] {
  const { arraySeparator = ',' } = options
  return Object.entries(obj).flatMap(([key, value]) => {
    if (value === undefined) return []

    if (Array.isArray(value)) {
      if (value[0] === true)
        return [toFlagCase(key), ...toArgs({ [key]: value[1] }, options)]
      const arrayValue =
        arraySeparator === null ? value : value.join(arraySeparator)
      return [toFlagCase(key), arrayValue].flat()
    }

    if (typeof value === 'object' && value !== null) {
      return Object.entries(value).flatMap(([subKey, subValue]) => {
        if (subValue === undefined) return []
        const flag = toFlagCase(`${key}.${subKey}`)
        return toArgs({ [flag.slice(2)]: subValue }, options)
      })
    }

    const flag = toFlagCase(key)
    if (value === false) return [flag, 'false']
    if (value === true) return [flag]
    const stringified = value?.toString() ?? ''
    if (stringified === '') return [flag]
    return [flag, stringified]
  })
}

function buildCommand(port: number, blockTime: string): string[] {
  const datadir = path.join(os.tmpdir(), '.prool', `tempo.${port}`)
  const params: Record<string, unknown> = {
    authrpc: { port: port + 30 },
    datadir,
    dev: [true, { blockTime }],
    engine: { disablePrecompileCache: true, legacyStateRoot: true },
    faucet: {
      address: [
        '0x20c0000000000000000000000000000000000000',
        '0x20c0000000000000000000000000000000000001',
        '0x20c0000000000000000000000000000000000002',
        '0x20c0000000000000000000000000000000000003',
      ],
      amount: '1000000000000',
      enabled: true,
      privateKey:
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
    },
    http: { addr: '0.0.0.0', api: 'all', corsdomain: '*', port },
    port: port + 10,
    ws: { port: port + 20 },
  }
  return ['node', ...toArgs(params, { arraySeparator: null })]
}

const tempoInstance = Instance.define(
  (parameters?: {
    image: string
    port: number
    blockTime: string
    log?: string | boolean
  }) => {
    const {
      image,
      port,
      blockTime,
      log: log_,
    } = parameters ?? {
      image: 'ghcr.io/tempoxyz/tempo:latest',
      port: 8545,
      blockTime: '50ms',
    }

    const log = (() => {
      try {
        return JSON.parse(log_ as string)
      } catch {
        return log_
      }
    })()
    const RUST_LOG = log && typeof log !== 'boolean' ? log : ''

    let container: StartedTestContainer | undefined

    return {
      _internal: {},
      host: 'localhost',
      name: 'tempo',
      port,
      async start({ port: startPort = port }, { emitter }) {
        let resolve: () => void
        let reject: (reason?: unknown) => void
        const promise = new Promise<void>((res, rej) => {
          resolve = res
          reject = rej
        })

        const c = new GenericContainer(image)
          .withPullPolicy(PullPolicy.defaultPolicy())
          .withName(`tempo.${crypto.randomUUID()}`)
          .withEnvironment({ RUST_LOG })
          .withCommand(buildCommand(startPort, blockTime))
          .withWaitStrategy(
            Wait.forLogMessage(
              /Received (block|new payload) from consensus engine/,
            ),
          )
          .withLogConsumer((stream) => {
            stream.on('data', (data) => {
              const message = data.toString()
              emitter.emit('message', message)
              emitter.emit('stdout', message)
              if (log) console.log(message)
              if (message.includes('shutting down'))
                reject!(new Error(`Failed to start: ${message}`))
            })
            stream.on('error', (error) => {
              // biome-ignore lint/suspicious/noConsole: test setup logging
              if (log) console.error(error.message)
              emitter.emit('message', error.message)
              emitter.emit('stderr', error.message)
              reject!(new Error(`Failed to start: ${error.message}`))
            })
          })
          .withStartupTimeout(30_000)

        if (isMacOS) {
          c.withExposedPorts({ container: startPort, host: startPort })
        } else {
          c.withNetworkMode('host')
          c.withExtraHosts([
            { host: 'host.docker.internal', ipAddress: 'host-gateway' },
            { host: 'localhost', ipAddress: 'host-gateway' },
          ])
        }

        c.start()
          .then((started) => {
            container = started
            resolve!()
          })
          .catch(reject!)

        return promise
      },
      async stop() {
        if (!container) return
        await container.stop()
        container = undefined
      },
    }
  },
)

export default async function () {
  const port = 4000
  const tag = import.meta.env.VITE_NODE_TAG ?? 'latest'
  const server = Server.create({
    instance: tempoInstance({
      image: `ghcr.io/tempoxyz/tempo:${tag}`,
      port,
      blockTime: '2ms',
      log: import.meta.env.VITE_NODE_LOG,
    }),
    port,
  })
  await server.start()
  return async () => await server.stop()
}

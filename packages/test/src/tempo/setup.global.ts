import { createServer } from 'node:http'
import * as os from 'node:os'
import * as path from 'node:path'
import { Instance, Server } from 'prool'
import {
  GenericContainer,
  PullPolicy,
  type StartedTestContainer,
  Wait,
} from 'testcontainers'
import {
  concatHex,
  decodeFunctionData,
  encodeAbiParameters,
  keccak256,
  recoverAddress,
} from 'viem'
import { Abis, Addresses, Transaction as TempoTransaction } from 'viem/tempo'
import {
  zoneDepositStatusRpcReturnValue,
  zoneInfoRpcReturnValue,
  zoneRpcPort,
  zoneTokens,
} from './zone.js'

const isMacOS = os.platform() === 'darwin'
const zoneAuthorizationMagicBytes =
  '0x54656d706f5a6f6e655250430000000000000000000000000000000000000000'
const zoneAuthorizationFieldsSize = 29
const zeroAddress = '0x0000000000000000000000000000000000000000'
const zeroBloom = `0x${'0'.repeat(512)}`

function toHex(value: bigint | number): `0x${string}` {
  return `0x${BigInt(value).toString(16)}`
}

async function getAuthorizationTokenInfo(token: `0x${string}`) {
  const fieldsStart = token.length - zoneAuthorizationFieldsSize * 2
  const fields = `0x${token.slice(fieldsStart)}` as `0x${string}`
  const signature = `0x${token.slice(2, fieldsStart)}` as `0x${string}`
  const expiresAt = BigInt(`0x${token.slice(token.length - 16)}`)
  const hash = keccak256(concatHex([zoneAuthorizationMagicBytes, fields]))
  const account = await recoverAddress({ hash, signature })

  return {
    account,
    expiresAt,
  }
}

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

function createZoneRpcServer(port: number) {
  const allowances = new Map<string, bigint>()
  const receipts = new Map<string, Record<string, unknown>>()
  const nonces = new Map<string, bigint>()
  let latestBlockNumber = 1n

  const allowanceKey = (token: string, owner: string, spender: string) =>
    `${token.toLowerCase()}:${owner.toLowerCase()}:${spender.toLowerCase()}`

  const createReceipt = ({
    from,
    to,
    transactionHash,
    type = '0x76',
  }: {
    from: string
    to: string | null
    transactionHash: `0x${string}`
    type?: `0x${string}`
  }) => ({
    blockHash: keccak256(concatHex([transactionHash, transactionHash])),
    blockNumber: toHex(latestBlockNumber),
    contractAddress: null,
    cumulativeGasUsed: toHex(500_000n),
    effectiveGasPrice: toHex(2n),
    from,
    gasUsed: toHex(250_000n),
    logs: [],
    logsBloom: zeroBloom,
    status: '0x1',
    to,
    transactionHash,
    transactionIndex: '0x0',
    type,
  })

  const handleSerializedTransaction = (serialized: `0x${string}`) => {
    const transaction = TempoTransaction.deserialize(serialized)
    if (!('calls' in transaction))
      throw new Error('Expected Tempo transaction.')

    const tempoTransaction =
      transaction as TempoTransaction.TransactionSerializableTempo & {
        from?: string | undefined
      }

    const from =
      'from' in tempoTransaction && tempoTransaction.from
        ? tempoTransaction.from
        : zeroAddress
    const calls = tempoTransaction.calls ?? []

    for (const call of calls) {
      if (!call.to || !call.data) continue

      if (
        zoneTokens.some(
          (token) => token.toLowerCase() === call.to?.toLowerCase(),
        )
      ) {
        const decoded = decodeFunctionData({ abi: Abis.tip20, data: call.data })
        if (decoded.functionName === 'approve') {
          const [spender, amount] = decoded.args as readonly [string, bigint]
          allowances.set(allowanceKey(call.to, from, spender), amount)
        }
      }
    }

    const transactionHash = keccak256(serialized)
    nonces.set(from.toLowerCase(), (nonces.get(from.toLowerCase()) ?? 0n) + 1n)
    latestBlockNumber += 1n

    const receipt = createReceipt({
      from,
      to: calls.at(-1)?.to ?? null,
      transactionHash,
    })
    receipts.set(transactionHash, receipt)

    return { receipt, transactionHash }
  }

  const latestBlock = () => ({
    baseFeePerGas: toHex(1n),
    difficulty: '0x0',
    extraData: '0x',
    gasLimit: toHex(30_000_000n),
    gasUsed: '0x0',
    hash: keccak256(toHex(latestBlockNumber)),
    logsBloom: zeroBloom,
    miner: zeroAddress,
    mixHash: `0x${'0'.repeat(64)}`,
    nonce: '0x0000000000000000',
    number: toHex(latestBlockNumber),
    parentHash: `0x${'0'.repeat(64)}`,
    receiptsRoot: `0x${'0'.repeat(64)}`,
    sha3Uncles: `0x${'0'.repeat(64)}`,
    size: '0x0',
    stateRoot: `0x${'0'.repeat(64)}`,
    timestamp: toHex(latestBlockNumber),
    totalDifficulty: '0x0',
    transactions: [],
    transactionsRoot: `0x${'0'.repeat(64)}`,
    uncles: [],
  })

  const server = createServer(async (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, X-Authorization-Token',
    )
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST')

    if (request.method === 'OPTIONS') {
      response.writeHead(204)
      response.end()
      return
    }

    let body = ''
    for await (const chunk of request) body += chunk

    const payload = body ? JSON.parse(body) : {}
    const token = Array.isArray(request.headers['x-authorization-token'])
      ? request.headers['x-authorization-token'][0]
      : request.headers['x-authorization-token']
    const send = (result: unknown) => {
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(result))
    }
    const sendMissingAuth = () => {
      send({
        error: { code: -32001, message: 'missing auth token' },
        id: payload.id,
        jsonrpc: '2.0',
      })
    }
    const authorizationTokenInfo = token
      ? await getAuthorizationTokenInfo(token as `0x${string}`)
      : null

    switch (payload.method) {
      case 'eth_blockNumber':
        send({ id: payload.id, jsonrpc: '2.0', result: '0x1' })
        return
      case 'eth_chainId':
        send({
          id: payload.id,
          jsonrpc: '2.0',
          result: zoneInfoRpcReturnValue.chainId,
        })
        return
      case 'eth_call': {
        const call = payload.params?.[0]
        if (call?.to?.toLowerCase() === Addresses.zoneOutbox.toLowerCase()) {
          const data = call.data as `0x${string}` | undefined
          const gas = data ? BigInt(`0x${data.slice(-64)}`) : 0n
          const fee = gas + 1_000n

          send({
            id: payload.id,
            jsonrpc: '2.0',
            result: `0x${fee.toString(16).padStart(64, '0')}`,
          })
          return
        }

        if (
          zoneTokens.some(
            (token) => token.toLowerCase() === call?.to?.toLowerCase(),
          )
        ) {
          const decoded = decodeFunctionData({
            abi: Abis.tip20,
            data: call.data as `0x${string}`,
          })
          if (decoded.functionName === 'allowance') {
            const [owner, spender] = decoded.args as readonly [string, string]
            const allowance =
              allowances.get(allowanceKey(call.to, owner, spender)) ?? 0n

            send({
              id: payload.id,
              jsonrpc: '2.0',
              result: encodeAbiParameters([{ type: 'uint256' }], [allowance]),
            })
            return
          }
        }

        break
      }
      case 'eth_estimateGas':
        send({ id: payload.id, jsonrpc: '2.0', result: toHex(500_000n) })
        return
      case 'eth_gasPrice':
        send({ id: payload.id, jsonrpc: '2.0', result: toHex(2n) })
        return
      case 'eth_getBlockByNumber':
        send({ id: payload.id, jsonrpc: '2.0', result: latestBlock() })
        return
      case 'eth_getTransactionCount': {
        const address = payload.params?.[0] as string | undefined
        const nonce = address ? (nonces.get(address.toLowerCase()) ?? 0n) : 0n
        send({ id: payload.id, jsonrpc: '2.0', result: toHex(nonce) })
        return
      }
      case 'eth_getTransactionReceipt': {
        const hash = payload.params?.[0] as `0x${string}` | undefined
        send({
          id: payload.id,
          jsonrpc: '2.0',
          result: (hash && receipts.get(hash)) ?? null,
        })
        return
      }
      case 'eth_maxPriorityFeePerGas':
        send({ id: payload.id, jsonrpc: '2.0', result: toHex(1n) })
        return
      case 'eth_sendRawTransaction': {
        const serialized = payload.params?.[0] as `0x${string}` | undefined
        if (!serialized) break
        const { transactionHash } = handleSerializedTransaction(serialized)
        send({ id: payload.id, jsonrpc: '2.0', result: transactionHash })
        return
      }
      case 'eth_sendRawTransactionSync': {
        const serialized = payload.params?.[0] as `0x${string}` | undefined
        if (!serialized) break
        const { receipt } = handleSerializedTransaction(serialized)
        send({ id: payload.id, jsonrpc: '2.0', result: receipt })
        return
      }
      case 'zone_getAuthorizationTokenInfo': {
        if (!authorizationTokenInfo) {
          sendMissingAuth()
          return
        }

        send({
          id: payload.id,
          jsonrpc: '2.0',
          result: {
            account: authorizationTokenInfo.account,
            expiresAt: `0x${authorizationTokenInfo.expiresAt.toString(16)}`,
          },
        })
        return
      }
      case 'zone_getDepositStatus':
        if (!authorizationTokenInfo) {
          sendMissingAuth()
          return
        }

        send({
          id: payload.id,
          jsonrpc: '2.0',
          result: {
            ...zoneDepositStatusRpcReturnValue,
            tempoBlockNumber:
              payload.params?.[0] ??
              zoneDepositStatusRpcReturnValue.tempoBlockNumber,
          },
        })
        return
      case 'zone_getZoneInfo':
        if (!authorizationTokenInfo) {
          sendMissingAuth()
          return
        }

        send({
          id: payload.id,
          jsonrpc: '2.0',
          result: zoneInfoRpcReturnValue,
        })
        return
      default:
        send({
          error: {
            code: -32601,
            message: `Method ${payload.method} not found`,
          },
          id: payload.id,
          jsonrpc: '2.0',
        })
    }
  })

  return {
    start() {
      return new Promise<void>((resolve, reject) => {
        server.once('error', reject)
        server.listen(port, () => {
          server.off('error', reject)
          resolve()
        })
      })
    },
    stop() {
      return new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) reject(error)
          else resolve()
        })
      })
    },
  }
}

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
  const zoneRpcServer = createZoneRpcServer(zoneRpcPort)
  await Promise.all([server.start(), zoneRpcServer.start()])
  return async () => {
    await Promise.all([zoneRpcServer.stop(), server.stop()])
  }
}

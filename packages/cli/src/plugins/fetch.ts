import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'pathe'

import type { Abi } from 'abitype'
import type { ContractConfig, Plugin } from '../config.js'
import type { Compute, RequiredBy } from '../types.js'

export type FetchConfig = {
  /**
   * Duration in milliseconds to cache ABIs from request.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number | undefined
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Compute<Omit<ContractConfig, 'abi'>>[]
  /**
   * Function for creating a cache key for contract.
   */
  getCacheKey?:
    | ((config: { contract: Compute<Omit<ContractConfig, 'abi'>> }) => string)
    | undefined
  /**
   * Name of source.
   */
  name?: ContractConfig['name'] | undefined
  /**
   * Function for parsing ABI from fetch response.
   *
   * @default ({ response }) => response.json()
   */
  parse?:
    | ((config: {
        response: Response
      }) => ContractConfig['abi'] | Promise<ContractConfig['abi']>)
    | undefined
  /**
   * Function for returning a request to fetch ABI from.
   */
  request: (config: {
    address?: ContractConfig['address'] | undefined
  }) =>
    | { url: RequestInfo; init?: RequestInit | undefined }
    | Promise<{ url: RequestInfo; init?: RequestInit | undefined }>
  /**
   * Duration in milliseconds before request times out.
   *
   * @default 5_000 // 5s in ms
   */
  timeoutDuration?: number | undefined
}

type FetchResult = Compute<RequiredBy<Plugin, 'contracts'>>

/** Fetches and parses contract ABIs from network resource with `fetch`. */
export function fetch(config: FetchConfig): FetchResult {
  const {
    cacheDuration = 1_800_000,
    contracts: contractConfigs,
    getCacheKey = ({ contract }) => JSON.stringify(contract),
    name = 'Fetch',
    parse = ({ response }) => response.json(),
    request,
    timeoutDuration = 5_000,
  } = config

  return {
    async contracts() {
      const cacheDir = join(homedir(), '.wagmi-cli/plugins/fetch/cache')
      await mkdir(cacheDir, { recursive: true })

      const timestamp = Date.now() + cacheDuration
      const contracts = []
      for (const contract of contractConfigs) {
        const cacheKey = getCacheKey({ contract })
        const cacheFilePath = join(cacheDir, `${cacheKey}.json`)
        const cachedFile = JSON.parse(
          await readFile(cacheFilePath, 'utf8').catch(() => 'null'),
        )

        let abi: Abi | undefined
        if (cachedFile?.timestamp > Date.now()) abi = cachedFile.abi
        else {
          try {
            const controller = new globalThis.AbortController()
            const timeout = setTimeout(
              () => controller.abort(),
              timeoutDuration,
            )

            const { url, init } = await request(contract)
            const response = await globalThis.fetch(url, {
              ...init,
              signal: controller.signal,
            })
            clearTimeout(timeout)

            abi = await parse({ response })
            await writeFile(
              cacheFilePath,
              `${JSON.stringify({ abi, timestamp }, undefined, 2)}\n`,
            )
          } catch (error) {
            try {
              // Attempt to read from cache if fetch fails.
              abi = JSON.parse(await readFile(cacheFilePath, 'utf8')).abi
            } catch {}
            if (!abi) throw error
          }
        }

        if (!abi) throw Error('Failed to fetch ABI for contract.')
        contracts.push({ abi, address: contract.address, name: contract.name })
      }
      return contracts
    },
    name,
  }
}

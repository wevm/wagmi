import { default as fse } from 'fs-extra'
import type { RequestInfo, RequestInit, Response } from 'node-fetch'
import { default as fetch_ } from 'node-fetch'
import { join } from 'pathe'

import type { ContractConfig, Plugin } from '../config'
import type { RequiredBy } from '../types'
import { homedir } from 'os'

export type FetchConfig = {
  /**
   * Duration in milliseconds to cache ABIs from request.
   *
   * @default 1_800_000 // 30m in ms
   */
  cacheDuration?: number
  /**
   * Contracts to fetch ABIs for.
   */
  contracts: Omit<ContractConfig, 'abi'>[]
  /**
   * Function for creating a cache key for contract.
   */
  getCacheKey?(config: { contract: Omit<ContractConfig, 'abi'> }): string
  /**
   * Name of source.
   */
  name?: ContractConfig['name']
  /**
   * Function for parsing ABI from fetch response.
   *
   * @default ({ response }) => response.json()
   */
  parse?({
    response,
  }: {
    response: Response
  }): Promise<ContractConfig['abi']> | ContractConfig['abi']
  /**
   * Function for returning a request to fetch ABI from.
   */
  request(config: {
    address?: ContractConfig['address']
  }):
    | Promise<{ url: RequestInfo; init?: RequestInit }>
    | { url: RequestInfo; init?: RequestInit }
  /**
   * Duration in milliseconds before request times out.
   *
   * @default 5_000 // 5s in ms
   */
  timeoutDuration?: number
}

type FetchResult = RequiredBy<Plugin, 'contracts'>

/**
 * Fetches and parses contract ABIs from network resource with `fetch`.
 */
export function fetch({
  cacheDuration = 1_800_000,
  contracts: contractConfigs,
  getCacheKey = ({ contract }) => JSON.stringify(contract),
  name = 'Fetch',
  parse = ({ response }) => response.json() as Promise<ContractConfig['abi']>,
  request,
  timeoutDuration = 5_000,
}: FetchConfig): FetchResult {
  return {
    async contracts() {
      const cacheDir = join(homedir(), '.wagmi-cli/plugins/fetch/cache')
      await fse.ensureDir(cacheDir)

      const timestamp = Date.now() + cacheDuration
      const contracts = []
      for (const contract of contractConfigs) {
        const cacheKey = getCacheKey({ contract })
        const cacheFilePath = join(cacheDir, `${cacheKey}.json`)
        const cachedFile = await fse.readJSON(cacheFilePath).catch(() => null)
        let abi
        if (cachedFile?.timestamp > Date.now()) abi = cachedFile.abi
        else {
          const AbortController =
            globalThis.AbortController ||
            (await import('abort-controller')).default
          const controller = new AbortController()
          const timeout = setTimeout(() => controller.abort(), timeoutDuration)
          try {
            const { url, init } = await request(contract)
            // TODO: Replace `node-fetch` with native `fetch` when Node 18 is more widely used.
            const response = await fetch_(url, {
              ...init,
              // TODO: Use `AbortSignal.timeout` when Node 18 is more widely used.
              signal: controller.signal,
            })
            abi = await parse({ response })
            await fse.writeJSON(cacheFilePath, { abi, timestamp })
          } catch (error) {
            try {
              // Attempt to read from cache if fetch fails.
              abi = (await fse.readJSON(cacheFilePath)).abi
              // eslint-disable-next-line no-empty
            } catch {}
            if (!abi) throw error
          } finally {
            clearTimeout(timeout)
          }
        }

        contracts.push({ abi, address: contract.address, name: contract.name })
      }
      return contracts
    },
    name,
  }
}

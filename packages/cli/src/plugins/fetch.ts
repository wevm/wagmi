// TODO: Remove `node-fetch` dependency when Node 18 is used more and `fetch` is stable.
import { default as fse } from 'fs-extra'
import type { RequestInfo, RequestInit, Response } from 'node-fetch'
import { default as nodeFetch } from 'node-fetch'

import type { ContractConfig, Plugin } from '../config'
import type { RequiredBy } from '../types'
import { homedir } from 'os'

type Request = { url: RequestInfo; init?: RequestInit }

const cacheDir = `${homedir}/.wagmi-cli/plugins/fetch/cache`

export type FetchConfig = {
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
  }): Promise<Request> | Request
}

type FetchResult = RequiredBy<Plugin, 'contracts'>

/**
 * Fetches and parses contract ABIs from network resource with `fetch`.
 */
export function fetch({
  contracts: contractConfigs,
  getCacheKey = ({ contract }) =>
    typeof contract.address === 'string'
      ? contract.address
      : JSON.stringify(contract.address),
  name = 'Fetch',
  parse = ({ response }) => response.json() as Promise<ContractConfig['abi']>,
  request,
}: FetchConfig): FetchResult {
  return {
    async contracts() {
      const contracts = []
      for (const contract of contractConfigs) {
        const cacheKey = getCacheKey({ contract })
        const { url, init } = await request(contract)

        const AbortController = globalThis.AbortController
        const controller = new AbortController()
        const timeout = setTimeout(() => {
          // TODO: Config option and message for timeout
          controller.abort()
        }, 2_000)

        let abi
        try {
          const response = await nodeFetch(url, {
            ...init,
            signal: controller.signal,
          })
          abi = await parse({ response })
        } catch (error) {
          try {
            // Attempt to read from cache if fetch fails.
            abi = await fse.readJSON(`${cacheDir}/${cacheKey}.json`)
            // eslint-disable-next-line no-empty
          } catch {}
          if (!abi) throw error
        } finally {
          clearTimeout(timeout)
        }

        contracts.push({ abi, address: contract.address, name: contract.name })
        await fse.writeJSON(`${cacheDir}/${cacheKey}.json`, abi)
      }
      return contracts
    },
    name,
    async validate() {
      await fse.ensureDir(cacheDir)
    },
  }
}

import { findConfig, resolveConfig } from '../utils'

export type Generate = {
  config?: string
  root?: string
}

export async function generate({ config: config_, root }: Generate) {
  const configPath = await findConfig({ config: config_, root })
  if (!configPath) throw new Error('No config found')

  const config = await resolveConfig({ configPath })
  if (!config.contracts?.length) throw new Error('No contracts provided')

  for (const contract of config.contracts) {
    console.log(`Fetching contract interface for ${contract.name}`)
    try {
      // const contractInterface =
      typeof contract.source === 'function'
        ? await contract.source({
            address: contract.address,
            chainId: contract.chainId,
          })
        : contract.source
    } catch (error) {
      console.error(error)
    }
  }

  // 1. Fetch interfaces
  // - Store in object
  // - Handle rate limiting
  // - Error handing (e.g. contract not found, verified, etc.)
  // 2. Generate types
  // - NatSpec comments https://docs.soliditylang.org/en/latest/natspec-format.html
  // 2a. Generate hooks
  // - React plugin
  // 4. Write contract objects to entrypoint
  // - detect package to use (e.g. `wagmi/generated` or `@wagmi/core/generated`)
  // - use prettier?
}

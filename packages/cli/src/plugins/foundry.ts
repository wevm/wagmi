import { execSync, spawn, spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import dedent from 'dedent'
import { fdir } from 'fdir'
import { basename, extname, join, resolve } from 'pathe'
import pc from 'picocolors'
import { z } from 'zod'

import type { ContractConfig, Plugin } from '../config.js'
import * as logger from '../logger.js'
import type { Compute, RequiredBy } from '../types.js'

export const foundryDefaultExcludes = [
  'Base.sol/**',
  'Common.sol/**',
  'Components.sol/**',
  'IERC165.sol/**',
  'IERC20.sol/**',
  'IERC721.sol/**',
  'IMulticall2.sol/**',
  'MockERC20.sol/**',
  'MockERC721.sol/**',
  'Script.sol/**',
  'StdAssertions.sol/**',
  'StdChains.sol/**',
  'StdCheats.sol/**',
  'StdError.sol/**',
  'StdInvariant.sol/**',
  'StdJson.sol/**',
  'StdMath.sol/**',
  'StdStorage.sol/**',
  'StdStyle.sol/**',
  'StdToml.sol/**',
  'StdUtils.sol/**',
  'Test.sol/**',
  'Vm.sol/**',
  'build-info/**',
  'console.sol/**',
  'console2.sol/**',
  'safeconsole.sol/**',
  '**.s.sol/*.json',
  '**.t.sol/*.json',
]

export type FoundryConfig = {
  /**
   * Project's artifacts directory.
   *
   * Same as your project's `--out` (`-o`) option.
   *
   * @default foundry.config#out | 'out'
   */
  artifacts?: string | undefined
  /**
   * Set contracts in `run-latest.json` files in the `broadcast/` directory as deployments.
   *
   * @dev broadcast deployments can be overridden by including the contract in the deployments mapping.
   *
   * @default false
   */
  includeBroadcasts?: boolean | undefined
  /**
   * Mapping of addresses to attach to artifacts.
   *
   * A key can either resolve to an address (or `{ [chainId]: address }` map) for the
   * artifact of the same name, or to `{ artifact, address }` to generate an additional,
   * separately named contract that shares another artifact's ABI. The latter is useful
   * when multiple deployments (e.g. different ERC20 tokens) share one ABI.
   *
   * @example
   * {
   *   // `ERC20.json` artifact's own address
   *   ERC20: '0x314159265dd8dbb310642f98f50c066173c1259b',
   *   // additional named contracts sharing the `ERC20.json` artifact's ABI
   *   DAI: { artifact: 'ERC20', address: '0x6b175474e89094c44da98b954eedeac495271d0' },
   *   WETH: { artifact: 'ERC20', address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' },
   * }
   */
  deployments?: { [key: string]: FoundryDeployment } | undefined
  /** Artifact files to exclude. */
  exclude?: string[] | undefined
  /** [Forge](https://book.getfoundry.sh/forge) configuration */
  forge?:
    | {
        /**
         * Remove build artifacts and cache directories on start up.
         *
         * @default false
         */
        clean?: boolean | undefined
        /**
         * Build Foundry project before fetching artifacts.
         *
         * @default true
         */
        build?: boolean | undefined
        /**
         * Path to `forge` executable command
         *
         * @default "forge"
         */
        path?: string | undefined
        /**
         * Rebuild every time a watched file or directory is changed.
         *
         * @default true
         */
        rebuild?: boolean | undefined
      }
    | undefined
  /** Artifact files to include. */
  include?: string[] | undefined
  /** Optional prefix to prepend to artifact names. */
  namePrefix?: string | undefined
  /** Path to foundry project. */
  project?: string | undefined
}

type FoundryResult = Compute<
  RequiredBy<Plugin, 'contracts' | 'validate' | 'watch'>
>

/** A named deployment that reuses another artifact's ABI (see {@link FoundryConfig.deployments}). */
export type FoundryAliasDeployment = {
  /** Address (or `{ [chainId]: address }` map) for this named deployment. */
  address: ContractConfig['address']
  /** Name of the artifact (e.g. `'ERC20'`) whose ABI this deployment reuses. */
  artifact: string
}

type FoundryDeployment = ContractConfig['address'] | FoundryAliasDeployment

function isAliasDeployment(
  deployment: FoundryDeployment | undefined,
): deployment is FoundryAliasDeployment {
  return (
    typeof deployment === 'object' &&
    deployment !== null &&
    'artifact' in deployment
  )
}

function resolveAddress(
  deployment: FoundryDeployment | undefined,
): ContractConfig['address'] {
  if (isAliasDeployment(deployment)) return deployment.address
  return deployment
}

const FoundryConfigSchema = z.object({
  out: z.string().default('out'),
  src: z.string().default('src'),
})

/** Resolves ABIs from [Foundry](https://github.com/foundry-rs/foundry) project. */
export function foundry(config: FoundryConfig = {}): FoundryResult {
  const {
    artifacts,
    includeBroadcasts = false,
    deployments = {},
    exclude = foundryDefaultExcludes,
    forge: {
      clean = false,
      build = true,
      path: forgeExecutable = 'forge',
      rebuild = true,
    } = {},
    include = ['*.json'],
    namePrefix = '',
  } = config

  let allDeployments: { [key: string]: ContractConfig['address'] } = deployments

  function getContractName(artifactPath: string, usePrefix = true) {
    const filename = basename(artifactPath)
    const extension = extname(artifactPath)
    return `${usePrefix ? namePrefix : ''}${filename.replace(extension, '')}`
  }

  async function getContract(
    artifactPath: string,
    contractDeployments: {
      [key: string]: FoundryDeployment
    } = allDeployments,
  ) {
    const artifact = await JSON.parse(await readFile(artifactPath, 'utf8'))
    return {
      abi: artifact.abi,
      address: resolveAddress(
        contractDeployments[getContractName(artifactPath, false)],
      ),
      name: getContractName(artifactPath),
    }
  }

  /**
   * Additional contracts declared via `deployments` that alias another artifact's ABI
   * (`{ artifact, address }`), scoped to a single artifact's name.
   */
  function getAliasContracts(artifactName: string, abi: unknown) {
    const aliasContracts: ContractConfig[] = []
    for (const [name, deployment] of Object.entries(allDeployments)) {
      if (!isAliasDeployment(deployment)) continue
      if (deployment.artifact !== artifactName) continue
      aliasContracts.push({
        abi: abi as ContractConfig['abi'],
        address: deployment.address,
        name: `${namePrefix}${name}`,
      })
    }
    return aliasContracts
  }

  function getArtifactPaths(artifactsDirectory: string) {
    const crawler = new fdir().withBasePath().globWithOptions(
      include.map((x) => `${artifactsDirectory}/**/${x}`),
      {
        dot: true,
        ignore: exclude.map((x) => `${artifactsDirectory}/**/${x}`),
      },
    )
    return crawler.crawl(artifactsDirectory).withPromise()
  }

  async function getBroadcastDeployments(broadcastDirectory: string) {
    const deployments: { [key: string]: Record<number, string> } = {}

    const crawler = new fdir()
      .withBasePath()
      .glob('**/run-latest.json')
      .filter((path) => path.includes('/broadcast/'))
    const broadcastFiles = await crawler.crawl(broadcastDirectory).withPromise()
    for (const broadcastFile of broadcastFiles) {
      try {
        const broadcast = JSON.parse(await readFile(broadcastFile, 'utf8'))

        // Extract chainId from path: broadcast/.../[chainId]/run-latest.json
        const pathParts = broadcastFile.split('/')
        const chainIdPart = pathParts[pathParts.length - 2]
        if (!chainIdPart) continue
        const chainId = Number.parseInt(chainIdPart, 10)
        if (Number.isNaN(chainId)) continue

        const transactions = broadcast.transactions || []
        for (const tx of transactions) {
          if (
            tx.transactionType !== 'CREATE' &&
            tx.transactionType !== 'CREATE2'
          )
            continue
          if (tx.contractName && tx.contractAddress) {
            const contractName = tx.contractName
            const contractAddress = tx.contractAddress
            if (!deployments[contractName]) {
              deployments[contractName] = {}
            }
            deployments[contractName][chainId] = contractAddress
          }
          const additionalContracts = tx.additionalContracts || []
          for (const additional of additionalContracts) {
            if (additional.contractName && additional.contractAddress) {
              const contractName = additional.contractName
              const contractAddress = additional.contractAddress
              if (!deployments[contractName]) {
                deployments[contractName] = {}
              }
              deployments[contractName][chainId] = contractAddress
            }
          }
        }
      } catch (error) {
        logger.warn(
          `Failed to parse broadcast file ${broadcastFile}: ${(error as Error).message}`,
        )
      }
    }

    return deployments
  }

  const project = resolve(process.cwd(), config.project ?? '')

  let foundryConfig: z.infer<typeof FoundryConfigSchema> = {
    out: 'out',
    src: 'src',
  }
  try {
    const result = spawnSync(
      forgeExecutable,
      ['config', '--json', '--root', project],
      {
        encoding: 'utf-8',
        shell: true,
      },
    )
    if (result.error) throw result.error
    if (result.status !== 0)
      throw new Error(`Failed with code ${result.status}`)
    if (result.signal) throw new Error('Process terminated by signal')
    foundryConfig = FoundryConfigSchema.parse(JSON.parse(result.stdout))
  } catch {
  } finally {
    foundryConfig = {
      ...foundryConfig,
      out: artifacts ?? foundryConfig.out,
    }
  }

  const artifactsDirectory = join(project, foundryConfig.out)

  return {
    async contracts() {
      if (clean)
        execSync(`${forgeExecutable} clean --root ${project}`, {
          encoding: 'utf-8',
          stdio: 'pipe',
        })
      if (build)
        execSync(`${forgeExecutable} build --root ${project}`, {
          encoding: 'utf-8',
          stdio: 'pipe',
        })
      if (!existsSync(artifactsDirectory))
        throw new Error('Artifacts not found.')
      if (includeBroadcasts) {
        const broadcastDeployments = Object.fromEntries(
          Object.entries(await getBroadcastDeployments(project)).map(
            ([contractName, chainAddresses]) => [
              contractName,
              chainAddresses as ContractConfig['address'],
            ],
          ),
        )
        allDeployments = { ...broadcastDeployments, ...deployments }
      }
      const artifactPaths = await getArtifactPaths(artifactsDirectory)
      const contracts = []
      for (const artifactPath of artifactPaths) {
        const contract = await getContract(artifactPath, allDeployments)
        if (!contract.abi?.length) continue
        contracts.push(contract)
        contracts.push(
          ...getAliasContracts(
            getContractName(artifactPath, false),
            contract.abi,
          ),
        )
      }
      return contracts
    },
    name: 'Foundry',
    async validate() {
      // Check that project directory exists
      if (!existsSync(project))
        throw new Error(`Foundry project ${pc.gray(config.project)} not found.`)

      // Ensure forge is installed
      if (clean || build || rebuild)
        try {
          execSync(`${forgeExecutable} --version`, {
            encoding: 'utf-8',
            stdio: 'pipe',
          })
        } catch (_error) {
          throw new Error(dedent`
            forge must be installed to use Foundry plugin.
            To install, follow the instructions at https://book.getfoundry.sh/getting-started/installation
          `)
        }
    },
    watch: {
      command: rebuild
        ? async () => {
            logger.log(
              `${pc.magenta('Foundry')} Watching project at ${pc.gray(
                project,
              )}`,
            )
            const subprocess = spawn(forgeExecutable, [
              'build',
              '--watch',
              '--root',
              project,
            ])
            subprocess.stdout?.on('data', (data) => {
              process.stdout.write(`${pc.magenta('Foundry')} ${data}`)
            })

            process.once('SIGINT', shutdown)
            process.once('SIGTERM', shutdown)
            function shutdown() {
              subprocess?.kill()
            }
          }
        : undefined,
      paths: [
        ...include.map((x) => `${artifactsDirectory}/**/${x}`),
        ...exclude.map((x) => `!${artifactsDirectory}/**/${x}`),
      ],
      // Note: alias deployments (`deployments: { X: { artifact, address } }`) are only
      // resolved by `contracts()`. `onAdd`/`onChange` can only return one `ContractConfig`
      // per changed file, so during `--watch` a rebuild (`wagmi generate`) is needed to
      // pick up alias contracts for a changed artifact.
      async onAdd(path) {
        return getContract(path)
      },
      async onChange(path) {
        return getContract(path)
      },
      async onRemove(path) {
        return getContractName(path)
      },
    },
  }
}

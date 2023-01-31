import dedent from 'dedent'
import { execa } from 'execa'
import { default as fse } from 'fs-extra'
import { globby } from 'globby'
import { basename, extname, resolve } from 'pathe'
import pc from 'picocolors'

import type { ContractConfig, Plugin } from '../config'
import * as logger from '../logger'
import type { RequiredBy } from '../types'
import type { FoundryResolved } from './_types'

const defaultExcludes = [
  'Common.sol/**',
  'Components.sol/**',
  'Script.sol/**',
  'StdAssertions.sol/**',
  'StdError.sol/**',
  'StdCheats.sol/**',
  'StdMath.sol/**',
  'StdJson.sol/**',
  'StdStorage.sol/**',
  'StdUtils.sol/**',
  'Vm.sol/**',
  'console.sol/**',
  'console2.sol/**',
  'test.sol/**',
  '**.s.sol/*.json',
  '**.t.sol/*.json',
]

type FoundryConfig<TProject extends string> = {
  /**
   * Project's artifacts directory.
   *
   * Same as your project's `--out` (`-o`) option.
   *
   * @default 'out/'
   */
  artifacts?: string
  /**
   * Mapping of addresses to attach to artifacts.
   */
  deployments?: {
    [_ in FoundryResolved<TProject>['deployments']]: ContractConfig['address']
  }
  /** Artifact files to exclude. */
  exclude?: string[]
  /** [Forge](https://book.getfoundry.sh/forge) configuration */
  forge?: {
    /**
     * Remove build artifacts and cache directories on start up.
     *
     * @default false
     */
    clean?: boolean
    /**
     * Build Foundry project before fetching artifacts.
     *
     * @default true
     */
    build?: boolean
    /**
     * Path to `forge` executable command
     *
     * @default "forge"
     */
    path?: string
    /**
     * Rebuild every time a watched file or directory is changed.
     *
     * @default true
     */
    rebuild?: boolean
  }
  /** Artifact files to include. */
  include?: string[]
  /** Optional prefix to prepend to artifact names. */
  namePrefix?: string
  /** Path to foundry project. */
  project: TProject
}

type FoundryResult = RequiredBy<Plugin, 'contracts' | 'validate' | 'watch'>

/**
 * Resolves ABIs from [Foundry](https://github.com/foundry-rs/foundry) project.
 */
export function foundry<TProject extends string>({
  artifacts = 'out',
  deployments = {},
  exclude = defaultExcludes,
  forge: {
    clean = false,
    build = true,
    path: forgeExecutable = 'forge',
    rebuild = true,
  } = {},
  include = ['*.json'],
  namePrefix = '',
  project: project_,
}: FoundryConfig<TProject>): FoundryResult {
  function getContractName(artifactPath: string, usePrefix = true) {
    const filename = basename(artifactPath)
    const extension = extname(artifactPath)
    return `${usePrefix ? namePrefix : ''}${filename.replace(extension, '')}`
  }

  async function getContract(artifactPath: string) {
    const artifact = await fse.readJSON(artifactPath)
    return {
      abi: artifact.abi,
      address: deployments[getContractName(artifactPath, false)],
      name: getContractName(artifactPath),
    }
  }

  async function getArtifactPaths(artifactsDirectory: string) {
    return await globby([
      ...include.map((x) => `${artifactsDirectory}/**/${x}`),
      ...exclude.map((x) => `!${artifactsDirectory}/**/${x}`),
    ])
  }

  const project = resolve(process.cwd(), project_)
  const artifactsDirectory = `${project}/${artifacts}`

  return {
    async contracts() {
      if (clean) await execa(forgeExecutable, ['clean'], { cwd: project })
      if (build)
        await execa(forgeExecutable, ['build'], {
          cwd: project,
        })
      if (!fse.pathExistsSync(artifactsDirectory))
        throw new Error('Artifacts not found.')

      const artifactPaths = await getArtifactPaths(artifactsDirectory)
      const contracts = []
      for (const artifactPath of artifactPaths) {
        const contract = await getContract(artifactPath)
        if (!contract.abi?.length) continue
        contracts.push(contract)
      }
      return contracts
    },
    name: 'Foundry',
    async validate() {
      // Check that project directory exists
      if (!(await fse.pathExists(project)))
        throw new Error(`Foundry project ${pc.gray(project)} not found.`)

      // Ensure forge is installed
      if (clean || build || rebuild)
        try {
          await execa(forgeExecutable, ['--version'])
        } catch (error) {
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
            const subprocess = execa(forgeExecutable, ['build', '--watch'], {
              cwd: project,
            })
            subprocess.stdout?.on('data', (data) => {
              process.stdout.write(`${pc.magenta('Foundry')} ${data}`)
            })

            process.once('SIGINT', shutdown)
            process.once('SIGTERM', shutdown)
            function shutdown() {
              subprocess?.cancel()
            }
          }
        : undefined,
      paths: [
        ...include.map((x) => `${artifactsDirectory}/**/${x}`),
        ...exclude.map((x) => `!${artifactsDirectory}/**/${x}`),
      ],
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

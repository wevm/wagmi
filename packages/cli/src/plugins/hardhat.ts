import { execa } from 'execa'
import { default as fse } from 'fs-extra'
import { globby } from 'globby'
import { basename, extname, resolve } from 'pathe'

import type { Plugin } from '../config'
import * as logger from '../logger'

import { getPackageManager } from '../utils'

const defaultExcludes = ['build-info/**', '*.dbg.json']

type HardhatConfig = {
  /**
   * Project's artifacts directory.
   *
   * Same as your project's `artifacts` [path configuration](https://hardhat.org/hardhat-runner/docs/config#path-configuration) option.
   *
   * @default 'artifacts/'
   */
  artifacts?: string
  /** Artifact files to exclude. */
  exclude?: string[]
  /** Commands to run */
  commands?: {
    /** Remove build artifacts and cache directories on start up. */
    clean?: string | false
    /**
     * Build Hardhat project before fetching artifacts.
     *
     * @default `${packageManger} hardhat compile`
     */
    build?: string | false
    /**
     * Rebuild every time a watched file or directory is changed.
     *
     * @default `${packageManger} hardhat compile`
     */
    rebuild?: string | false
  }
  /** Artifact files to include. */
  include?: string[]
  /** Optional prefix to prepend to artifact names. */
  namePrefix?: string
  /** Path to Hardhat project. */
  project: string
  /**
   * Project's artifacts directory.
   *
   * Same as your project's `sources` [path configuration](https://hardhat.org/hardhat-runner/docs/config#path-configuration) option.
   *
   * @default 'contracts/'
   */
  sources?: string
}

type HardhatResult = Omit<Plugin, 'contracts'> &
  Required<Pick<Plugin, 'contracts'>>

/**
 * Resolves ABIs from [Hardhat](https://github.com/NomicFoundation/hardhat) project.
 */
export function hardhat({
  artifacts = 'artifacts',
  exclude = defaultExcludes,
  commands = {},
  include = ['*.json'],
  namePrefix = '',
  project,
  sources = 'contracts',
}: HardhatConfig): HardhatResult {
  function getContractName(artifact: { contractName: string }) {
    return `${namePrefix}${artifact.contractName}`
  }

  async function getContract(artifactPath: string) {
    const artifact = await fse.readJSON(artifactPath)
    return {
      abi: artifact.abi,
      name: getContractName(artifact),
    }
  }

  async function getArtifactPaths(artifactsDirectory: string) {
    return await globby([
      ...include.map((x) => `${artifactsDirectory}/**/${x}`),
      ...exclude.map((x) => `!${artifactsDirectory}/**/${x}`),
    ])
  }

  const artifactsDirectory = `${project}/${artifacts}`
  const sourcesDirectory = `${project}/${sources}`

  return {
    async contracts() {
      if (commands.clean) {
        const [command, ...options] = commands.clean.split(' ')
        await execa(command!, options, { cwd: resolve(project) })
      }
      const build =
        commands.build ?? `${await getPackageManager()} hardhat compile`
      if (build) {
        const [command, ...options] = build.split(' ')
        await execa(command!, options, { cwd: resolve(project) })
      }
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
    name: 'Hardhat',
    watch: {
      command:
        commands.rebuild ?? true
          ? async () => {
              logger.log(
                `Watching Hardhat project for changes at "${project}".`,
              )
              const { watch } = await import('chokidar')
              const watcher = watch(sourcesDirectory, {
                atomic: true,
                awaitWriteFinish: true,
                ignoreInitial: true,
                persistent: true,
              })
              const rebuild =
                commands.rebuild ||
                `${await getPackageManager()} hardhat compile`
              const [command, ...options] = rebuild!.split(' ')
              watcher.on('all', async (event) => {
                if (event !== 'change' && event !== 'add' && event !== 'unlink')
                  return
                console.log('Rebuilding Hardhat project…')
                await execa(command!, options, {
                  cwd: resolve(project),
                }).stdout?.pipe(process.stdout) // TODO: Add prefix for hardhat to logs
              })
              process.once('SIGINT', shutdown)
              process.once('SIGTERM', shutdown)
              function shutdown() {
                watcher.close()
              }
            }
          : undefined,
      paths: [
        artifactsDirectory,
        ...exclude.map((x) => `!${artifactsDirectory}/**/${x}`),
      ],
      async onAdd(path) {
        const artifactPaths = await getArtifactPaths(artifactsDirectory)
        if (!artifactPaths.includes(path)) return
        return getContract(path)
      },
      async onChange(path) {
        const artifactPaths = await getArtifactPaths(artifactsDirectory)
        if (!artifactPaths.includes(path)) return
        return getContract(path)
      },
      async onRemove(path) {
        const artifactPaths = await getArtifactPaths(artifactsDirectory)
        if (!artifactPaths.includes(path)) return
        const filename = basename(path)
        const extension = extname(path)
        return `${namePrefix}${filename.replace(extension, '')}`
      },
    },
  }
}

import dedent from 'dedent'
import { execa } from 'execa'
import { default as fse } from 'fs-extra'
import { globby } from 'globby'
import { basename, extname, resolve } from 'pathe'

import type { ContractsSource } from '../config'

type FoundryConfig = {
  /**
   * Project's artifacts directory.
   *
   * Same as your project's `--out` (`-o`) option.
   *
   * @default 'out/'
   */
  artifacts?: string
  /** Artifact files to exclude. */
  exclude?: string[]
  /** [Forge](https://book.getfoundry.sh/forge) configuration */
  forge?: {
    /** Remove build artifacts and cache directories on start up. */
    clean?: boolean
    /** Build project before fetching artifacts. */
    build?: boolean
    /** Rebuild every time a watched file or directory is changed. */
    rebuild?: boolean
  }
  /** Artifact files to include. */
  include?: string[]
  /** Optional prefix to prepend to artifact names. */
  namePrefix?: string
  /** Path to foundry project. */
  project: string
}

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

/**
 * Source for ABIs from [Foundry](https://github.com/foundry-rs/foundry) project
 */
export function foundry({
  artifacts = 'out',
  exclude = defaultExcludes,
  forge = {
    clean: false,
    build: true,
    rebuild: true,
  },
  include = ['*.json'],
  namePrefix = '',
  project,
}: FoundryConfig): ContractsSource {
  function getContractName(artifactPath: string) {
    const filename = basename(artifactPath)
    const extension = extname(artifactPath)
    return `${namePrefix}${filename.replace(extension, '')}`
  }

  async function getContract(artifactPath: string) {
    const artifact = await fse.readJSON(artifactPath)
    return {
      abi: artifact.abi,
      name: getContractName(artifactPath),
    }
  }

  async function getArtifactPaths(artifactsDirectory: string) {
    return await globby([
      ...include.map((x) => `${artifactsDirectory}/**/${x}`),
      ...exclude.map((x) => `!${artifactsDirectory}/**/${x}`),
    ])
  }

  async function assertForgeInstalled() {
    try {
      execa('forge', ['--version'])
    } catch (error) {
      throw new Error(dedent`
        Forge not installed. Install with Foundry:
        https://book.getfoundry.sh/getting-started/installation
      `)
    }
  }

  const artifactsDirectory = `${project}/${artifacts}`
  return {
    async contracts() {
      if (forge?.clean || forge?.build) {
        await assertForgeInstalled()
        if (forge.clean)
          await execa('forge', ['clean'], { cwd: resolve(project) })
        if (forge.build)
          await execa('forge', ['build'], { cwd: resolve(project) })
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
    name: 'Foundry',
    watch: {
      command: forge?.rebuild
        ? async () => {
            await assertForgeInstalled()
            await execa('forge', ['build', '--watch'], {
              cwd: resolve(project),
            }).stdout?.pipe(process.stdout)
          }
        : undefined,
      paths: [artifactsDirectory],
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
      onRemove(path) {
        return getContractName(path)
      },
    },
  }
}

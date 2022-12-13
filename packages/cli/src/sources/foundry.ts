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
  /** Artifact files to include. */
  include?: string[]
  /** Optional prefix to prepend to artifact names. */
  namePrefix?: string
  /** Path to foundry project. */
  project: string
  /**
   * Watch for changes in project's artifacts.
   */
  watch?: boolean | { artifacts: true; project?: boolean }
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
  include = ['*.json'],
  namePrefix = '',
  project,
  watch,
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

  const artifactsDirectory = `${project}/${artifacts}`
  const watchObject =
    typeof watch === 'boolean' ? { artifacts: watch, project: watch } : watch

  return {
    async contracts() {
      if (watchObject?.project) {
        try {
          await execa('forge', ['--version'])
        } catch (error) {
          throw new Error(dedent`
            Foundry must be installed to run project in watch mode.

            Install Foundry to use watch mode:
            https://book.getfoundry.sh/getting-started/installation
          `)
        }
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
    watch: watchObject?.artifacts
      ? {
          command: watchObject.project
            ? `forge build --root ${resolve(project)} --watch`
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
        }
      : undefined,
  }
}

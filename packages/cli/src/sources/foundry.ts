import { default as fse } from 'fs-extra'
import { globby } from 'globby'
import { basename, extname, resolve } from 'pathe'

import type { ContractFn } from '../config'

type FoundryConfig = {
  /** Artifact files to exclude. */
  exclude?: string[]
  /** Artifact files to include. */
  include?: string[]
  /** Optional prefix to prepend to artifact names. */
  namePrefix?: string
  /**
   * Project's artifacts directory.
   *
   * Same as your project's `--out` (`-o`) option.
   *
   * @default 'out/'
   */
  out?: string
  /** Path to foundry project. */
  project: string
  /**
   * Watch for changes in the project's artifacts directory located at `out`.
   */
  watch?: boolean | { out: true; project?: boolean }
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
  exclude = defaultExcludes,
  include = ['*.json'],
  namePrefix = '',
  out = 'out',
  project,
  watch,
}: FoundryConfig): ContractFn {
  const artifactsDirectory = `${project}/${out}`
  const watchMode =
    typeof watch === 'boolean' ? { out: watch, project: watch } : watch ?? false

  function getContractName(artifactPath: string) {
    const filename = basename(artifactPath)
    const extension = extname(artifactPath)
    return `${namePrefix}${filename.replace(extension, '')}`
  }

  async function getContract(artifactPath: string) {
    const artifact = await fse.readJSON(artifactPath)
    return {
      name: getContractName(artifactPath),
      source: artifact.abi,
    }
  }

  async function getArtifactPaths(artifactsDirectory: string) {
    return await globby([
      ...include.map((x) => `${artifactsDirectory}/**/${x}`),
      ...exclude.map((x) => `!${artifactsDirectory}/**/${x}`),
    ])
  }

  async function getContracts(paths: string[]) {
    const contracts = []
    for (const artifactPath of paths) {
      const contract = await getContract(artifactPath)
      if (!contract.source?.length) continue
      contracts.push(contract)
    }
    return contracts
  }

  return {
    async contracts() {
      if (!fse.pathExistsSync(artifactsDirectory))
        throw new Error('Artifacts not found.')
      const artifactPaths = await getArtifactPaths(artifactsDirectory)
      return getContracts(artifactPaths)
    },
    watch: watchMode
      ? {
          command: watchMode.project
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

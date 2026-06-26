import fs from 'node:fs/promises'
import path from 'node:path'

// Generates connector-specific subpath exports.

const connectors = [
  'baseAccount',
  'coinbaseWallet',
  'injected',
  'metaMask',
  'mock',
  'porto',
  'safe',
  'tempoWallet',
  'walletConnect',
] as const
type Connector = (typeof connectors)[number]

const frameworkPackages = ['react', 'vue', 'solid']

let count = 0

console.log('Generating connector exports.')

for (const connector of connectors) {
  console.log(`- ${connector}`)
  await writeFile(
    `packages/connectors/src/exports/${connector}.ts`,
    getExport(connector),
  )
  for (const pkg of frameworkPackages)
    await writeFile(
      `packages/${pkg}/src/exports/${connector}.ts`,
      getExport(connector, `@wagmi/connectors/${connector}`),
    )
}

await updatePackageJson('packages/connectors/package.json', {
  exportPrefix: '.',
  typesPrefix: '',
  exportPathPrefix: 'exports',
})

for (const pkg of frameworkPackages)
  await updatePackageJson(`packages/${pkg}/package.json`, {
    exportPrefix: './connectors',
    typesPrefix: 'connectors/',
    exportPathPrefix: 'exports',
  })

console.log(`Done. Generated ${count} ${count === 1 ? 'file' : 'files'}.`)

type PackageJson = Record<string, unknown> & {
  exports?: Record<string, { types: string; default: string } | string>
  typesVersions?: Record<string, Record<string, string[]>>
}

async function updatePackageJson(
  packageJsonPath: string,
  options: {
    exportPrefix: '.' | './connectors'
    typesPrefix: '' | 'connectors/'
    exportPathPrefix: 'exports'
  },
) {
  let packageJson = JSON.parse(
    await fs.readFile(packageJsonPath, 'utf-8'),
  ) as PackageJson

  if (!packageJson.exports) packageJson.exports = {}
  const generatedExports = Object.fromEntries(
    connectors.map((connector) => [
      `${options.exportPrefix}/${connector}`,
      {
        types: `./dist/types/${options.exportPathPrefix}/${connector}.d.ts`,
        default: `./dist/esm/${options.exportPathPrefix}/${connector}.js`,
      },
    ]),
  )

  const exports: NonNullable<PackageJson['exports']> = {}
  let inserted = false
  const insertAfter = options.exportPrefix === '.' ? '.' : './connectors'

  for (const [key, value] of Object.entries(packageJson.exports)) {
    if (key in generatedExports) continue
    exports[key] = value
    if (key === insertAfter) {
      Object.assign(exports, generatedExports)
      inserted = true
    }
  }
  if (!inserted) Object.assign(exports, generatedExports)
  packageJson.exports = exports

  const typesVersions = packageJson.typesVersions ?? { '*': {} }
  const typesVersion = typesVersions['*'] ?? {}
  for (const connector of connectors) {
    typesVersion[`${options.typesPrefix}${connector}`] = [
      `./dist/types/${options.exportPathPrefix}/${connector}.d.ts`,
    ]
  }
  typesVersions['*'] = typesVersion

  const nextPackageJson: PackageJson = {}
  let insertedTypesVersions = false
  for (const [key, value] of Object.entries(packageJson)) {
    if (key === 'typesVersions') continue
    nextPackageJson[key] = value
    if (key === 'exports') {
      nextPackageJson.typesVersions = typesVersions
      insertedTypesVersions = true
    }
  }
  if (!insertedTypesVersions) nextPackageJson.typesVersions = typesVersions
  packageJson = nextPackageJson

  await writeFile(
    packageJsonPath,
    `${JSON.stringify(packageJson, undefined, 2)}\n`,
  )
}

function getExport(connector: Connector, source?: string) {
  const source_ =
    source ??
    (connector === 'injected' || connector === 'mock'
      ? '@wagmi/core'
      : connector === 'tempoWallet'
        ? '@wagmi/core/tempo'
        : `../${connector}.js`)
  const typeName = `${connector.slice(0, 1).toUpperCase()}${connector.slice(
    1,
  )}Parameters`

  return `export { type ${typeName}, ${connector} } from '${source_}'\n`
}

async function writeFile(filePath: string, content: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, content, 'utf-8')
  count += 1
}

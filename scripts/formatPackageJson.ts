import fs from 'node:fs/promises'
import path from 'node:path'

// Generates package.json files to be published to NPM with only the necessary fields.

console.log('Formatting package.json files.')

// Get all package.json files
const packagePaths = fs.glob('packages/**/package.json', {
  exclude: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for await (const packagePath of packagePaths) {
  type Package = Record<string, unknown> & {
    name?: string | undefined
    private?: boolean | undefined
  }
  const packageJson = JSON.parse(
    await fs.readFile(packagePath, 'utf-8'),
  ) as Package

  // Skip private packages
  if (packageJson.private) continue
  if (!packageJson.name) continue

  count += 1
  console.log(`${packageJson.name} — ${path.dirname(packagePath)}`)

  await fs.writeFile(
    `${packagePath}.tmp`,
    `${JSON.stringify(packageJson, undefined, 2)}\n`,
    'utf-8',
  )

  const { devDependencies: _dD, scripts: _s, ...rest } = packageJson
  await fs.writeFile(
    packagePath,
    `${JSON.stringify(rest, undefined, 2)}\n`,
    'utf-8',
  )
}

console.log(`Done. Formatted ${count} ${count === 1 ? 'file' : 'files'}.`)

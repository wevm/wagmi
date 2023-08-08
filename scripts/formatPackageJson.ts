import fs from 'fs-extra'
import { glob } from 'glob'
import path from 'path'

// Generates package.json files to be published to NPM with only the necessary fields.

// Link packages
console.log('Formatting package.json files.')
// Get all package.json files
const packagePaths = await glob('packages/**/package.json', {
  ignore: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for (const packagePath of packagePaths) {
  type Package = {
    name?: string
    private?: boolean
  } & Record<string, unknown>
  const packageFile = (await fs.readJson(packagePath)) as Package

  // Skip private packages
  if (packageFile.private) continue

  count += 1
  console.log(`${packageFile.name} — ${path.dirname(packagePath)}`)

  const tmpPackageJson = await fs.readJson(packagePath)
  await fs.writeJson(`${packagePath}.tmp`, tmpPackageJson, { spaces: 2 })

  const { devDependencies: _dD, scripts: _s, ...rest } = tmpPackageJson
  await fs.writeJson(packagePath, rest, { spaces: 2 })
}

console.log(`Done. Formatted ${count} ${count === 1 ? 'file' : 'files'}.`)

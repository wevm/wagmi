import fs from 'fs-extra'
import { glob } from 'glob'
import path from 'path'

console.log('Updating version files.')
// Get all package.json files
const packagePaths = await glob('**/package.json', {
  ignore: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for (const packagePath of packagePaths) {
  type Package = {
    name?: string
    private?: boolean
    version?: string
  }
  const packageFile = (await fs.readJson(packagePath)) as Package

  // Skip private packages
  if (packageFile.private) continue

  count += 1
  console.log(`${packageFile.name} — ${packageFile.version}`)

  const versionFilePath = path.resolve(
    path.dirname(packagePath),
    'src',
    'version.ts',
  )
  await fs.writeFile(
    versionFilePath,
    `export const version = '${packageFile.version}'\n`,
  )
}

console.log(`Done. Updated version file for ${count} packages.`)

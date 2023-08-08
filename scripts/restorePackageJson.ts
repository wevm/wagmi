import fs from 'fs-extra'
import { glob } from 'glob'
import path from 'path'

// Restores package.json files from package.json.tmp files.

// Link packages
console.log('Restoring package.json files.')
// Get all package.json files
const packagePaths = await glob('packages/**/package.json.tmp', {
  ignore: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for (const packagePath of packagePaths) {
  type Package = { name?: string } & Record<string, unknown>
  const packageFile = (await fs.readJson(packagePath)) as Package

  count += 1
  console.log(`${packageFile.name} — ${path.dirname(packagePath)}`)

  const tmpPackageJson = await fs.readJson(packagePath)
  await fs.writeJson(packagePath.replace('.tmp', ''), tmpPackageJson, {
    spaces: 2,
  })
  await fs.remove(packagePath)
}

console.log(`Done. Restored ${count} ${count === 1 ? 'file' : 'files'}.`)

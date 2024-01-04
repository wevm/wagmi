import path from 'node:path'
import { glob } from 'glob'

// Updates package version.ts files (so you can use the version in code without importing package.json).

console.log('Updating version files.')

// Get all package.json files
const packagePaths = await glob('**/package.json', {
  ignore: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for (const packagePath of packagePaths) {
  type Package = {
    name?: string | undefined
    private?: boolean | undefined
    version?: string | undefined
  }
  const file = Bun.file(packagePath)
  const packageJson = (await file.json()) as Package

  // Skip private packages
  if (packageJson.private) continue

  count += 1
  console.log(`${packageJson.name} — ${packageJson.version}`)

  const versionFilePath = path.resolve(
    path.dirname(packagePath),
    'src',
    'version.ts',
  )
  await Bun.write(
    versionFilePath,
    `export const version = '${packageJson.version}'\n`,
  )
}

console.log(
  `Done. Updated version file for ${count} ${
    count === 1 ? 'package' : 'packages'
  }.`,
)

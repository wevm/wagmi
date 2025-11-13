import fs from 'node:fs/promises'
import path from 'node:path'

// Updates package version.ts files (so you can use the version in code without importing package.json).

console.log('Updating version files.')

// Get all package.json files
const packagePaths = fs.glob('packages/**/package.json', {
  exclude: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for await (const packagePath of packagePaths) {
  type Package = {
    name?: string | undefined
    private?: boolean | undefined
    version?: string | undefined
  }
  const packageJson = JSON.parse(
    await fs.readFile(packagePath, 'utf-8'),
  ) as Package

  // Skip private packages
  if (packageJson.private) continue

  count += 1
  console.log(`${packageJson.name} — ${packageJson.version}`)

  const versionFilePath = path.resolve(
    path.dirname(packagePath),
    'src',
    'version.ts',
  )
  await fs.writeFile(
    versionFilePath,
    `export const version = '${packageJson.version}'\n`,
    'utf-8',
  )
}

console.log(
  `Done. Updated version file for ${count} ${
    count === 1 ? 'package' : 'packages'
  }.`,
)

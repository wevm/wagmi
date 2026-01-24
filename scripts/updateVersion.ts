import child_process from 'node:child_process'
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

  const version = (() => {
    if (process.env.PKG_PR_NEW) {
      const gitHash = child_process
        .execSync('git rev-parse --short HEAD')
        .toString()
        .trim()
      const branch = (
        process.env.GITHUB_HEAD_REF ||
        child_process.execSync('git branch --show-current').toString().trim()
      ).replace(/[^a-zA-Z0-9]/g, '-')
      return `0.0.0-${branch}.${gitHash}`
    }
    return packageJson.version
  })()

  count += 1
  console.log(`${packageJson.name} — ${version}`)

  const versionFilePath = path.resolve(
    path.dirname(packagePath),
    'src',
    'version.ts',
  )
  await fs.writeFile(
    versionFilePath,
    `export const version = '${version}'\n`,
    'utf-8',
  )

  if (process.env.PKG_PR_NEW) {
    packageJson.version = version
    await fs.writeFile(
      packagePath,
      `${JSON.stringify(packageJson, null, 2)}\n`,
      'utf-8',
    )
  }
}

console.log(
  `Done. Updated version file for ${count} ${
    count === 1 ? 'package' : 'packages'
  }.`,
)

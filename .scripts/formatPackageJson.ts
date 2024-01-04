import path from 'node:path'
import { glob } from 'glob'

// Generates package.json files to be published to NPM with only the necessary fields.

console.log('Formatting package.json files.')

// Get all package.json files
const packagePaths = await glob('packages/**/package.json', {
  ignore: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for (const packagePath of packagePaths) {
  type Package = Record<string, unknown> & {
    name?: string | undefined
    private?: boolean | undefined
  }
  const file = Bun.file(packagePath)
  const packageJson = (await file.json()) as Package

  // Skip private packages
  if (packageJson.private) continue

  count += 1
  console.log(`${packageJson.name} — ${path.dirname(packagePath)}`)

  await Bun.write(
    `${packagePath}.tmp`,
    `${JSON.stringify(packageJson, undefined, 2)}\n`,
  )

  const { devDependencies: _dD, scripts: _s, ...rest } = packageJson
  await Bun.write(packagePath, `${JSON.stringify(rest, undefined, 2)}\n`)
}

console.log(`Done. Formatted ${count} ${count === 1 ? 'file' : 'files'}.`)

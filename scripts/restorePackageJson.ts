import fs from 'node:fs/promises'
import path from 'node:path'

// Restores package.json files from package.json.tmp files.

console.log('Restoring package.json files.')

// Get all package.json files
const packagePaths = fs.glob('packages/**/package.json.tmp', {
  exclude: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for await (const packagePath of packagePaths) {
  type Package = { name?: string | undefined } & Record<string, unknown>
  const packageJson = JSON.parse(
    await fs.readFile(packagePath, 'utf-8'),
  ) as Package

  count += 1
  console.log(`${packageJson.name} — ${path.dirname(packagePath)}`)

  await fs.writeFile(
    packagePath.replace('.tmp', ''),
    `${JSON.stringify(packageJson, undefined, 2)}\n`,
    'utf-8',
  )
  await fs.rm(packagePath)
}

console.log(`Done. Restored ${count} ${count === 1 ? 'file' : 'files'}.`)

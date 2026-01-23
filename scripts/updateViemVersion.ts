import fs from 'node:fs/promises'

// Updates viem version in Vitest snapshots, etc.

console.log('Updating Viem version.')

const packageJson = JSON.parse(await fs.readFile('package.json', 'utf-8'))
const viemVersion = packageJson.devDependencies.viem

// Update Vitest snapshots
// Get all *.test.ts files
const testPaths = fs.glob('packages/**/*.test.ts')

let count = 0
for await (const testPath of testPaths) {
  const testFile = await fs.readFile(testPath, 'utf-8')

  // Skip files that don't contain viem version
  if (!testFile.includes('Version: viem@')) continue
  // Skip files that contain current version
  if (testFile.includes(`Version: viem@${viemVersion}`)) continue

  const updatedTestFile = testFile.replace(
    /Version: viem@[A-Za-z0-9\-.]+/g,
    `Version: viem@${viemVersion}`,
  )
  await fs.writeFile(testPath, updatedTestFile, 'utf-8')

  count += 1
}

// // Update package.json#pnpm.overrides.viem
// if (packageJson.pnpm?.overrides?.viem !== viemVersion) {
//   const path = 'package.json'
//   console.log(path)
//   packageJson.pnpm.overrides.viem = viemVersion
//   await fs.writeFile(path, `${JSON.stringify(packageJson, undefined, 2)}\n`, 'utf-8')
//   count += 1
// }

console.log(`Done. Updated ${count} ${count === 1 ? 'file' : 'files'}.`)

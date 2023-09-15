import { glob } from 'glob'

// Updates viem version in Vitest snapshots, etc.

console.log('Updating Viem version.')

const file = Bun.file('package.json')
const packageJson = await file.json()
const viemVersion = packageJson.devDependencies.viem

// Update Vitest snapshots
// Get all *.test.ts files
const testPaths = await glob('packages/**/*.test.ts', {
  ignore: ['**/dist/**', '**/node_modules/**'],
})

let count = 0
for (const testPath of testPaths) {
  const file = Bun.file(testPath)
  const testFile = await file.text()

  // Skip files that don't contain viem version
  if (!testFile.includes('Version: viem@')) continue
  // Skip files that contain current version
  if (testFile.includes(`Version: viem@${viemVersion}`)) continue

  console.log(testPath)
  const updatedTestFile = testFile.replace(
    /Version: viem@[A-Za-z0-9\-\.]+/g,
    `Version: viem@${viemVersion}`,
  )
  await Bun.write(testPath, updatedTestFile)

  count += 1
}

// // Update package.json#pnpm.overrides.viem
// if (packageJson.pnpm?.overrides?.viem !== viemVersion) {
//   const path = 'package.json'
//   console.log(path)
//   packageJson.pnpm.overrides.viem = viemVersion
//   await Bun.write(path, `${JSON.stringify(packageJson, undefined, 2)}\n`)
//   count += 1
// }

console.log(`Done. Updated ${count} ${count === 1 ? 'file' : 'files'}.`)

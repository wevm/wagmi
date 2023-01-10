import type { Package } from '@manypkg/get-packages'
import { getPackagesSync } from '@manypkg/get-packages'
import { execa } from 'execa'
import { readJsonSync, writeJsonSync } from 'fs-extra'

import path from 'path'

type PackageJson = Package['packageJson']
type PreparedPackage = Package & {
  oldPackageJson: PackageJson
}

const packagesDir = [
  path.join(__dirname, '..', 'packages'),
  path.join(__dirname, '..', 'references', 'packages'),
]
const referencesDir = [path.join(__dirname, '..', 'references', 'packages')]

/** @deprecated Script to generate & release a CJS escape hatch bundle. */
export async function main() {
  const { packages } = getPackagesSync(path.join(__dirname, '..'))

  // 1. Prepare package package.jsons into CJS format.
  const preparedPackages = prepare({ packages })

  // 2. Bundle into CJS.
  await build()

  // 3. Retrieve the changed packages from the output of
  // the changesets GH Action (if used). Otherwise, just
  // use prepared packages.
  const changedPackageJsons: PackageJson[] = process.argv[2]
    ? JSON.parse(process.argv[2])
    : preparedPackages.map(({ packageJson }) => packageJson)
  const changedPackages: Package[] = preparedPackages.filter(
    ({ packageJson }) =>
      changedPackageJsons.some(({ name }) => name === packageJson.name),
  )

  // 4. Version packages w/ "-cjs" suffix.
  version({ changedPackages, packages })

  // 5. Publish packages under "cjs" tag.
  await publish({ changedPackages })

  // 6. Revert package.jsons to original state.
  postPublish({ preparedPackages })
}

main()

//////////////////////////////////////////////////////////////////////////
// Prepare

function prepare({ packages }: { packages: Package[] }) {
  const packageDirs = packages
    .filter(({ dir }) => packagesDir.some((i) => dir.startsWith(i)))
    .map(({ dir }) => dir)

  const preparedPackages: PreparedPackage[] = []
  for (const packageDir of packageDirs) {
    const packageJsonPath = path.join(packageDir, 'package.json')
    const packageJson = readJsonSync(packageJsonPath)
    const oldPackageJson = { ...packageJson }

    delete packageJson.type
    writeJsonSync(packageJsonPath, packageJson, { spaces: 2 })

    preparedPackages.push({ dir: packageDir, oldPackageJson, packageJson })
  }
  return preparedPackages
}

//////////////////////////////////////////////////////////////////////////
// Build

async function build() {
  await execa('pnpm', ['build'], {
    env: {
      FORMAT: 'cjs',
      NODE_ENV: 'production',
    },
    cwd: path.join(__dirname, '..'),
    stdout: process.stdout,
  })
}

//////////////////////////////////////////////////////////////////////////
// Version

function version({
  changedPackages,
  packages,
}: {
  changedPackages: Package[]
  packages: Package[]
}) {
  const referencesPackages = packages.filter(({ dir }) =>
    referencesDir.some((i) => dir.startsWith(i)),
  )

  for (const { dir, packageJson } of changedPackages) {
    const newPackageJson = { ...packageJson }

    newPackageJson.version = packageJson.version + '-cjs'
    for (const { packageJson } of referencesPackages) {
      if (newPackageJson.dependencies?.[packageJson.name]) {
        newPackageJson.dependencies[packageJson.name] =
          packageJson.version + '-cjs'
      }
    }

    writeJsonSync(path.join(dir, 'package.json'), newPackageJson, { spaces: 2 })
  }
}

//////////////////////////////////////////////////////////////////////////
// Publish

async function publish({ changedPackages }: { changedPackages: Package[] }) {
  for (const { dir } of changedPackages) {
    if (referencesDir.some((i) => dir.startsWith(i))) return
    await execa('pnpm', ['publish', '--tag', 'cjs', '--no-git-checks'], {
      cwd: dir,
      stdout: process.stdout,
    })
  }
}

//////////////////////////////////////////////////////////////////////////
// Post-publish

function postPublish({
  preparedPackages,
}: {
  preparedPackages: PreparedPackage[]
}) {
  // Restore package.jsons
  for (const { oldPackageJson, dir } of preparedPackages) {
    writeJsonSync(path.join(dir, 'package.json'), oldPackageJson, { spaces: 2 })
  }
}

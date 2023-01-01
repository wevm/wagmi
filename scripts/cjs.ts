import type { Package } from '@manypkg/get-packages'
import { getPackagesSync } from '@manypkg/get-packages'
import { execa } from 'execa'
import { readJsonSync, writeJsonSync } from 'fs-extra'

import path from 'path'

type PackageJson = Package['packageJson']

const include = [path.join(__dirname, '..', 'packages')]

/** @deprecated Script to generate & release a CJS escape hatch bundle. */
export async function main() {
  const { packages } = getPackagesSync(path.join(__dirname, '..'))

  const packageDirs = packages
    .filter(({ dir }) => include.some((i) => dir.startsWith(i)))
    .map(({ dir }) => dir)

  // 1. Prepare package package.jsons into CJS format.
  const preparedPackages = prepare({ packageDirs })

  // 2. Bundle into CJS.
  await build()

  const changedPackageJsons: PackageJson[] = process.argv[2]
    ? JSON.parse(process.argv[2])
    : preparedPackages.map(({ packageJson }) => packageJson)

  const changedPackages: Package[] = preparedPackages.filter(
    ({ packageJson }) =>
      changedPackageJsons.some(({ name }) => name === packageJson.name),
  )

  // 3. Version packages w/ "-cjs" suffix.
  version({ changedPackages })

  // 4. Publish packages under "cjs" tag.
  await publish({ changedPackages })

  // 5. Revert package.jsons to original state.
  postPublish({ preparedPackages })
}

main()

//////////////////////////////////////////////////////////////////////////
// Prepare

type PreparedPackage = Package & {
  oldPackageJson: PackageJson
}

function prepare({ packageDirs }: { packageDirs: string[] }) {
  const packages: PreparedPackage[] = []
  for (const packageDir of packageDirs) {
    const packageJsonPath = path.join(packageDir, 'package.json')
    const packageJson = readJsonSync(packageJsonPath)
    const oldPackageJson = { ...packageJson }

    delete packageJson.type
    writeJsonSync(packageJsonPath, packageJson, { spaces: 2 })

    packages.push({ dir: packageDir, oldPackageJson, packageJson })
  }
  return packages
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

function version({ changedPackages }: { changedPackages: Package[] }) {
  for (const { dir, packageJson } of changedPackages) {
    const newPackageJson = {
      ...packageJson,
      version: `${packageJson.version}-cjs`,
    }
    writeJsonSync(path.join(dir, 'package.json'), newPackageJson, { spaces: 2 })
  }
}

//////////////////////////////////////////////////////////////////////////
// Publish

async function publish({ changedPackages }: { changedPackages: Package[] }) {
  for (const { dir } of changedPackages) {
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

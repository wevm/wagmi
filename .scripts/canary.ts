import { glob } from 'glob'

// Publishes canary packages.

// https://github.com/changesets/changesets/blob/main/docs/snapshot-releases.md

{
  console.log('Versioning packages for canary release.')
  Bun.spawnSync(['pnpm', 'changeset', 'version', '--snapshot', 'canary'])

  // Get all package.json files
  const packagePaths = await glob('packages/**/package.json', {
    ignore: ['**/dist/**', '**/node_modules/**'],
  })

  let ready = true
  for (const packagePath of packagePaths) {
    type Package = {
      name?: string | undefined
      private?: boolean | undefined
      version?: string | undefined
    }
    const file = Bun.file(packagePath)
    const packageJson = (await file.json()) as Package

    if (!packageJson.name) continue
    if (packageJson.private) continue

    if (!packageJson.version?.includes('canary')) {
      ready = false
      break
    }
    console.log(`${packageJson.name} — ${packageJson.version}`)
  }

  if (!ready) {
    console.log('No changes detected.')
    process.exit(0)
  }
}

{
  console.log('Preparing packages for publish.')
  const proc = Bun.spawnSync(['pnpm', 'changeset:prepublish'])
  if (!proc.success) {
    console.log('Failed to prepare packages.')
    process.exit(0)
  }
}

{
  console.log('Publishing canary packages.')
  const proc = Bun.spawnSync([
    'pnpm',
    'changeset',
    'publish',
    '--tag',
    'canary',
  ])

  console.log('\n\n')
  console.log(proc.stdout.toString())
}

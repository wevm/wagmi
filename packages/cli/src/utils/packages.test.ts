import { expect, test } from 'vitest'

import { getIsPackageInstalled, getPackageManager } from './packages.js'

test('getIsPackageInstalled: true', async () => {
  await expect(getIsPackageInstalled({ packageName: 'vitest' })).resolves.toBe(
    true,
  )
})

test('getIsPackageInstalled: false', async () => {
  await expect(
    getIsPackageInstalled({ packageName: 'vitest-unknown' }),
  ).resolves.toBe(false)
})

test('getPackageManager', async () => {
  await expect(getPackageManager()).resolves.toMatchInlineSnapshot('"pnpm"')
})

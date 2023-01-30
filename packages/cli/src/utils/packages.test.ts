import { describe, expect, test } from 'vitest'

import {
  getInstallCommand,
  getIsPackageInstalled,
  getPackageManager,
} from './packages'

describe('getIsPackageInstalled', () => {
  test('true', async () => {
    await expect(
      getIsPackageInstalled({ packageName: 'vitest' }),
    ).resolves.toBe(true)
  })

  test('false', async () => {
    await expect(
      getIsPackageInstalled({ packageName: 'vitest-unknown' }),
    ).resolves.toBe(false)
  })
})

test('getInstallCommand', async () => {
  await expect(getInstallCommand('vitest')).resolves.toMatchInlineSnapshot(`
    [
      "pnpm",
      [
        "add",
        "vitest",
      ],
    ]
  `)
})

test('getPackageManager', async () => {
  await expect(getPackageManager()).resolves.toMatchInlineSnapshot('"pnpm"')
})

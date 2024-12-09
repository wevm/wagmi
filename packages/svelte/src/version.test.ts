import { expect, test } from 'vitest'
import { getVersion } from './version.js'

test('default', () => {
  expect(getVersion()).toMatchInlineSnapshot(`"@wagmi/svelte@x.y.z"`)
})

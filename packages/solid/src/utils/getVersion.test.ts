import { expect, test } from 'vitest'

import { getVersion } from './getVersion.js'

test('default', () => {
  expect(getVersion()).toMatchInlineSnapshot(`"@wagmi/solid@x.y.z"`)
})

import { expect, test } from 'vitest'

import { init } from './init'

test('works', async () => {
  expect(await init()).toMatchInlineSnapshot(`true`)
})

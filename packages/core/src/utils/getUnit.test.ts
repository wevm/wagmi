import { expect, test } from 'vitest'

import { getUnit } from './getUnit.js'

test('default', () => {
  expect(getUnit(1)).toMatchInlineSnapshot('1')
  expect(getUnit('wei')).toMatchInlineSnapshot('0')
  expect(getUnit('ether')).toMatchInlineSnapshot('18')
})

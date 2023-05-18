import { expect, test } from 'vitest'

import { getUnit } from './getUnit'

test('default', () => {
  expect(getUnit('ether')).toMatchInlineSnapshot('18')
  expect(getUnit('gwei')).toMatchInlineSnapshot('9')
  expect(getUnit('wei')).toMatchInlineSnapshot('0')
  expect(getUnit(3)).toMatchInlineSnapshot('3')
})

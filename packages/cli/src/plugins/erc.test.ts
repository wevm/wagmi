import { describe, expect, it } from 'vitest'

import { erc } from './erc'

describe('erc', () => {
  it('creates', async () => {
    expect(erc()).toMatchSnapshot()
  })

  it('contracts', async () => {
    expect(erc().contracts()).toMatchSnapshot()
  })
})

import { BigNumber } from 'ethers'

import { serialize } from './serialize'

describe('serialize', () => {
  it('serializes', () => {
    const serializedCache = serialize({
      some: 'complex',
      object: {
        that: 'has',
        many: [
          { many: 'many', manymany: 'many' },
          { many: 'many' },
          { many: 'many' },
          {
            many: {
              properties: {
                ones: {
                  that: {
                    have: {
                      functions: () => null,
                    },
                  },
                },
              },
            },
          },
        ],
      },
      and: {
        ones: {
          that: {
            have: {
              bignumbers: BigNumber.from('0x01'),
            },
          },
        },
      },
      also: {
        ones: {
          that: {
            have: {
              proxies: new Proxy({ lol: 'nice' }, {}),
            },
          },
        },
      },
    })
    expect(serializedCache).toMatchInlineSnapshot(
      `"{\\"some\\":\\"complex\\",\\"object\\":{\\"that\\":\\"has\\",\\"many\\":[{\\"many\\":\\"many\\",\\"manymany\\":\\"many\\"},{\\"many\\":\\"many\\"},{\\"many\\":\\"many\\"},{\\"many\\":{\\"properties\\":{\\"ones\\":{\\"that\\":{\\"have\\":{}}}}}}]},\\"and\\":{\\"ones\\":{\\"that\\":{\\"have\\":{\\"bignumbers\\":{\\"type\\":\\"BigNumber\\",\\"hex\\":\\"0x01\\"}}}}},\\"also\\":{\\"ones\\":{\\"that\\":{\\"have\\":{\\"proxies\\":{\\"lol\\":\\"nice\\"}}}}}}"`,
    )
  })
})

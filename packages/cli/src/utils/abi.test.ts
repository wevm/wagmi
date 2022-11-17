import { describe, expect, it } from 'vitest'

import { AbiSchema } from './abi'

describe('AbiSchema', () => {
  it('returns valid schema', () => {
    expect(
      AbiSchema.parse([
        {
          inputs: [{ type: 'address' }],
          name: 'love',
          outputs: [{ type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ]),
    ).toMatchInlineSnapshot(`
      [
        {
          "inputs": [
            {
              "type": "address",
            },
          ],
          "name": "love",
          "outputs": [
            {
              "type": "uint256",
            },
          ],
          "stateMutability": "view",
          "type": "function",
        },
      ]
    `)
  })

  it('throws error for invalid schema', async () => {
    await expect(
      AbiSchema.parseAsync([
        {
          inputs: [{ type: 'notAValidType' }],
          name: 'love',
          outputs: [{ type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ]),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "[
        {
          \\"validation\\": \\"regex\\",
          \\"code\\": \\"invalid_string\\",
          \\"message\\": \\"Invalid\\",
          \\"path\\": [
            0,
            \\"inputs\\",
            0,
            \\"type\\"
          ]
        }
      ]"
    `)
  })
})

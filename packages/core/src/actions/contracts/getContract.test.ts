import { erc20ABI } from '../../constants'
import { getContract } from './getContract'

describe('getContract', () => {
  it('gets contract', () => {
    expect(
      getContract({
        addressOrName: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        contractInterface: erc20ABI,
      }),
    ).toBeDefined()
  })
})

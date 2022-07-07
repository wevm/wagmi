import {
  getSigners,
  getUnclaimedTokenId,
  mlootContractConfig,
  setupClient,
} from '../../../test'
import { MockConnector } from '../../connectors/mock'
import { connect } from '../accounts'
import { prepareContractTransaction } from './prepareContractTransaction'
import { writeContractPrepared } from './writeContractPrepared'

const connector = new MockConnector({
  options: { signer: getSigners()[0]! },
})

describe('writeContractPrepared', () => {
  beforeEach(() => setupClient())

  it('default', async () => {
    const tokenId = await getUnclaimedTokenId(
      '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
    )
    if (!tokenId) return

    await connect({ connector })
    const preparedRequest = await prepareContractTransaction({
      ...mlootContractConfig,
      functionName: 'claim',
      args: [tokenId],
    })
    const { hash } = await writeContractPrepared({ preparedRequest })

    expect(hash).toBeDefined()
  })
})

import { Contract } from 'ethers/lib/ethers'
import { Bytes, hashMessage } from 'ethers/lib/utils'

import { wagmiClient } from '../../client'
import { gnosisSafeABI } from '../../constants'
import { ConnectorNotFoundError, UserRejectedRequestError } from '../../errors'
import { verifyEIP1271Signature } from '../../utils'
import { fetchSigner } from './fetchSigner'

const contractAccounts = [
  {
    name: 'Gnosis Safe Multisig',
    abi: gnosisSafeABI,
    event: 'SignMsg',
    magicValue: '0x1626ba7e',
    regex: /(gnosis safe)/i,
  },
]

export type SignMessageArgs = {
  /** Message to sign with wallet */
  message: Bytes | string
}

type Signature = string
export type SignMessageResult = Signature

export async function signMessage(
  args: SignMessageArgs,
): Promise<SignMessageResult> {
  try {
    const signer = await fetchSigner()
    if (!signer) throw new ConnectorNotFoundError()
    const signature = await signer.signMessage(args.message)

    if (signature === '0x') {
      const { connector, provider } = wagmiClient
      if (!connector) throw new ConnectorNotFoundError()
      const walletProvider = connector.getProvider()
      const walletName = walletProvider.connector?.peerMeta?.name ?? ''
      const contractAccount = contractAccounts.find((x) =>
        x.regex.test(walletName),
      )
      if (contractAccount) {
        const address = await connector.getAccount()
        const contract = new Contract(address, contractAccount.abi, provider)
        const listenToContract = new Promise<string | undefined>((resolve) => {
          contract.on(contractAccount.event, async (msgHash: any) => {
            // Upon detecing the SignMsg event, validate that the contract signed the message
            const messageWasSigned = await verifyEIP1271Signature({
              address,
              data: hashMessage(args.message),
              provider,
              signature,
            })

            // If the message was not signed, keep listening without throwing an error.
            // It's possible that we detected an event from an older tx in the queue.
            // We will keep listening for the event until we detect that the message was signed
            if (messageWasSigned) resolve(msgHash)
          })
        })

        await listenToContract
        contract.removeAllListeners(contractAccount.event)
        return signature
      }
    }

    return signature
  } catch (error_) {
    let error: Error = <Error>error_
    if ((<ProviderRpcError>error_).code === 4001)
      error = new UserRejectedRequestError()
    throw error
  }
}

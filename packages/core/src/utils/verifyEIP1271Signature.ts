import { BaseProvider } from '@ethersproject/providers'
import { Contract } from 'ethers/lib/ethers'

const MAGIC_VALUE = '0x1626ba7e'
const EIP_1271_ABI = [
  'function isValidSignature(bytes32 _hash, bytes memory _signature) public view returns (bytes4 magicValue)',
]

type Args = {
  /** Contract account address */
  address: string
  /** Data to use for verifying signature */
  data: string
  /** Interface for connecting to network */
  provider: BaseProvider
  /** Signature to verify */
  signature: string
}

export const verifyEIP1271Signature = async ({
  address,
  data,
  provider,
  signature,
}: Args): Promise<boolean> => {
  try {
    const contract = new Contract(address, EIP_1271_ABI, provider)
    const returnValue = await contract['isValidSignature'](data, signature)
    console.log({ returnValue })
    return returnValue.toLowerCase() === MAGIC_VALUE.toLowerCase()
  } catch (error) {
    console.log({ error })
    return false
  }
}

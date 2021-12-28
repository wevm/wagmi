import { getAddress } from 'ethers/lib/utils'

/*
 * Returns the checksummed address if the address is valid
 */
export const isAddress = (value: any) => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

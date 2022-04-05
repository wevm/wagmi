import { BaseProvider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { Buffer } from 'buffer/'

import { resolveURI } from '../utils'

const abi = [
  'function tokenURI(uint256 tokenId) external view returns (string memory)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
]

export default class ERC721 {
  async getMetadata(
    provider: BaseProvider,
    ownerAddress: string | undefined,
    contractAddress: string,
    tokenID: string,
  ) {
    const contract = new Contract(contractAddress, abi, provider)
    const [tokenURI, owner] = await Promise.all([
      contract.tokenURI(tokenID),
      ownerAddress && contract.ownerOf(tokenID),
    ])
    if (ownerAddress && owner.toLowerCase() !== ownerAddress.toLowerCase()) {
      return null
    }

    const { uri: resolvedURI, isOnChain, isEncoded } = resolveURI(tokenURI)
    let _resolvedUri = resolvedURI
    if (isOnChain) {
      if (isEncoded) {
        _resolvedUri = Buffer.from(
          resolvedURI.replace('data:application/json;base64,', ''),
          'base64',
        ).toString()
      }
      return JSON.parse(_resolvedUri)
    }
    const response = await fetch(resolvedURI.replace(/(?:0x)?{id}/, tokenID))
    return await response?.json()
  }
}

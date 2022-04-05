import { BaseProvider } from '@ethersproject/providers'

import ERC1155 from './specs/erc1155'
import ERC721 from './specs/erc721'
import { getImageURI, parseNFT } from './utils'
import URI from './specs/uri'
import { client } from '../../../client'
import { UnsupportedNamespaceError } from '../../../errors'

export interface Spec {
  getMetadata: (
    provider: BaseProvider,
    ownerAddress: string | undefined,
    contractAddress: string,
    tokenID: string,
  ) => Promise<any>
}

export const specs: { [key: string]: new () => Spec } = Object.freeze({
  erc721: ERC721,
  erc1155: ERC1155,
})

const getMetadata = async (ens: string) => {
  // retrieve registrar address and resolver object from ens name
  const [resolvedAddress, resolver] = await Promise.all([
    client.provider.resolveName(ens),
    client.provider.getResolver(ens),
  ])
  if (!resolvedAddress || !resolver) return null

  // retrieve 'avatar' text recored from resolver
  const avatarURI = await resolver.getText('avatar')
  if (!avatarURI) return null

  // test case-insensitive in case of uppercase records
  if (!/eip155:/i.test(avatarURI)) {
    const uriSpec = new URI()
    const metadata = await uriSpec.getMetadata(avatarURI)
    return { uri: ens, ...metadata }
  }

  // parse retrieved avatar uri
  const { chainID, namespace, contractAddress, tokenID } = parseNFT(avatarURI)
  // detect avatar spec by namespace
  const Spec = specs[namespace]
  if (!Spec)
    throw new UnsupportedNamespaceError(`Unsupported namespace: ${namespace}`)
  const spec = new Spec()

  // add meta information of the avatar record
  const host_meta = {
    chain_id: chainID,
    namespace,
    contract_address: contractAddress,
    token_id: tokenID,
    reference_url: `https://opensea.io/assets/${contractAddress}/${tokenID}`,
  }

  // retrieve metadata
  const metadata = await spec.getMetadata(
    client.provider,
    resolvedAddress,
    contractAddress,
    tokenID,
  )
  return { uri: ens, host_meta, ...metadata }
}

export const fetchAvatar = async (ens: string): Promise<string | null> => {
  const metadata = await getMetadata(ens)
  if (!metadata) return null
  return getImageURI({
    metadata,
  })
}

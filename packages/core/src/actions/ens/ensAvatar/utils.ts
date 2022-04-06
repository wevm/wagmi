import { Buffer } from 'buffer/'
import xss from 'xss'
import { CID } from 'multiformats/cid'
import isSVG from 'is-svg'
import urlJoin from 'url-join'

import { NFTURIParsingError } from '../../../errors'

const IPFS_SUBPATH = '/ipfs/'
const IPNS_SUBPATH = '/ipns/'
const ipfsRegex =
  /(?<protocol>ipfs:\/|ipns:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/
const base64Regex = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/
const dataURIRegex = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*)?(,)/

// simple assert without nested check
export const assert = (condition: any, message: string) => {
  if (!condition) {
    throw message
  }
}

export const isCID = (hash: any) => {
  // check if given string or object is a valid IPFS CID
  try {
    if (typeof hash === 'string') {
      return Boolean(CID.parse(hash))
    }

    return Boolean(CID.asCID(hash))
  } catch (_error) {
    return false
  }
}

export const parseNFT = (uri: string, seperator = '/') => {
  // parse valid nft spec (CAIP-22/CAIP-29)
  // @see: https://github.com/ChainAgnostic/CAIPs/tree/master/CAIPs
  try {
    assert(uri, 'parameter URI cannot be empty')

    if (uri.startsWith('did:nft:')) {
      // convert DID to CAIP
      uri = uri.replace('did:nft:', '').replace(/_/g, '/')
    }

    const [reference, asset_namespace, tokenID] = uri.split(seperator)
    const [, chainID] = reference.split(':')
    const [namespace, contractAddress] = asset_namespace.split(':')

    assert(chainID, 'chainID not found')
    assert(contractAddress, 'contractAddress not found')
    assert(namespace, 'namespace not found')
    assert(tokenID, 'tokenID not found')

    return {
      chainID: Number(chainID),
      namespace: namespace.toLowerCase(),
      contractAddress,
      tokenID,
    }
  } catch (error) {
    throw new NFTURIParsingError(`${error as string} - ${uri}`)
  }
}

export const resolveURI = (
  uri: string,
): {
  uri: string
  isOnChain: boolean
  isEncoded: boolean
} => {
  // resolves uri based on its' protocol
  const isEncoded = base64Regex.test(uri)
  if (isEncoded || uri.startsWith('http')) {
    return { uri, isOnChain: isEncoded, isEncoded }
  }

  const ipfsGateway = 'https://ipfs.io'
  const ipfsRegexpResult = uri.match(ipfsRegex)
  const {
    protocol,
    subpath,
    target,
    subtarget = '',
  } = ipfsRegexpResult?.groups || {}
  if ((protocol === 'ipns:/' || subpath === 'ipns/') && target) {
    return {
      uri: urlJoin(ipfsGateway, IPNS_SUBPATH, target, subtarget),
      isOnChain: false,
      isEncoded: false,
    }
  } else if (isCID(target)) {
    // Assume that it's a regular IPFS CID and not an IPNS key
    return {
      uri: urlJoin(ipfsGateway, IPFS_SUBPATH, target, subtarget),
      isOnChain: false,
      isEncoded: false,
    }
  } else {
    // we may want to throw error here
    return {
      uri: uri.replace(dataURIRegex, ''),
      isOnChain: true,
      isEncoded: false,
    }
  }
}

const _sanitize = (data: string): Buffer => {
  return Buffer.from(xss(data))
}

export interface ImageURIOpts {
  metadata: any
}

export const getImageURI = ({ metadata }: ImageURIOpts) => {
  // retrieves image uri from metadata, if image is onchain then convert to base64
  const { image, image_url, image_data } = metadata

  const _image = image || image_url || image_data
  assert(_image, 'Image is not available')
  const { uri: parsedURI } = resolveURI(_image)

  if (parsedURI.startsWith('data:') || parsedURI.startsWith('http')) {
    return parsedURI
  }

  if (isSVG(parsedURI)) {
    // svg - image_data
    const data = _sanitize(parsedURI)
    return `data:image/svg+xml;base64,${data.toString('base64')}`
  }
  return null
}

import { toUtf8Bytes } from 'ethers/lib/utils'

const ensName = 'meagher.eth'

export const addressLookup = {
  addressWithEns: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  addressWithoutEns: '0x5FE6C3F8d12D5Ad1480F6DC01D8c7864Aa58C523',
  ensDefaultReverseResolver: '0xa2c122be93b0074270ebee7f6b7292c7deb45047',
  ensName,
  ensNameDoesNotExist: 'foobar.eth',
  ensNameWithAvatar: ensName,
  ensNameWithoutAvatar: 'awkweb.eth',
  ensPublicResolver: '0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41',
  ensRegistryWithFallback: '0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e',
  uniToken: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
}

export const infuraApiKey = 'mockApiKey'

export const defaultMnemonic =
  'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol'

export const messageLookup = {
  basic: 'The quick brown fox jumped over the lazy dogs.',
  bytes: toUtf8Bytes('The quick brown fox jumped over the lazy dogs.'),
}

import * as allChains from '@wagmi/chains'
import { capitalCase } from 'change-case'
import dedent from 'dedent'

import type { Contract } from '../config'

const chainMap: Record<allChains.Chain['id'], allChains.Chain> = {}
for (const chain of Object.values(allChains)) {
  if (!('id' in chain)) continue
  chainMap[chain.id] = chain
}

export function getAddressDocString({
  address,
}: {
  address: Contract['address']
}) {
  if (!address || typeof address === 'string') return ''
  if (Object.keys(address).length === 1) {
    const chain = chainMap[parseInt(Object.keys(address)[0]!)]!
    const blockExplorer = chain.blockExplorers?.default
    if (!blockExplorer) return ''
    const address_ = Object.values(address)[0]
    return `[View on ${blockExplorer.name}](${blockExplorer.url}/address/${address_})`
  }

  return dedent`
    ${Object.entries(address).reduce((prev, curr) => {
      const chain = chainMap[parseInt(curr[0])]!
      const address = curr[1]
      const blockExplorer = chain.blockExplorers?.default
      if (!blockExplorer) return prev
      return `${prev}\n* - [${capitalCase(chain.name)}](${
        blockExplorer.url
      }/address/${address})`
    }, 'View on Block Explorer:')}
  `
}

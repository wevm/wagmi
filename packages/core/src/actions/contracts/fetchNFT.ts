import type { Address, ResolvedConfig } from 'abitype'
import { formatUnits } from 'ethers/lib/utils.js'

import { erc721ABI } from '../../constants'
import { readContracts } from '../contracts'

export type FetchNFTArgs = {
  /** Address of ERC-721 token */
  address: Address
  /** ID of the token */
  id: string
  /** Chain id to use for provider */
  chainId?: number
}
export type FetchNFTResult = {
  address: Address
  name: string
  symbol: string
  uri: string
  totalSupply: {
    formatted: string
    value: ResolvedConfig['BigIntType']
  }
}

export async function fetchNFT({
  address,
  chainId,
  id,
}: FetchNFTArgs): Promise<FetchNFTResult> {
  type FetchNFT_ = {
    abi: typeof erc721ABI
  }
  async function FetchNFT_({ abi }: FetchNFT_) {
    const erc721Config = { address, abi, chainId } as const
    const [uri, name, symbol, totalSupply] = await readContracts({
      allowFailure: false,
      contracts: [
        {
          ...erc721Config,
          functionName: 'tokenURI',
          args: [id as any],
        },
        { ...erc721Config, functionName: 'name' },
        { ...erc721Config, functionName: 'symbol' },
        { ...erc721Config, functionName: 'totalSupply' },
      ],
    })

    return {
      address,
      name: name as string, // protect against `ResolvedConfig['BytesType']`
      symbol: symbol as string, // protect against `ResolvedConfig['BytesType']`
      uri: uri as string, // protect against `ResolvedConfig['BytesType']`
      totalSupply: {
        formatted: formatUnits(totalSupply, 1),
        value: totalSupply,
      },
    }
  }

  return await FetchNFT_({ abi: erc721ABI })
}

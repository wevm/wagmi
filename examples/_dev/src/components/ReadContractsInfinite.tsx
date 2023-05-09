import { stringify } from 'viem'
import { paginatedIndexesConfig, useContractInfiniteReads } from 'wagmi'

export const mlootContractConfig = {
  address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
  abi: [
    {
      inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
      name: 'tokenURI',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
  ],
} as const

export function ReadContractsInfinite() {
  const { data, isLoading, isSuccess, fetchNextPage } =
    useContractInfiniteReads({
      cacheKey: 'lootTokenURIs',
      ...paginatedIndexesConfig(
        (index: number) => [
          {
            ...mlootContractConfig,
            functionName: 'tokenURI',
            args: [BigInt(index)] as const,
          },
        ],
        { start: 0, perPage: 10, direction: 'increment' },
      ),
    })

  return (
    <div>
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <>
          {data?.pages.map((data) => (
            <div key={stringify(data)}>{stringify(data)}</div>
          ))}
          <button onClick={() => fetchNextPage()}>Fetch more</button>
        </>
      )}
    </div>
  )
}

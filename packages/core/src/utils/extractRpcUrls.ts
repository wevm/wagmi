import type { Chain, Transport } from 'viem'

type ExtractRpcUrlsParameters = {
  transports?: Record<string, Transport> | undefined
  chain: Chain
}

export function extractRpcUrls(parameters: ExtractRpcUrlsParameters) {
  const { chain } = parameters
  const fallbackUrl = chain.rpcUrls.default.http[0]

  if (!parameters.transports) return [fallbackUrl]

  const transport = parameters.transports?.[chain.id]?.({ chain })
  const transports = transport?.value?.transports || [transport]
  return transports.map(
    ({ value }: { value: { url: string } }) => value.url || fallbackUrl,
  )
}

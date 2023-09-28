import { useBlockNumber } from 'wagmi'

export function BlockNumber() {
  const { data } = useBlockNumber({ watch: true })
  return <div>{data?.toString()}</div>
}

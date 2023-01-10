import { useBlockNumber } from 'wagmi'

export const BlockNumber = () => {
  const { data } = useBlockNumber({ watch: true })
  return <div>{data}</div>
}

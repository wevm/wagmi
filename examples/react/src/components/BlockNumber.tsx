import { useBlockNumber } from 'wagmi-react'

export const BlockNumber = () => {
  const { data } = useBlockNumber({ watch: true })
  return <div>{data}</div>
}

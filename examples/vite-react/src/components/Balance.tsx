import { useBalance } from 'wagmi'

export const Balance = () => {
  const { data } = useBalance({ addressOrName: 'moxey.eth', watch: true })
  return <div>{data?.formatted}</div>
}

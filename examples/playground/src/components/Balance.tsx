import { useBalance } from 'wagmi'

export const Balance = () => {
  const { data } = useBalance({
    addressOrName: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
    watch: true,
  })
  return <div>{data?.formatted}</div>
}

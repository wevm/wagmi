import { Data, WagmiClient, wagmiClient } from '../../client'

export type AccountResult = {
  address?: Data['account']
  connector?: WagmiClient['connector']
}

export function getAccount(): AccountResult {
  const { data, connector } = wagmiClient
  return {
    address: data?.account,
    connector,
  }
}

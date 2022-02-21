import { Data, WagmiClient, wagmiClient } from '../client'

export type AccountReturnData = {
  address?: Data['account']
  connector?: WagmiClient['connector']
}

export function getAccount(): AccountReturnData {
  const { data, connector } = wagmiClient
  return {
    address: data?.account,
    connector,
  }
}

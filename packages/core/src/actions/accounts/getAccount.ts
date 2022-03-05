import { Data, WagmiClient, wagmiClient } from '../../client'

export type GetAccountResult = {
  address?: Data['account']
  connector?: WagmiClient['connector']
}

export function getAccount(): GetAccountResult {
  const { data, connector } = wagmiClient
  return {
    address: data?.account,
    connector,
  }
}

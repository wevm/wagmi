import { Client, Data, client } from '../../client'

export type GetAccountResult = {
  address?: Data['account']
  connector?: Client['connector']
}

export function getAccount(): GetAccountResult {
  const { data, connector } = client
  return {
    address: data?.account,
    connector,
  }
}

import { Client, Data, getClient } from '../../client'
import { Provider } from '../../types'

export type GetAccountResult<TProvider extends Provider = Provider> = {
  address?: Data<TProvider>['account']
  connector?: Client<TProvider>['connector']
}

export function getAccount<
  TProvider extends Provider,
>(): GetAccountResult<TProvider> {
  const { data, connector } = getClient()
  return {
    address: data?.account,
    connector,
  }
}

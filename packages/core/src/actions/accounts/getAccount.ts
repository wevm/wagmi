import { providers } from 'ethers'

import { Client, Data, getClient } from '../../client'

export type GetAccountResult<
  TProvider extends providers.BaseProvider = providers.BaseProvider,
> = {
  address?: Data<TProvider>['account']
  connector?: Client<TProvider>['connector']
}

export function getAccount<
  TProvider extends providers.BaseProvider,
>(): GetAccountResult<TProvider> {
  const { data, connector } = getClient()
  return {
    address: data?.account,
    connector,
  }
}

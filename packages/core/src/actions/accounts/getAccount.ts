import type { BaseProvider } from '@ethersproject/providers'

import { Client, Data, getClient } from '../../client'

export type GetAccountResult<TProvider extends BaseProvider = BaseProvider> = {
  address?: Data<TProvider>['account']
  connector?: Client<TProvider>['connector']
}

export function getAccount<
  TProvider extends BaseProvider,
>(): GetAccountResult<TProvider> {
  const { data, connector } = getClient()
  return {
    address: data?.account,
    connector,
  }
}

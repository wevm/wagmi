import * as React from 'react'
import { BaseProvider } from '@ethersproject/providers'

import { useClient } from '../../context'
import { useForceUpdate } from '../utils'

export function useProvider<TProvider extends BaseProvider>() {
  const forceUpdate = useForceUpdate()
  const client = useClient<TProvider>()

  React.useEffect(() => {
    const unsubscribe = client.subscribe((state) => state.provider, forceUpdate)
    return unsubscribe
  }, [client, forceUpdate])

  return client.provider
}

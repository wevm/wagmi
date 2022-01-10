import * as React from 'react'
import { Signer } from 'ethers'

import { useAccount } from '../accounts'

type State = {
  data?: Signer
  error?: Error
  loading?: boolean
}

const initialState: State = {
  data: undefined,
  error: undefined,
  loading: false,
}

export const useSigner = () => {
  const [{ data: account }] = useAccount()
  const [state, setState] = React.useState<State>(initialState)

  /* eslint-disable react-hooks/exhaustive-deps */
  const getSigner = React.useCallback(async () => {
    setState((x) => ({ ...x, error: undefined, loading: true }))

    try {
      const signer = await account?.connector?.getSigner()
      setState((x) => ({ ...x, data: signer, loading: false }))

      return signer
    } catch (error_) {
      const error = <Error>error_
      setState((x) => ({ ...x, data: undefined, error, loading: false }))
    }
  }, [account?.address, account?.connector])
  /* eslint-enable react-hooks/exhaustive-deps */

  React.useEffect(() => {
    getSigner()
  }, [getSigner])

  return [state, getSigner] as const
}

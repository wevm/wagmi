import * as React from 'react'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

import { useIsMounted } from '../hooks'
import { Balance } from './Balance'
import { BlockNumber } from './BlockNumber'
import { ReadContract } from './ReadContract'
import { SendTransaction } from './SendTransaction'
import { SignMessage } from './SignMessage'
import { Token } from './Token'
import { WriteContract } from './WriteContract'

export const Account = () => {
  const isMounted = useIsMounted()
  const account = useAccount()
  const ensAvatar = useEnsAvatar({
    addressOrName: account.data?.address,
  })
  const ensName = useEnsName({ address: account.data?.address })
  const disconnect = useDisconnect()

  return (
    <div>
      <div>
        {ensName.data ?? account.data?.address}
        {ensName.data ? ` (${account.data?.address})` : null}
      </div>

      {ensAvatar.data && (
        <img src={ensAvatar.data} style={{ height: 40, width: 40 }} />
      )}

      <div>
        {account.data?.address && (
          <button onClick={() => disconnect.disconnect()}>Disconnect</button>
        )}
        {isMounted && account.data?.connector?.name && (
          <span>Connected to {account.data.connector.name}</span>
        )}
      </div>

      {false && (
        <>
          {true && (
            <>
              <h4>Balance</h4>
              <Balance />

              <h4>Block Number</h4>
              <BlockNumber />

              <h4>Send Transaction</h4>
              <SendTransaction />
            </>
          )}

          <h4>Read Contract</h4>
          <ReadContract />

          {true && (
            <>
              <h4>Write Contract</h4>
              <WriteContract />

              <h4>Sign Message</h4>
              <SignMessage />

              <h4>Token</h4>
              <Token />
            </>
          )}
        </>
      )}
    </div>
  )
}

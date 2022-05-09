import * as React from 'react'
import { Avatar, Box, Button, Skeleton, Stack } from 'degen'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

import { formatAddress } from '../../lib/address'
import { useIsMounted } from '../../hooks'

export function Account() {
  const isMounted = useIsMounted()
  const { data: accountData } = useAccount()
  const { data: ensNameData } = useEnsName({
    address: accountData?.address,
    chainId: 1,
  })
  const { data: ensAvatarData } = useEnsAvatar({
    addressOrName: accountData?.address,
    chainId: 1,
  })
  const { disconnect } = useDisconnect()

  if (!accountData?.address || !isMounted) return null

  const formattedAddress = formatAddress(accountData.address)

  return (
    <Stack
      align="center"
      direction={{ xs: 'vertical', sm: 'horizontal' }}
      justify="space-between"
    >
      <Stack align="center" direction={{ xs: 'vertical', sm: 'horizontal' }}>
        <Avatar
          src={ensAvatarData as any}
          label="ENS Avatar"
          placeholder={!ensAvatarData}
        />
        <Stack space="0">
          <Box fontSize="large" textAlign={{ xs: 'center', sm: 'left' }}>
            {ensNameData
              ? `${ensNameData} (${formattedAddress})`
              : formattedAddress}
          </Box>
          <Box
            fontSize="small"
            color="textSecondary"
            textAlign={{ xs: 'center', sm: 'left' }}
            display="flex"
            gap="1"
          >
            Connected to{' '}
            <Skeleton loading={!(isMounted && accountData?.connector)}>
              {isMounted && accountData?.connector
                ? accountData.connector.name
                : 'Wallet Name'}
            </Skeleton>
          </Box>
        </Stack>
      </Stack>

      <Button variant="secondary" onClick={() => disconnect()}>
        Disconnect
      </Button>
    </Stack>
  )
}

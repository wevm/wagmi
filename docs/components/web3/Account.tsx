import * as React from 'react'
import { Avatar, Box, Button, Skeleton, Stack } from 'degen'
import { useAccount, useDisconnect } from 'wagmi'

import { formatAddress } from '../../lib/address'
import { useIsMounted } from '../../hooks'

export function Account() {
  const isMounted = useIsMounted()
  const { data } = useAccount({ ens: true })
  const { disconnect } = useDisconnect()

  if (!data || !isMounted) return null

  const formattedAddress = formatAddress(data.address)

  return (
    <Stack
      align="center"
      direction={{ xs: 'vertical', sm: 'horizontal' }}
      justify="space-between"
    >
      <Stack align="center" direction={{ xs: 'vertical', sm: 'horizontal' }}>
        <Avatar
          src={data?.ens?.avatar as any}
          label="ENS Avatar"
          placeholder={!data?.ens?.avatar}
        />
        <Stack space="0">
          <Box fontSize="large" textAlign={{ xs: 'center', sm: 'left' }}>
            {data?.ens?.name
              ? `${data.ens?.name} (${formattedAddress})`
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
            <Skeleton loading={!(isMounted && data?.connector)}>
              {isMounted && data?.connector
                ? data.connector.name
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

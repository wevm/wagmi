import * as React from 'react'
import { Avatar, Box, Button, Stack } from 'degen'
import { useAccount } from 'wagmi'

import { formatAddress } from '../../lib/address'

export const Account = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })

  if (!accountData) return null

  const formattedAddress = formatAddress(accountData.address)
  return (
    <Stack
      align="center"
      direction={{ xs: 'vertical', sm: 'horizontal' }}
      justify="space-between"
    >
      <Stack align="center" direction={{ xs: 'vertical', sm: 'horizontal' }}>
        <Avatar
          src={accountData.ens?.avatar as any}
          label="ENS Avatar"
          placeholder={!accountData.ens?.avatar}
        />
        <Stack space="0">
          <Box fontSize="large" textAlign={{ xs: 'center', sm: 'left' }}>
            {accountData.ens?.name
              ? `${accountData.ens?.name} (${formattedAddress})`
              : formattedAddress}
          </Box>
          {accountData.connector?.name && (
            <Box
              fontSize="small"
              color="textSecondary"
              textAlign={{ xs: 'center', sm: 'left' }}
            >
              Connected to {accountData.connector.name}
            </Box>
          )}
        </Stack>
      </Stack>

      <Button variant="secondary" onClick={disconnect}>
        Disconnect
      </Button>
    </Stack>
  )
}

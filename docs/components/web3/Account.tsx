import { Avatar, Box, Button, Skeleton, Stack } from 'degen'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

import { useIsMounted } from '../../hooks'
import { formatAddress } from '../../lib/address'

export function Account() {
  const isMounted = useIsMounted()
  const { address, connector } = useAccount()
  const { data: ensNameData } = useEnsName({
    address,
    chainId: 1,
  })
  const { data: ensAvatarData } = useEnsAvatar({
    address,
    chainId: 1,
  })
  const { disconnect } = useDisconnect()

  if (!address || !isMounted) return null

  const formattedAddress = formatAddress(address)

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
            <Skeleton loading={!(isMounted && connector)}>
              {isMounted && connector ? connector.name : 'Wallet Name'}
            </Skeleton>
          </Box>
        </Stack>
      </Stack>

      <Button variant="secondary" onClick={() => disconnect()} type="button">
        Disconnect
      </Button>
    </Stack>
  )
}

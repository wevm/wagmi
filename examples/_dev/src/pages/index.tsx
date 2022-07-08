import * as React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { dehydrate, prefetchEnsName } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'
import { client } from '../wagmi'

type ServerProps = {
  dehydratedState: unknown
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  _context,
) => {
  client.setState((x) => ({
    ...x,
    data: {
      account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      chain: {
        id: 1,
        unsupported: false,
      },
    },
  }))
  const address = client.data?.account
  const chainId = client.data?.chain?.id
  if (address && chainId) await prefetchEnsName(client, { address, chainId })

  return {
    props: {
      dehydratedState: dehydrate(client),
    },
  }
}

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

const Page = (_props: Props) => {
  return (
    <>
      <Connect />
      <Account />
      <NetworkSwitcher />
    </>
  )
}

export default Page

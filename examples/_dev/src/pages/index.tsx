import * as React from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { dehydrate, prefetchEnsName } from 'wagmi'
import { parseCookies } from 'nookies'

import { Account, Connect, NetworkSwitcher } from '../components'
import { client } from '../wagmi'

type ServerProps = {
  dehydratedState: unknown
}

function extractState(client: any, cookies: any) {
  let store: {
    state: {
      data?: { account?: string; chain?: { id: number; unsupported: boolean } }
    }
  } = { state: {} }
  try {
    const key = client.storage.getKey('store')
    store = JSON.parse(cookies[key] ?? '{}')
    // eslint-disable-next-line no-empty
  } catch (error) {}
  client.setState((x: any) => ({ ...x, ...store.state }))
  return store.state
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context,
) => {
  const cookies = parseCookies(context)
  const state = extractState(client, cookies)
  const address = state.data?.account
  if (address) await prefetchEnsName(client, { address, chainId: 1 })

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

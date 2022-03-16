import * as React from 'react'

import { Account, Connect } from '../components'
import { useIsMounted } from '../hooks'

const Page = () => {
  const isMounted = useIsMounted()
  if (!isMounted) return null

  return (
    <>
      <Connect />
      <Account />
    </>
  )
}

export default Page

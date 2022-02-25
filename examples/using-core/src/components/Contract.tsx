import { watchContractEvent } from '@wagmi/core'
import React, { useEffect, useState } from 'react'

import ensRegistryABI from './ens-abi.json'

export default function Contract() {
  const [owner, setOwner] = useState()
  useEffect(() => {
    const unwatch = watchContractEvent(
      {
        addressOrName: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
        contractInterface: ensRegistryABI,
      },
      'NewOwner',
      (_node, _label, owner) => setOwner(owner),
    )
    return unwatch
  }, [])
  return <div>New owner: {owner}</div>
}

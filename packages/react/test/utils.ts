import { act } from '@testing-library/react'
import { Contract } from 'ethers'

import { MockConnector } from '@wagmi/core/connectors/mock'
import {
  Connector,
  Provider,
  WebSocketProvider,
  defaultChains,
} from '@wagmi/core'

import { getProvider, getSigners } from '../../core/test/utils'
import { renderHook } from '.'
import { CreateClientConfig, createClient } from '../src'
import {
  UseAccountConfig,
  useAccount as useAccount_,
} from '../src/hooks/accounts/useAccount'
import { useNetwork as useNetwork_ } from '../src/hooks/accounts/useNetwork'

type Config = Partial<CreateClientConfig>

export function setupClient(config: Config = {}) {
  return createClient<Provider, WebSocketProvider>({
    connectors: [
      new MockConnector({
        options: {
          signer: getSigners()[0]!,
        },
      }),
    ],
    provider: ({ chainId }) => getProvider({ chainId, chains: defaultChains }),
    ...config,
  })
}

export async function actConnect(config: {
  chainId?: number
  connector?: Connector
  utils: ReturnType<typeof renderHook>
}) {
  const connector = config.connector
  const getConnect = (utils: ReturnType<typeof renderHook>) =>
    (utils.result.current as any)?.connect || utils.result.current
  const utils = config.utils

  await act(async () => {
    const connect = getConnect(utils)
    await connect.connectAsync?.({
      chainId: config.chainId,
      connector: connector ?? connect.connectors?.[0],
    })
  })

  const { waitFor } = utils
  await waitFor(() => expect(getConnect(utils).isSuccess).toBeTruthy())
}

export async function actDisconnect(config: {
  utils: ReturnType<typeof renderHook>
}) {
  const getDisconnect = (utils: ReturnType<typeof renderHook>) =>
    (utils.result.current as any)?.disconnect || utils.result.current
  const utils = config.utils

  await act(async () => {
    const disconnect = getDisconnect(utils)
    disconnect.disconnectAsync?.()
  })

  const { waitFor } = utils
  await waitFor(() => expect(getDisconnect(utils).isSuccess).toBeTruthy())
}

export async function actSwitchNetwork(config: {
  chainId: number
  utils: ReturnType<typeof renderHook>
}) {
  const chainId = config.chainId
  const getNetwork = (utils: ReturnType<typeof renderHook>) =>
    (utils.result.current as any)?.switchNetwork || utils.result.current
  const utils = config.utils

  await act(async () => {
    getNetwork(utils).switchNetwork(chainId)
  })

  const { waitFor } = utils
  await waitFor(() => expect(getNetwork(utils).isSuccess).toBeTruthy())
}

export async function getUnclaimedTokenId(
  addressOrName: string,
  maxAttempts = 3,
) {
  function getRandomTokenId(from: number, to: number) {
    return Math.floor(Math.random() * to) + from
  }

  let attempts = 0
  const provider = getProvider()
  const contract = new Contract(
    addressOrName,
    [
      'function ownerOf(uint256 _tokenId) external view returns (address)',
      'function totalSupply() view returns (uint256)',
    ],
    provider,
  )
  const totalSupply = await contract.totalSupply()
  while (attempts < maxAttempts) {
    const randomTokenId = getRandomTokenId(1, totalSupply)
    try {
      await contract.ownerOf(randomTokenId)
    } catch (error) {
      return randomTokenId
    }
    attempts += 1
  }
  return false
}

/**
 * `renderHook` in `@testing-library/react` doesn't play well
 * with tracked values, so we need to use custom hooks.
 */

export function useAccount(config: UseAccountConfig = {}) {
  const { ...values } = useAccount_(config)
  return values
}

export function useNetwork() {
  const { ...values } = useNetwork_()
  return values
}

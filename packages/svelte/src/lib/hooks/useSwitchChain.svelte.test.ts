// useSwitchChain.svelte.test.ts
import { connect, disconnect } from '@wagmi/core'
import { chain, config } from '@wagmi/test'
import { expect, test, vi } from 'vitest'
import { testHook } from './test.svelte.js'
import { useAccount } from './useAccount.svelte.js'
import { useSwitchChain } from './useSwitchChain.svelte.js'

const connector = config.connectors[0]!

test(
  'default',
  testHook(async () => {
    await connect(config, { connector })

    const account = $derived.by(useAccount())
    const switchChain = $derived.by(useSwitchChain())

    const chainId1 = account.chainId
    expect(chainId1).toBeDefined()

    switchChain.switchChain({ chainId: chain.mainnet2.id })
    await expect.poll(() => switchChain.isSuccess).toBeTruthy()

    const chainId2 = account.chainId
    expect(chainId2).toBeDefined()
    expect(chainId1).not.toBe(chainId2)

    switchChain.switchChain({ chainId: chain.mainnet.id })
    await expect.poll(() => switchChain.isSuccess).toBeTruthy()

    const chainId3 = account.chainId
    expect(chainId3).toBeDefined()
    expect(chainId1).toBe(chainId3)

    await disconnect(config, { connector })
  }),
)

test(
  'behavior: chains updates',
  testHook(async () => {
    const switchChain = $derived.by(useSwitchChain())

    const chains = switchChain.chains

    expect(
      switchChain.chains.map(({ id, name }) => ({
        id,
        name,
      })),
    ).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "name": "Ethereum",
        },
        {
          "id": 456,
          "name": "Ethereum",
        },
        {
          "id": 10,
          "name": "OP Mainnet",
        },
      ]
    `)

    config._internal.chains.setState([chain.mainnet, chain.mainnet2])

    await vi.waitFor(() => switchChain.isSuccess)
    expect(
      switchChain.chains.map(({ id, name }) => ({
        id,
        name,
      })),
    ).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "name": "Ethereum",
        },
        {
          "id": 456,
          "name": "Ethereum",
        },
      ]
    `)

    config._internal.chains.setState(chains)

    expect(
      switchChain.chains.map(({ id, name }) => ({
        id,
        name,
      })),
    ).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "name": "Ethereum",
        },
        {
          "id": 456,
          "name": "Ethereum",
        },
        {
          "id": 10,
          "name": "OP Mainnet",
        },
      ]
    `)
  }),
)

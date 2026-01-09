import { connect, getConnectorClient } from '@wagmi/core'
import {
  accounts,
  addresses,
  config,
  queryClient,
  viem_setupPoolWithLiquidity,
} from '@wagmi/test/tempo'
import { parseUnits } from 'viem'
import { describe, expect, test } from 'vitest'
import * as ammActions from './amm.js'
import * as tokenActions from './token.js'

const account = accounts[0]

describe('getPool', () => {
  test('default', async () => {
    const pool = await ammActions.getPool(config, {
      userToken: addresses.alphaUsd,
      validatorToken: '0x20c0000000000000000000000000000000000001',
    })
    expect(pool).toMatchInlineSnapshot(`
      {
        "reserveUserToken": 0n,
        "reserveValidatorToken": 0n,
        "totalSupply": 0n,
      }
    `)
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const options = ammActions.getPool.queryOptions(config, {
        userToken: addresses.alphaUsd,
        validatorToken: '0x20c0000000000000000000000000000000000001',
      })
      const pool = await queryClient.fetchQuery(options)
      expect(pool).toMatchInlineSnapshot(`
        {
          "reserveUserToken": 0n,
          "reserveValidatorToken": 0n,
          "totalSupply": 0n,
        }
      `)
    })
  })
})

describe('getLiquidityBalance', () => {
  test('default', async () => {
    const balance = await ammActions.getLiquidityBalance(config, {
      userToken: addresses.alphaUsd,
      validatorToken: '0x20c0000000000000000000000000000000000001',
      address: account.address,
    })
    expect(balance).toMatchInlineSnapshot('0n')
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const options = ammActions.getLiquidityBalance.queryOptions(config, {
        userToken: addresses.alphaUsd,
        validatorToken: '0x20c0000000000000000000000000000000000001',
        address: account.address,
      })
      const balance = await queryClient.fetchQuery(options)
      expect(balance).toMatchInlineSnapshot('0n')
    })
  })
})

describe('mintSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token for testing
    const { token } = await tokenActions.createSync(config, {
      name: 'Test Token',
      symbol: 'TEST',
      currency: 'USD',
    })

    // Grant issuer role to mint tokens
    await tokenActions.grantRolesSync(config, {
      token,
      roles: ['issuer'],
      to: account.address,
    })

    // Mint some tokens to account
    await tokenActions.mintSync(config, {
      to: account.address,
      amount: parseUnits('1000', 6),
      token,
    })

    // Add liquidity to pool
    const { receipt: mintReceipt, ...mintResult } = await ammActions.mintSync(
      config,
      {
        userTokenAddress: token,
        validatorTokenAddress: addresses.alphaUsd,
        validatorTokenAmount: parseUnits('100', 6),
        to: account.address,
      },
    )
    expect(mintReceipt).toBeDefined()
    expect(mintResult.amountValidatorToken).toBe(100000000n)
    expect(mintResult.liquidity).toBe(49999000n)
    expect(mintResult.sender).toBe(account.address)
    expect(mintResult.to).toBe(account.address)
    expect(mintResult.validatorToken.toLowerCase()).toBe(
      addresses.alphaUsd.toLowerCase(),
    )
  })
})

describe.skip('burnSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const client = await getConnectorClient(config)
    const { tokenAddress } = await viem_setupPoolWithLiquidity(client)

    const account2 = accounts[1]

    // Get LP balance before burn
    const lpBalanceBefore = await ammActions.getLiquidityBalance(config, {
      userToken: tokenAddress,
      validatorToken: addresses.alphaUsd,
      address: account.address,
    })

    // TODO(TEMPO-1183): Remove this janky fix to get some user token in the pool
    await tokenActions.transferSync(config, {
      to: account2.address,
      amount: 600n,
      token: tokenAddress,
      feeToken: tokenAddress,
    })

    // Burn half of LP tokens
    const { receipt: burnReceipt, ...burnResult } = await ammActions.burnSync(
      config,
      {
        userToken: tokenAddress,
        validatorToken: addresses.alphaUsd,
        liquidity: lpBalanceBefore / 2n,
        to: account.address,
      },
    )
    expect(burnReceipt).toBeDefined()
    expect(burnResult).toMatchInlineSnapshot(`
      {
        "amountUserToken": 337n,
        "amountValidatorToken": 49998664n,
        "liquidity": 24999500n,
        "sender": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "userToken": "0x20c0000000000000000000000000000000000005",
        "validatorToken": "0x20C0000000000000000000000000000000000001",
      }
    `)
  })
})

describe.skip('rebalanceSwapSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const client = await getConnectorClient(config)
    const { tokenAddress } = await viem_setupPoolWithLiquidity(client)

    const account2 = accounts[1]

    // TODO(TEMPO-1183): Remove this janky fix to get some user token in the pool
    await tokenActions.transferSync(config, {
      to: account2.address,
      amount: 600n,
      token: tokenAddress,
      feeToken: tokenAddress,
    })

    // Perform rebalance swap
    const { receipt: swapReceipt, ...swapResult } =
      await ammActions.rebalanceSwapSync(config, {
        userToken: tokenAddress,
        validatorToken: addresses.alphaUsd,
        amountOut: 100n,
        to: account2.address,
      })
    expect(swapReceipt).toBeDefined()
    expect(swapResult).toMatchInlineSnapshot(`
      {
        "amountIn": 100n,
        "amountOut": 100n,
        "swapper": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "userToken": "0x20C0000000000000000000000000000000000006",
        "validatorToken": "0x20C0000000000000000000000000000000000001",
      }
    `)
  })
})

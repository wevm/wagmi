import { connect } from '@wagmi/core'
import { accounts, addresses, config, queryClient } from '@wagmi/test/tempo'
import { parseUnits } from 'viem'
import { describe, expect, test, vi } from 'vitest'
import * as token from './token.js'

const account = accounts[0]
const account2 = accounts[1]

describe('getAllowance', () => {
  test('default', async () => {
    const allowance = await token.getAllowance(config, {
      account: account.address,
      spender: account2.address,
      token: addresses.alphaUsd,
    })
    expect(allowance).toBeDefined()
    expect(typeof allowance).toBe('bigint')
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const options = token.getAllowance.queryOptions(config, {
        account: account.address,
        spender: account2.address,
        token: addresses.alphaUsd,
      })
      const allowance = await queryClient.fetchQuery(options)
      expect(allowance).toBeDefined()
      expect(typeof allowance).toBe('bigint')
    })
  })
})

describe('getBalance', () => {
  test('default', async () => {
    const balance = await token.getBalance(config, {
      account: account.address,
      token: addresses.alphaUsd,
    })
    expect(balance).toBeDefined()
    expect(typeof balance).toBe('bigint')
    expect(balance).toBeGreaterThan(0n)
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const options = token.getBalance.queryOptions(config, {
        account: account.address,
        token: addresses.alphaUsd,
      })
      const balance = await queryClient.fetchQuery(options)
      expect(balance).toBeDefined()
      expect(typeof balance).toBe('bigint')
      expect(balance).toBeGreaterThan(0n)
    })
  })
})

describe('getMetadata', () => {
  test('default', async () => {
    const metadata = await token.getMetadata(config, {
      token: addresses.alphaUsd,
    })
    expect(metadata).toBeDefined()
    expect(metadata).toMatchInlineSnapshot(`
      {
        "currency": "USD",
        "decimals": 6,
        "name": "AlphaUSD",
        "paused": false,
        "quoteToken": "0x20C0000000000000000000000000000000000000",
        "supplyCap": 340282366920938463463374607431768211455n,
        "symbol": "AlphaUSD",
        "totalSupply": 202914184810805067765n,
        "transferPolicyId": 1n,
      }
    `)
  })

  describe('queryOptions', () => {
    test('default', async () => {
      const options = token.getMetadata.queryOptions(config, {
        token: addresses.alphaUsd,
      })
      const metadata = await queryClient.fetchQuery(options)
      expect(metadata).toBeDefined()
      expect(metadata).toMatchInlineSnapshot(`
        {
          "currency": "USD",
          "decimals": 6,
          "name": "AlphaUSD",
          "paused": false,
          "quoteToken": "0x20C0000000000000000000000000000000000000",
          "supplyCap": 340282366920938463463374607431768211455n,
          "symbol": "AlphaUSD",
          "totalSupply": 202914184810805067765n,
          "transferPolicyId": 1n,
        }
      `)
    })
  })
})

describe('getRoleAdmin', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a token where we're the admin
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'GetRoleAdmin Test',
      symbol: 'GRATEST',
    })

    const adminRole = await token.getRoleAdmin(config, {
      token: tokenAddr,
      role: 'issuer',
    })
    expect(adminRole).toBeDefined()
    expect(typeof adminRole).toBe('string')
    expect(adminRole).toBe(
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    )
  })

  describe('queryOptions', () => {
    test('default', async () => {
      await connect(config, {
        connector: config.connectors[0]!,
      })

      // Create a token where we're the admin
      const { token: tokenAddr } = await token.createSync(config, {
        currency: 'USD',
        name: 'GetRoleAdmin Query Test',
        symbol: 'GRAQTEST',
      })

      const options = token.getRoleAdmin.queryOptions(config, {
        token: tokenAddr,
        role: 'issuer',
      })
      const adminRole = await queryClient.fetchQuery(options)
      expect(adminRole).toBeDefined()
      expect(typeof adminRole).toBe('string')
      expect(adminRole).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      )
    })
  })
})

describe('hasRole', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a token where we're the admin
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'HasRole Test',
      symbol: 'HRTEST',
    })

    const result = await token.hasRole(config, {
      token: tokenAddr,
      account: account.address,
      role: 'defaultAdmin',
    })
    expect(result).toBeDefined()
    expect(typeof result).toBe('boolean')
    expect(result).toBe(true)
  })

  describe('queryOptions', () => {
    test('default', async () => {
      await connect(config, {
        connector: config.connectors[0]!,
      })

      // Create a token where we're the admin
      const { token: tokenAddr } = await token.createSync(config, {
        currency: 'USD',
        name: 'HasRole Query Test',
        symbol: 'HRQTEST',
      })

      const options = token.hasRole.queryOptions(config, {
        token: tokenAddr,
        account: account.address,
        role: 'defaultAdmin',
      })
      const result = await queryClient.fetchQuery(options)
      expect(result).toBeDefined()
      expect(typeof result).toBe('boolean')
      expect(result).toBe(true)
    })
  })
})

describe('approve', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    const hash = await token.approve(config, {
      amount: parseUnits('100', 6),
      spender: account2.address,
      token: addresses.alphaUsd,
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('approveSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    const { receipt, ...result } = await token.approveSync(config, {
      amount: parseUnits('100', 6),
      spender: account2.address,
      token: addresses.alphaUsd,
    })
    expect(receipt).toBeDefined()
    expect(result).toMatchInlineSnapshot(`
      {
        "amount": 100000000n,
        "owner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "spender": "0x8C8d35429F74ec245F8Ef2f4Fd1e551cFF97d650",
      }
    `)
  })
})

describe('transfer', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    const hash = await token.transfer(config, {
      amount: parseUnits('1', 6),
      to: account2.address,
      token: addresses.alphaUsd,
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('transferSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    const { receipt, ...result } = await token.transferSync(config, {
      amount: parseUnits('1', 6),
      to: account2.address,
      token: addresses.alphaUsd,
    })
    expect(receipt).toBeDefined()
    expect(result).toMatchInlineSnapshot(`
      {
        "amount": 1000000n,
        "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "to": "0x8C8d35429F74ec245F8Ef2f4Fd1e551cFF97d650",
      }
    `)
  })
})

describe('mint', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token where we're the admin
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Mintable Token',
      symbol: 'MINT',
    })

    // Grant issuer role
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })

    const hash = await token.mint(config, {
      token: tokenAddr,
      to: account.address,
      amount: parseUnits('100', 6),
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('mintSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token where we're the admin
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Mintable Token Sync',
      symbol: 'MINTSYNC',
    })

    // Grant issuer role
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })

    const { receipt, ...result } = await token.mintSync(config, {
      token: tokenAddr,
      to: account.address,
      amount: parseUnits('100', 6),
    })
    expect(receipt).toBeDefined()
    expect(result).toMatchInlineSnapshot(`
      {
        "amount": 100000000n,
        "to": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      }
    `)
  })
})

describe('burn', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token where we're the admin
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Burnable Token',
      symbol: 'BURN',
    })

    // Grant issuer role
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })

    // Mint some tokens first
    await token.mintSync(config, {
      token: tokenAddr,
      to: account.address,
      amount: parseUnits('1000', 6),
    })

    const hash = await token.burn(config, {
      token: tokenAddr,
      amount: parseUnits('1', 6),
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('burnSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token where we're the admin
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Burnable Token Sync',
      symbol: 'BURNSYNC',
    })

    // Grant issuer role
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })

    // Mint some tokens first
    await token.mintSync(config, {
      token: tokenAddr,
      to: account.address,
      amount: parseUnits('1000', 6),
    })

    const { receipt, ...result } = await token.burnSync(config, {
      token: tokenAddr,
      amount: parseUnits('1', 6),
    })
    expect(receipt).toBeDefined()
    expect(result).toMatchInlineSnapshot(`
      {
        "amount": 1000000n,
        "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      }
    `)
  })
})

describe('create', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    const hash = await token.create(config, {
      name: 'Test Token',
      symbol: 'TEST',
      currency: 'USD',
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('createSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })
    const { receipt, ...result } = await token.createSync(config, {
      name: 'Test Token',
      symbol: 'TEST',
      currency: 'USD',
    })
    expect(receipt).toBeDefined()
    expect(result.token).toBeDefined()
    expect(result.tokenId).toBeDefined()
    expect(result.name).toBe('Test Token')
    expect(result.symbol).toBe('TEST')
    expect(result.currency).toBe('USD')
    expect(result.admin).toBe(account.address)
  })
})

describe.todo('burnBlocked')

describe.todo('burnBlockedSync')

describe('changeTransferPolicy', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Policy Token',
      symbol: 'POLICY',
    })

    const hash = await token.changeTransferPolicy(config, {
      token: tokenAddr,
      policyId: 0n,
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('changeTransferPolicySync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Policy Token Sync',
      symbol: 'POLICYSYNC',
    })

    const { receipt, ...result } = await token.changeTransferPolicySync(
      config,
      {
        token: tokenAddr,
        policyId: 0n,
      },
    )
    expect(receipt).toBeDefined()
    expect(result).toMatchInlineSnapshot(`
      {
        "newPolicyId": 0n,
        "updater": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      }
    `)
  })
})

describe('grantRoles', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Grant Roles Token',
      symbol: 'GRANT',
    })

    const hash = await token.grantRoles(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account2.address,
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('grantRolesSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Grant Roles Token Sync',
      symbol: 'GRANTSYNC',
    })

    const { receipt, value } = await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account2.address,
    })
    expect(receipt).toBeDefined()
    expect(value).toBeDefined()
    expect(value.length).toBe(1)
    expect(value[0]?.account).toBe(account2.address)
    expect(value[0]?.hasRole).toBe(true)
  })
})

describe('pause', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Pausable Token',
      symbol: 'PAUSE',
    })

    // Grant pause role
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['pause'],
      to: account.address,
    })

    const hash = await token.pause(config, {
      token: tokenAddr,
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('pauseSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Pausable Token Sync',
      symbol: 'PAUSESYNC',
    })

    // Grant pause role
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['pause'],
      to: account.address,
    })

    const { receipt, ...result } = await token.pauseSync(config, {
      token: tokenAddr,
    })
    expect(receipt).toBeDefined()
    expect(result).toMatchInlineSnapshot(`
      {
        "isPaused": true,
        "updater": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      }
    `)
  })
})

describe('unpause', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Unpausable Token',
      symbol: 'UNPAUSE',
    })

    // Grant pause and unpause roles
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['pause', 'unpause'],
      to: account.address,
    })

    // First pause it
    await token.pauseSync(config, {
      token: tokenAddr,
    })

    const hash = await token.unpause(config, {
      token: tokenAddr,
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('unpauseSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Unpausable Token Sync',
      symbol: 'UNPAUSESYNC',
    })

    // Grant pause and unpause roles
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['pause', 'unpause'],
      to: account.address,
    })

    // First pause it
    await token.pauseSync(config, {
      token: tokenAddr,
    })

    const { receipt, ...result } = await token.unpauseSync(config, {
      token: tokenAddr,
    })
    expect(receipt).toBeDefined()
    expect(result).toMatchInlineSnapshot(`
      {
        "isPaused": false,
        "updater": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      }
    `)
  })
})

describe('revokeRoles', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Revoke Roles Token',
      symbol: 'REVOKE',
    })

    // Grant issuer role to account2
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account2.address,
    })

    const hash = await token.revokeRoles(config, {
      token: tokenAddr,
      roles: ['issuer'],
      from: account2.address,
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('revokeRolesSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Revoke Roles Token Sync',
      symbol: 'REVOKESYNC',
    })

    // Grant issuer role to account2
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account2.address,
    })

    const { receipt, value } = await token.revokeRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      from: account2.address,
    })
    expect(receipt).toBeDefined()
    expect(value).toBeDefined()
    expect(value.length).toBe(1)
    expect(value[0]?.account).toBe(account2.address)
    expect(value[0]?.hasRole).toBe(false)
  })
})

describe('renounceRoles', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Renounce Roles Token',
      symbol: 'RENOUNCE',
    })

    // Grant issuer role to ourselves
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })

    const hash = await token.renounceRoles(config, {
      token: tokenAddr,
      roles: ['issuer'],
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('renounceRolesSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Renounce Roles Token Sync',
      symbol: 'RENOUNCESYNC',
    })

    // Grant issuer role to ourselves
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })

    const { receipt, value } = await token.renounceRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
    })
    expect(receipt).toBeDefined()
    expect(value).toBeDefined()
    expect(value.length).toBe(1)
    expect(value[0]?.account).toBe(account.address)
    expect(value[0]?.hasRole).toBe(false)
  })
})

describe('setRoleAdmin', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Role Admin Token',
      symbol: 'ROLEADMIN',
    })

    const hash = await token.setRoleAdmin(config, {
      token: tokenAddr,
      role: 'issuer',
      adminRole: 'pause',
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('setRoleAdminSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Role Admin Token Sync',
      symbol: 'ROLEADMINSYNC',
    })

    const { receipt, ...result } = await token.setRoleAdminSync(config, {
      token: tokenAddr,
      role: 'issuer',
      adminRole: 'pause',
    })
    expect(receipt).toBeDefined()
    expect(result.role).toBeDefined()
    expect(result.newAdminRole).toBeDefined()
    expect(result.sender).toBe(account.address)
  })
})

describe('setSupplyCap', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Supply Cap Token',
      symbol: 'SUPPLYCAP',
    })

    const hash = await token.setSupplyCap(config, {
      token: tokenAddr,
      supplyCap: parseUnits('1000000', 6),
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('setSupplyCapSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Supply Cap Token Sync',
      symbol: 'SUPPLYCAPSYNC',
    })

    const { receipt, ...result } = await token.setSupplyCapSync(config, {
      token: tokenAddr,
      supplyCap: parseUnits('1000000', 6),
    })
    expect(receipt).toBeDefined()
    expect(result.newSupplyCap).toBe(parseUnits('1000000', 6))
    expect(result.updater).toBe(account.address)
  })
})

describe('prepareUpdateQuoteToken', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create quote token
    const { token: quoteToken } = await token.createSync(config, {
      currency: 'USD',
      name: 'Quote Token',
      symbol: 'QUOTE',
    })

    // Create main token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Main Token',
      symbol: 'MAIN',
    })

    const hash = await token.prepareUpdateQuoteToken(config, {
      token: tokenAddr,
      quoteToken,
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('prepareUpdateQuoteTokenSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create quote token
    const { token: quoteToken } = await token.createSync(config, {
      currency: 'USD',
      name: 'Quote Token Sync',
      symbol: 'QUOTESYNC',
    })

    // Create main token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Main Token Sync',
      symbol: 'MAINSYNC',
    })

    const { receipt, ...result } = await token.prepareUpdateQuoteTokenSync(
      config,
      {
        token: tokenAddr,
        quoteToken,
      },
    )
    expect(receipt).toBeDefined()
    expect(result.nextQuoteToken).toBe(quoteToken)
    expect(result.updater).toBe(account.address)
  })
})

describe('updateQuoteToken', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create quote token
    const { token: quoteToken } = await token.createSync(config, {
      currency: 'USD',
      name: 'Quote Token Finalize',
      symbol: 'QUOTEFINAL',
    })

    // Create main token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Main Token Finalize',
      symbol: 'MAINFINAL',
    })

    // Prepare quote token update first
    await token.prepareUpdateQuoteTokenSync(config, {
      token: tokenAddr,
      quoteToken,
    })

    const hash = await token.updateQuoteToken(config, {
      token: tokenAddr,
    })
    expect(hash).toBeDefined()
    expect(typeof hash).toBe('string')
  })
})

describe('updateQuoteTokenSync', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create quote token
    const { token: quoteToken } = await token.createSync(config, {
      currency: 'USD',
      name: 'Quote Token Finalize Sync',
      symbol: 'QUOTEFINALSYNC',
    })

    // Create main token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Main Token Finalize Sync',
      symbol: 'MAINFINALSYNC',
    })

    // Prepare quote token update first
    await token.prepareUpdateQuoteTokenSync(config, {
      token: tokenAddr,
      quoteToken,
    })

    const { receipt, ...result } = await token.updateQuoteTokenSync(config, {
      token: tokenAddr,
    })
    expect(receipt).toBeDefined()
    expect(result.newQuoteToken).toBe(quoteToken)
    expect(result.updater).toBe(account.address)
  })
})

describe.todo('permit')

describe.todo('permitSync')

describe('watchAdminRole', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Watch Admin Role Token',
      symbol: 'WATCHADMIN',
    })

    const events: any[] = []
    const unwatch = token.watchAdminRole(config, {
      token: tokenAddr,
      onRoleAdminUpdated: (args) => {
        events.push(args)
      },
    })

    // Trigger event by setting a role admin
    await token.setRoleAdminSync(config, {
      token: tokenAddr,
      role: 'issuer',
      adminRole: 'pause',
    })

    await vi.waitFor(() => {
      expect(events.length).toBeGreaterThan(0)
    })
    unwatch()

    expect(events[0]).toBeDefined()
  })
})

describe('watchApprove', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const events: any[] = []
    const unwatch = token.watchApprove(config, {
      onApproval: (args) => {
        events.push(args)
      },
      token: addresses.alphaUsd,
    })

    // Trigger approval event
    await token.approveSync(config, {
      amount: parseUnits('50', 6),
      spender: account2.address,
      token: addresses.alphaUsd,
    })

    await vi.waitFor(() => {
      expect(events.length).toBeGreaterThan(0)
    })
    unwatch()

    expect(events[0]?.owner).toBe(account.address)
    expect(events[0]?.spender).toBe(account2.address)
    expect(events[0]?.amount).toBe(parseUnits('50', 6))
  })
})

describe('watchBurn', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Watch Burn Token',
      symbol: 'WATCHBURN',
    })

    // Grant issuer role and mint tokens
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })
    await token.mintSync(config, {
      token: tokenAddr,
      to: account.address,
      amount: parseUnits('1000', 6),
    })

    const events: any[] = []
    const unwatch = token.watchBurn(config, {
      token: tokenAddr,
      onBurn: (args) => {
        events.push(args)
      },
    })

    // Trigger burn event
    await token.burnSync(config, {
      token: tokenAddr,
      amount: parseUnits('10', 6),
    })

    await vi.waitFor(() => {
      expect(events.length).toBeGreaterThan(0)
    })
    unwatch()

    expect(events[0]?.from).toBe(account.address)
    expect(events[0]?.amount).toBe(parseUnits('10', 6))
  })
})

describe('watchCreate', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const events: any[] = []
    const unwatch = token.watchCreate(config, {
      onTokenCreated: (args) => {
        events.push(args)
      },
    })

    // Trigger token creation event
    await token.createSync(config, {
      name: 'Watch Create Token',
      symbol: 'WATCHCREATE',
      currency: 'USD',
    })

    await vi.waitFor(() => {
      expect(events.length).toBeGreaterThan(0)
    })
    unwatch()

    expect(events[0]?.name).toBe('Watch Create Token')
    expect(events[0]?.symbol).toBe('WATCHCREATE')
    expect(events[0]?.currency).toBe('USD')
    expect(events[0]?.admin).toBe(account.address)
  })
})

describe('watchMint', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Watch Mint Token',
      symbol: 'WATCHMINT',
    })

    // Grant issuer role
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account.address,
    })

    const events: any[] = []
    const unwatch = token.watchMint(config, {
      token: tokenAddr,
      onMint: (args) => {
        events.push(args)
      },
    })

    // Trigger mint event
    await token.mintSync(config, {
      token: tokenAddr,
      to: account.address,
      amount: parseUnits('100', 6),
    })

    await vi.waitFor(() => {
      expect(events.length).toBeGreaterThan(0)
    })
    unwatch()

    expect(events[0]?.to).toBe(account.address)
    expect(events[0]?.amount).toBe(parseUnits('100', 6))
  })
})

describe('watchRole', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    // Create a new token
    const { token: tokenAddr } = await token.createSync(config, {
      currency: 'USD',
      name: 'Watch Role Token',
      symbol: 'WATCHROLE',
    })

    const events: any[] = []
    const unwatch = token.watchRole(config, {
      token: tokenAddr,
      onRoleUpdated: (args) => {
        events.push(args)
      },
    })

    // Trigger role update event by granting a role
    await token.grantRolesSync(config, {
      token: tokenAddr,
      roles: ['issuer'],
      to: account2.address,
    })

    await vi.waitFor(() => {
      expect(events.find((e) => e.account === account2.address)).toBeDefined()
    })
    unwatch()

    const event = events.find((e) => e.account === account2.address)
    expect(event?.hasRole).toBe(true)
    expect(event?.type).toBe('granted')
  })
})

describe('watchTransfer', () => {
  test('default', async () => {
    await connect(config, {
      connector: config.connectors[0]!,
    })

    const events: any[] = []
    const unwatch = token.watchTransfer(config, {
      token: addresses.alphaUsd,
      onTransfer: (args) => {
        events.push(args)
      },
    })

    // Trigger transfer event
    await token.transferSync(config, {
      amount: parseUnits('5', 6),
      to: account2.address,
      token: addresses.alphaUsd,
    })

    await vi.waitFor(() => {
      expect(events.length).toBeGreaterThan(0)
    })
    unwatch()

    expect(events[0]?.from).toBe(account.address)
    expect(events[0]?.to).toBe(account2.address)
    expect(events[0]?.amount).toBe(parseUnits('5', 6))
  })
})

import { Actions } from '@wagmi/core/tempo'
import {
  accounts,
  addresses,
  config,
  renderHook,
  setupTokenPair,
} from '@wagmi/test/tempo'
import { type Address, isAddress, parseUnits } from 'viem'
import { Tick } from 'viem/tempo'
import { describe, expect, test, vi } from 'vitest'

import { useConnect } from '../../hooks/useConnect.js'
import * as dex from './dex.js'

const account = accounts[0]
const account2 = accounts[1]

describe('useBuy', () => {
  test('default', async () => {
    const { base, quote } = await setupTokenPair()

    const { result } = await renderHook(() => dex.useBuySync())

    // Place ask order to create liquidity
    await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('500', 6),
      type: 'sell',
      tick: Tick.fromPrice('1.001'),
    })

    // Buy base tokens with quote tokens
    const { receipt } = await result.current.mutateAsync({
      tokenIn: quote,
      tokenOut: base,
      amountOut: parseUnits('100', 6),
      maxAmountIn: parseUnits('150', 6),
    })

    expect(receipt).toBeDefined()
    expect(receipt.status).toBe('success')

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())
  })

  test('behavior: respects maxAmountIn', async () => {
    const { base, quote } = await setupTokenPair()

    const { result } = await renderHook(() => dex.useBuySync())

    // Place ask order at high price
    await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('500', 6),
      type: 'sell',
      tick: Tick.fromPrice('1.01'), // 1% above peg
    })

    // Try to buy with insufficient maxAmountIn - should fail
    await expect(
      result.current.mutateAsync({
        tokenIn: quote,
        tokenOut: base,
        amountOut: parseUnits('100', 6),
        maxAmountIn: parseUnits('50', 6), // Way too low for 1% premium
      }),
    ).rejects.toThrow('The contract function "swapExactAmountOut" reverted')
  })

  test('behavior: fails with insufficient liquidity', async () => {
    const { base, quote } = await setupTokenPair()

    const { result } = await renderHook(() => dex.useBuySync())

    // Don't place any orders - no liquidity

    // Try to buy - should fail due to no liquidity
    await expect(
      result.current.mutateAsync({
        tokenIn: quote,
        tokenOut: base,
        amountOut: parseUnits('100', 6),
        maxAmountIn: parseUnits('150', 6),
      }),
    ).rejects.toThrow('The contract function "swapExactAmountOut" reverted')
  })
})

describe('useCancel', () => {
  test('default', async () => {
    const { base, quote } = await setupTokenPair()

    const { result } = await renderHook(() => ({
      place: dex.usePlaceSync(),
      cancel: dex.useCancelSync(),
    }))

    // Place a bid order
    const { orderId } = await result.current.place.mutateAsync({
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })

    // Check initial DEX balance (should be 0)
    const dexBalanceBefore = await Actions.dex.getBalance(config, {
      account: account.address,
      token: quote,
    })
    expect(dexBalanceBefore).toBe(0n)

    // Cancel the order
    const { receipt, orderId: returnedOrderId } =
      await result.current.cancel.mutateAsync({
        orderId,
      })

    expect(receipt).toBeDefined()
    expect(receipt.status).toBe('success')
    expect(returnedOrderId).toBe(orderId)

    await vi.waitFor(() => expect(result.current.cancel.isSuccess).toBeTruthy())

    // Check DEX balance after cancel - tokens should be refunded to internal balance
    const dexBalanceAfter = await Actions.dex.getBalance(config, {
      account: account.address,
      token: quote,
    })
    expect(dexBalanceAfter).toBeGreaterThan(0n)
  })

  test('behavior: only maker can cancel', async () => {
    const { base } = await setupTokenPair()

    const { result } = await renderHook(() => ({
      connect: useConnect(),
      place: dex.usePlaceSync(),
      cancel: dex.useCancelSync(),
    }))

    // Account places order
    const { orderId } = await result.current.place.mutateAsync({
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })

    // Transfer gas to account2
    await Actions.token.transferSync(config, {
      to: account2.address,
      amount: parseUnits('1', 6),
      token: addresses.alphaUsd,
    })

    // Use a different account via the connector
    await result.current.connect.connectAsync({
      connector: config.connectors[1]!,
    })

    // Account2 tries to cancel - should fail
    await expect(
      result.current.cancel.mutateAsync({
        orderId,
      }),
    ).rejects.toThrow('The contract function "cancel" reverted')
  })

  test('behavior: cannot cancel non-existent order', async () => {
    await setupTokenPair()

    const { result } = await renderHook(() => dex.useCancelSync())

    // Try to cancel an order that doesn't exist
    await expect(
      result.current.mutateAsync({
        orderId: 999n,
      }),
    ).rejects.toThrow('The contract function "cancel" reverted')
  })
})

describe('useCreatePair', () => {
  test('default', async () => {
    await setupTokenPair() // This ensures connection

    const { result } = await renderHook(() => dex.useCreatePairSync())

    const { token: baseToken } = await Actions.token.createSync(config, {
      name: 'Test Base Token',
      symbol: 'BASE',
      currency: 'USD',
      admin: account,
    })

    const { receipt, ...resultData } = await result.current.mutateAsync({
      base: baseToken,
    })

    expect(receipt).toBeDefined()
    expect(receipt.status).toBe('success')

    const { key, ...rest } = resultData
    expect(key).toBeDefined()
    expect(rest).toEqual(
      expect.objectContaining({
        base: expect.toSatisfy(isAddress),
        quote: expect.toSatisfy(isAddress),
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())
  })
})

describe('useBalance', () => {
  test('default', async () => {
    const { base, quote } = await setupTokenPair()

    const { result, rerender } = await renderHook(
      (props) => dex.useBalance({ account: props?.account, token: quote }),
      { initialProps: { account: undefined as Address | undefined } },
    )

    await vi.waitFor(() => result.current.fetchStatus === 'fetching')

    // Verify initial state (disabled/pending when account missing)
    expect(result.current.status).toBe('pending')

    // Set account and rerender
    rerender({ account: accounts[0].address })

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Initial balance should be 0
    expect(result.current.data).toBe(0n)

    // Place and cancel order to create internal balance
    const { orderId } = await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('50', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.0005'),
    })

    await Actions.dex.cancelSync(config, {
      orderId,
    })

    // Trigger refetch and verify updated balance
    const { data } = await result.current.refetch()
    expect(data).toBeGreaterThan(0n)
  })

  test('behavior: check different account', async () => {
    const { quote } = await setupTokenPair()

    const { result } = await renderHook(() =>
      dex.useBalance({ account: account2.address, token: quote }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Check account2's balance (should be 0)
    expect(result.current.data).toBe(0n)
  })

  test('behavior: balances are per-token', async () => {
    const { base, quote } = await setupTokenPair()

    // Create balance in quote token
    const { orderId } = await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })
    await Actions.dex.cancelSync(config, { orderId })

    const { result } = await renderHook(() => ({
      quote: dex.useBalance({ account: account.address, token: quote }),
      base: dex.useBalance({ account: account.address, token: base }),
    }))

    await vi.waitUntil(
      () => result.current.base.isSuccess && result.current.quote.isSuccess,
      {
        timeout: 50_000,
      },
    )

    // Check quote balance (should have refunded tokens)
    expect(result.current.quote.data).toBeGreaterThan(0n)
    // Check base balance (should still be 0)
    expect(result.current.base.data).toBe(0n)
  })
})

describe('useBuyQuote', () => {
  test('default', async () => {
    const { base, quote } = await setupTokenPair()

    // Place ask orders to create liquidity
    await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('500', 6),
      type: 'sell',
      tick: Tick.fromPrice('1.001'),
    })

    const { result } = await renderHook(() =>
      dex.useBuyQuote({
        tokenIn: quote,
        tokenOut: base,
        amountOut: parseUnits('100', 6),
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBeGreaterThan(0n)
    // Should be approximately 100 * 1.001 = 100.1
    expect(result.current.data).toBeGreaterThan(parseUnits('100', 6))
  })

  test('behavior: fails with no liquidity', async () => {
    const { base, quote } = await setupTokenPair()

    // No orders placed - no liquidity

    const { result } = await renderHook(() =>
      dex.useBuyQuote({
        tokenIn: quote,
        tokenOut: base,
        amountOut: parseUnits('100', 6),
      }),
    )

    await vi.waitUntil(() => result.current.isError, {
      timeout: 50_000,
    })

    expect(result.current.error?.message).toContain('InsufficientLiquidity')
  })
})

describe('useOrder', () => {
  test('default', async () => {
    const { base } = await setupTokenPair()

    // Place an order to get an order ID
    const { orderId } = await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })

    const { result } = await renderHook(() =>
      dex.useOrder({
        orderId,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    const order = result.current.data!
    expect(order.maker).toBe(account.address)
    expect(order.isBid).toBe(true)
    expect(order.tick).toBe(Tick.fromPrice('1.001'))
    expect(order.amount).toBe(parseUnits('100', 6))
    expect(order.remaining).toBe(parseUnits('100', 6))
    expect(order.isFlip).toBe(false)
  })

  test('behavior: returns flip order details', async () => {
    const { base } = await setupTokenPair()

    // Place a flip order
    const { orderId } = await Actions.dex.placeFlipSync(config, {
      token: base,
      amount: parseUnits('50', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
      flipTick: Tick.fromPrice('1.002'),
    })

    const { result } = await renderHook(() =>
      dex.useOrder({
        orderId,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    const order = result.current.data!
    expect(order.maker).toBe(account.address)
    expect(order.isBid).toBe(true)
    expect(order.tick).toBe(Tick.fromPrice('1.001'))
    expect(order.amount).toBe(parseUnits('50', 6))
    expect(order.isFlip).toBe(true)
    expect(order.flipTick).toBe(Tick.fromPrice('1.002'))
  })

  test('behavior: fails for non-existent order', async () => {
    await setupTokenPair()

    const { result } = await renderHook(() =>
      dex.useOrder({
        orderId: 999n,
      }),
    )

    await vi.waitUntil(() => result.current.isError, {
      timeout: 50_000,
    })

    expect(result.current.error?.message).toContain('OrderDoesNotExist')
  })
})

describe('useOrderbook', () => {
  test('default', async () => {
    const { base, quote } = await setupTokenPair()

    const { result } = await renderHook(() =>
      dex.useOrderbook({
        base,
        quote,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    const book = result.current.data!
    expect(book.base).toBe(base)
    expect(book.quote).toBe(quote)
    expect(book.bestBidTick).toBeDefined()
    expect(book.bestAskTick).toBeDefined()
  })

  test('behavior: shows best bid and ask after orders placed', async () => {
    const { base, quote } = await setupTokenPair()

    const bidTick = Tick.fromPrice('0.999')
    const askTick = Tick.fromPrice('1.001')

    // Place a bid order
    await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: bidTick,
    })

    // Place an ask order
    await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('100', 6),
      type: 'sell',
      tick: askTick,
    })

    const { result } = await renderHook(() =>
      dex.useOrderbook({
        base,
        quote,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    const book = result.current.data!
    expect(book.bestBidTick).toBe(bidTick)
    expect(book.bestAskTick).toBe(askTick)
  })
})

describe('useTickLevel', () => {
  test('default', async () => {
    const { base } = await setupTokenPair()

    const tick = Tick.fromPrice('1.001')

    // Place an order to create liquidity at this tick
    const { orderId } = await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick,
    })

    const { result } = await renderHook(() =>
      dex.useTickLevel({
        base,
        tick,
        isBid: true,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    const level = result.current.data!
    expect(level.head).toBe(orderId) // head should be our order
    expect(level.tail).toBe(orderId) // tail should also be our order (only one)
    expect(level.totalLiquidity).toBeGreaterThan(0n)
  })

  test('behavior: empty price level', async () => {
    const { base } = await setupTokenPair()

    const tick = Tick.fromPrice('1.001')

    // Query a tick with no orders
    const { result } = await renderHook(() =>
      dex.useTickLevel({
        base,
        tick,
        isBid: true,
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    const level = result.current.data!
    expect(level.head).toBe(0n)
    expect(level.tail).toBe(0n)
    expect(level.totalLiquidity).toBe(0n)
  })
})

describe('useSellQuote', () => {
  test('default', async () => {
    const { base, quote } = await setupTokenPair()

    // Place bid orders to create liquidity
    await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('500', 6),
      type: 'buy',
      tick: Tick.fromPrice('0.999'),
    })

    const { result } = await renderHook(() =>
      dex.useSellQuote({
        tokenIn: base,
        tokenOut: quote,
        amountIn: parseUnits('100', 6),
      }),
    )

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data).toBeGreaterThan(0n)
    // Should be approximately 100 * 0.999 = 99.9
    expect(result.current.data).toBeLessThan(parseUnits('100', 6))
  })

  test('behavior: fails with no liquidity', async () => {
    const { base, quote } = await setupTokenPair()

    // Quote should fail with no liquidity
    const { result } = await renderHook(() =>
      dex.useSellQuote({
        tokenIn: base,
        tokenOut: quote,
        amountIn: parseUnits('100', 6),
      }),
    )

    await vi.waitUntil(() => result.current.isError, {
      timeout: 50_000,
    })

    expect(result.current.error?.message).toContain('InsufficientLiquidity')
  })
})

describe('usePlace', () => {
  test('default', async () => {
    const { base } = await setupTokenPair()

    const { result } = await renderHook(() => dex.usePlaceSync())

    // Place a sell order
    const { receipt, orderId, token, ...resultData } =
      await result.current.mutateAsync({
        token: base,
        amount: parseUnits('100', 6),
        type: 'sell',
        tick: Tick.fromPrice('1.001'),
      })

    expect(receipt).toBeDefined()
    expect(receipt.status).toBe('success')
    expect(orderId).toBeGreaterThan(0n)
    expect(token).toBe(base)
    expect(resultData).toMatchInlineSnapshot(`
      {
        "amount": 100000000n,
        "isBid": false,
        "maker": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "tick": 100,
      }
    `)

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    // Place a buy order
    const {
      receipt: receipt2,
      orderId: orderId2,
      token: token2,
      ...result2
    } = await result.current.mutateAsync({
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })
    expect(receipt2.status).toBe('success')
    expect(orderId2).toBeGreaterThan(0n)
    expect(token2).toBe(base)
    expect(result2).toMatchInlineSnapshot(`
      {
        "amount": 100000000n,
        "isBid": true,
        "maker": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "tick": 100,
      }
    `)
  })
})

describe('usePlaceFlip', () => {
  test('default', async () => {
    const { base } = await setupTokenPair()

    const { result } = await renderHook(() => dex.usePlaceFlipSync())

    // Place a flip bid order
    const { receipt, orderId, token, ...resultData } =
      await result.current.mutateAsync({
        token: base,
        amount: parseUnits('100', 6),
        type: 'buy',
        tick: Tick.fromPrice('1.001'),
        flipTick: Tick.fromPrice('1.002'),
      })

    expect(receipt).toBeDefined()
    expect(receipt.status).toBe('success')
    expect(orderId).toBeGreaterThan(0n)
    expect(token).toBe(base)
    expect(resultData.flipTick).toBe(Tick.fromPrice('1.002'))
    expect(resultData).toMatchInlineSnapshot(`
      {
        "amount": 100000000n,
        "flipTick": 200,
        "isBid": true,
        "maker": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "tick": 100,
      }
    `)

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())
  })
})

describe('useSell', () => {
  test('default', async () => {
    const { base, quote } = await setupTokenPair()

    const { result } = await renderHook(() => dex.useSellSync())

    // Place bid order to create liquidity
    await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('500', 6),
      type: 'buy',
      tick: Tick.fromPrice('0.999'),
    })

    // Sell base tokens
    const { receipt } = await result.current.mutateAsync({
      tokenIn: base,
      tokenOut: quote,
      amountIn: parseUnits('100', 6),
      minAmountOut: parseUnits('50', 6),
    })

    expect(receipt).toBeDefined()
    expect(receipt.status).toBe('success')

    await vi.waitFor(() => expect(result.current.isSuccess).toBeTruthy())
  })

  test('behavior: respects minAmountOut', async () => {
    const { base, quote } = await setupTokenPair()

    const { result } = await renderHook(() => dex.useSellSync())

    // Place bid order at low price
    await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('500', 6),
      type: 'buy',
      tick: Tick.fromPrice('0.99'), // 1% below peg
    })

    // Try to sell with too high minAmountOut - should fail
    await expect(
      result.current.mutateAsync({
        tokenIn: base,
        tokenOut: quote,
        amountIn: parseUnits('100', 6),
        minAmountOut: parseUnits('150', 6), // Way too high
      }),
    ).rejects.toThrow('The contract function "swapExactAmountIn" reverted')
  })

  test('behavior: fails with insufficient liquidity', async () => {
    const { base, quote } = await setupTokenPair()

    const { result } = await renderHook(() => dex.useSellSync())

    // No orders - no liquidity

    // Try to sell - should fail
    await expect(
      result.current.mutateAsync({
        tokenIn: base,
        tokenOut: quote,
        amountIn: parseUnits('100', 6),
        minAmountOut: parseUnits('50', 6),
      }),
    ).rejects.toThrow('The contract function "swapExactAmountIn" reverted')
  })
})

describe('useWatchFlipOrderPlaced', () => {
  test('default', async () => {
    const { base } = await setupTokenPair()

    const { result } = await renderHook(() => dex.usePlaceFlipSync())

    const events: any[] = []
    await renderHook(() =>
      dex.useWatchFlipOrderPlaced({
        onFlipOrderPlaced(args) {
          events.push(args)
        },
      }),
    )

    // Place flip order to trigger event
    await result.current.mutateAsync({
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
      flipTick: Tick.fromPrice('1.002'),
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.flipTick).toBe(Tick.fromPrice('1.002'))
    expect(events[0]?.tick).toBe(Tick.fromPrice('1.001'))
    expect(events[0]?.isBid).toBe(true)
    expect(events[0]?.amount).toBe(parseUnits('100', 6))
  })
})

describe('useWatchOrderCancelled', () => {
  test('default', async () => {
    const { base } = await setupTokenPair()

    // Place order first
    const { orderId } = await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })

    const events: any[] = []
    await renderHook(() =>
      dex.useWatchOrderCancelled({
        onOrderCancelled(args) {
          events.push(args)
        },
      }),
    )

    // Cancel order to trigger event
    await Actions.dex.cancelSync(config, {
      orderId,
    })

    await vi.waitUntil(() => events.length >= 1)

    expect(events.length).toBeGreaterThanOrEqual(1)
    expect(events[0]?.orderId).toBe(orderId)
  })

  test('behavior: filter by orderId', async () => {
    const { base } = await setupTokenPair()

    // Place two orders
    const { orderId: orderId1 } = await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })

    const { orderId: orderId2 } = await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('50', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })

    const events: any[] = []
    await renderHook(() =>
      dex.useWatchOrderCancelled({
        orderId: orderId1, // Filter for only orderId1
        onOrderCancelled(args) {
          events.push(args)
        },
      }),
    )

    // Cancel orderId1 (should be captured)
    await Actions.dex.cancelSync(config, {
      orderId: orderId1,
    })

    // Cancel orderId2 (should NOT be captured due to filter)
    await Actions.dex.cancelSync(config, {
      orderId: orderId2,
    })

    await vi.waitUntil(() => events.length >= 1, { timeout: 2000 })

    // Should only receive 1 event (for orderId1)
    expect(events.length).toBe(1)
    expect(events[0]?.orderId).toBe(orderId1)
  })
})

describe.todo('useWatchOrderFilled')

describe('useWatchOrderPlaced', () => {
  test('default', async () => {
    const { base } = await setupTokenPair()

    const events: any[] = []
    await renderHook(() =>
      dex.useWatchOrderPlaced({
        onOrderPlaced(args) {
          events.push(args)
        },
      }),
    )

    // Place first order
    await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })

    // Place second order
    await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('50', 6),
      type: 'sell',
      tick: Tick.fromPrice('0.999'),
    })

    await vi.waitUntil(() => events.length >= 2)

    expect(events.length).toBeGreaterThanOrEqual(2)
    expect(events[0]?.isBid).toBe(true)
    expect(events[0]?.amount).toBe(parseUnits('100', 6))
    expect(events[1]?.isBid).toBe(false)
    expect(events[1]?.amount).toBe(parseUnits('50', 6))
  })

  test('behavior: filter by token', async () => {
    const { base } = await setupTokenPair()
    const { base: base2 } = await setupTokenPair()

    const events: any[] = []
    await renderHook(() =>
      dex.useWatchOrderPlaced({
        token: base, // Filter for only base token
        onOrderPlaced(args) {
          events.push(args)
        },
      }),
    )

    // Place order on base (should be captured)
    await Actions.dex.placeSync(config, {
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })

    // Place order on base2 (should NOT be captured due to filter)
    await Actions.dex.placeSync(config, {
      token: base2,
      amount: parseUnits('50', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })

    await vi.waitUntil(() => events.length >= 1, { timeout: 2000 })

    // Should only receive 1 event (for base token)
    expect(events.length).toBe(1)
    expect(events[0]?.token.toLowerCase()).toBe(base.toLowerCase())
  })
})

describe('useWithdraw', () => {
  test('default', async () => {
    const { base, quote } = await setupTokenPair()

    const { result } = await renderHook(() => ({
      place: dex.usePlaceSync(),
      cancel: dex.useCancelSync(),
      withdraw: dex.useWithdrawSync(),
    }))

    // Create internal balance
    const { orderId } = await result.current.place.mutateAsync({
      token: base,
      amount: parseUnits('100', 6),
      type: 'buy',
      tick: Tick.fromPrice('1.001'),
    })

    await result.current.cancel.mutateAsync({ orderId })

    // Get DEX balance
    const dexBalance = await Actions.dex.getBalance(config, {
      account: account.address,
      token: quote,
    })
    expect(dexBalance).toBeGreaterThan(0n)

    // Get wallet balance before withdraw
    const walletBalanceBefore = await Actions.token.getBalance(config, {
      token: quote,
      account: account.address,
    })

    // Withdraw from DEX
    const { receipt } = await result.current.withdraw.mutateAsync({
      token: quote,
      amount: dexBalance,
    })

    expect(receipt).toBeDefined()
    expect(receipt.status).toBe('success')

    await vi.waitFor(() =>
      expect(result.current.withdraw.isSuccess).toBeTruthy(),
    )

    // Check DEX balance is now 0
    const dexBalanceAfter = await Actions.dex.getBalance(config, {
      account: account.address,
      token: quote,
    })
    expect(dexBalanceAfter).toBe(0n)

    // Check wallet balance increased
    const walletBalanceAfter = await Actions.token.getBalance(config, {
      token: quote,
      account: account.address,
    })
    expect(walletBalanceAfter).toBeGreaterThan(walletBalanceBefore)
  })
})

import { describe, expect, it } from 'vitest'

import { getInjectedName } from './getInjectedName'

describe.each([
  { ethereum: undefined, expected: 'Injected' },
  { ethereum: { isBraveWallet: true }, expected: 'Brave Wallet' },
  {
    ethereum: { isBraveWallet: true, isMetaMask: true },
    expected: 'Brave Wallet',
  },
  { ethereum: { isCoinbaseWallet: true }, expected: 'Coinbase Wallet' },
  { ethereum: { isExodus: true }, expected: 'Exodus' },
  { ethereum: { isFrame: true }, expected: 'Frame' },
  { ethereum: { isTally: true }, expected: 'Tally' },
  {
    ethereum: { isTokenPocket: true, isMetaMask: true },
    expected: 'TokenPocket',
  },
  { ethereum: { isTokenary: true, isMetaMask: true }, expected: 'Tokenary' },
  { ethereum: { isTrust: true }, expected: 'Trust Wallet' },
  { ethereum: { isMetaMask: true }, expected: 'MetaMask' },
  {
    ethereum: { providers: [{ isMetaMask: true }, { isCoinbaseWallet: true }] },
    expected: ['MetaMask', 'Coinbase Wallet'],
  },
  {
    ethereum: {
      providers: [
        { isMetaMask: true },
        { isMetaMask: true, isTokenary: true },
        { isCoinbaseWallet: true },
      ],
    },
    expected: ['MetaMask', 'Tokenary', 'Coinbase Wallet'],
  },
  {
    ethereum: { providers: [{ isMetaMask: true }, { isFooWallet: true }, {}] },
    expected: ['MetaMask', 'Unknown Wallet #1', 'Unknown Wallet #2'],
  },
  { ethereum: {}, expected: 'Injected' },
])('getInjectedName($ethereum)', ({ ethereum, expected }) => {
  it(`returns ${expected}`, () => {
    expect(getInjectedName(<any>ethereum)).toEqual(expected)
  })
})

import { getInjectedName } from './getInjectedName'

describe.each`
  ethereum                                                             | expected
  ${undefined}                                                         | ${'Injected'}
  ${{ isBraveWallet: true }}                                           | ${'Brave Wallet'}
  ${{ isBraveWallet: true, isMetaMask: true }}                         | ${'Brave Wallet'}
  ${{ isCoinbaseWallet: true }}                                        | ${'Coinbase Wallet'}
  ${{ isFrame: true }}                                                 | ${'Frame'}
  ${{ isTally: true }}                                                 | ${'Tally'}
  ${{ isTokenary: true, isMetaMask: true }}                            | ${'Tokenary'}
  ${{ isTrust: true }}                                                 | ${'Trust Wallet'}
  ${{ isMetaMask: true }}                                              | ${'MetaMask'}
  ${{ providers: [{ isMetaMask: true }, { isCoinbaseWallet: true }] }} | ${['MetaMask', 'Coinbase Wallet']}
  ${{ providers: [{ isMetaMask: true }, { isFooWallet: true }, {}] }}  | ${['MetaMask', 'Unknown Wallet #1', 'Unknown Wallet #2']}
  ${{}}                                                                | ${'Injected'}
`('getInjectedName($ethereum)', ({ ethereum, expected }) => {
  it(`returns ${expected}`, () => {
    expect(getInjectedName(ethereum)).toEqual(expected)
  })
})

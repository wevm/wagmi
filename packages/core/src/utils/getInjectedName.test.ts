import { getInjectedName } from './getInjectedName'

describe.each`
  ethereum                                                                                                     | expected
  ${undefined}                                                                                                 | ${'Injected'}
  ${{ isBraveWallet: true }}                                                                                   | ${'Brave Wallet'}
  ${{ isBraveWallet: true, isMetaMask: true }}                                                                 | ${'Brave Wallet'}
  ${{ isCoinbaseWallet: true }}                                                                                | ${'Coinbase Wallet'}
  ${{ isExodus: true }}                                                                                        | ${'Exodus'}
  ${{ isFrame: true }}                                                                                         | ${'Frame'}
  ${{ isTally: true }}                                                                                         | ${'Tally'}
  ${{ isTokenPocket: true, isMetaMask: true }}                                                                 | ${'TokenPocket'}
  ${{ isTokenary: true, isMetaMask: true }}                                                                    | ${'Tokenary'}
  ${{ isTrust: true }}                                                                                         | ${'Trust Wallet'}
  ${{ isMetaMask: true }}                                                                                      | ${'MetaMask'}
  ${{ providers: [{ isMetaMask: true }, { isCoinbaseWallet: true }] }}                                         | ${['MetaMask', 'Coinbase Wallet']}
  ${{ providers: [{ isMetaMask: true }, { isMetaMask: true, isTokenary: true }, { isCoinbaseWallet: true }] }} | ${['MetaMask', 'Tokenary', 'Coinbase Wallet']}
  ${{ providers: [{ isMetaMask: true }, { isFooWallet: true }, {}] }}                                          | ${['MetaMask', 'Unknown Wallet #1', 'Unknown Wallet #2']}
  ${{}}                                                                                                        | ${'Injected'}
`('getInjectedName($ethereum)', ({ ethereum, expected }) => {
  it(`returns ${expected}`, () => {
    expect(getInjectedName(ethereum)).toEqual(expected)
  })
})

import { config } from '@wagmi/test'
import { expect, test } from 'vitest'

import { ledger } from './ledger.js'

/*
 * To manually test the Ledger connector:
 *
 * - install the Ledger Live app, https://www.ledger.com/ledger-live
 * - install the Ledger Connect extension, currently in beta, it should soon be
 *   distributed with the Ledger Live app for iOS and macOS
 * - run the wagmi playground app following the contributing docs on the main
 *   wagmi repository
 * - open the playground app in a web browser
 * - press the "Ledger" button
 * - see below for the Ledger Connect and Ledger Live flows
 * - after the account is selected on the wallet the dapp state should reflect
 *   the chosen account information
 *
 * Ledger Connect
 *
 * - if you are on a platform supported by the Ledger Connect extension
 *   (currently Safari on iOS and macOS) but don't have it installed or enabled
 *   you should see a modal explaining how you can do that
 * - if you are on a platform supported by the Ledger Connect extension and
 *   have it installed and enabled it should pop up allowing you to select an
 *   account
 *   - when pressing the "Disconnect" button on the dapp, the dapp shows as
 *     disconnected but you are not actually disconnected until you press
 *     the "Disconnect" button on Ledger Connect
 *   - when pressing the "Disconnect" button on Ledger Connect (press the pill
 *     shaped button with the Ledger logo, then "Disconnect" on the popup), the
 *     dapp should also show as disconnected
 *
 * Testing Ledger Live
 *
 * - if you are on a platform not yet supported by the Connect extension you
 *   should see a modal allowing you to use the Ledger Live app; pressing
 *   "Use Ledger Live" or scanning the QR code should open the app and allow
 *   you to choose an account
 *   - when pressing the "Disconnect" button on the dapp, Ledger Live should
 *     also show as disconnected
 *   - when pressing the "Disconnect" button on Ledger Live, the dapp should
 *     also show as disconnected
 *   - when switching accounts on Ledger Live the dapp should reflect those
 *     changes
 */

test('setup', () => {
  const connectorFn = ledger()
  const connector = config._internal.connectors.setup(connectorFn)
  expect(connector.name).toEqual('Ledger')
})

test.todo('behavior: connects')

test.todo('behavior: disconnects via dapp (wagmi Connector)')

test.todo('behavior: disconnects via wallet (Ledger Live)')

test.todo('behavior: switch chains via dapp (wagmi Connector)')

test.todo('behavior: switch chains via wallet (Ledger Live)')

test.todo('behavior: switch accounts via wallet (Ledger Live)')

test.todo('behavior: sends a transaction')

test.todo('behavior: signs a message')

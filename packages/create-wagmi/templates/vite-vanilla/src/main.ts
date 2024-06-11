import { Buffer } from 'buffer'
import { connect, disconnect, reconnect, watchAccount } from '@wagmi/core'

import './style.css'
import { config } from './wagmi'

globalThis.Buffer = Buffer

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="account">
      <h2>Account</h2>

      <div>
        status:
        <br />
        addresses:
        <br />
        chainId:
      </div>
    </div>

    <div id="connect">
      <h2>Connect</h2>
      ${config.connectors
        .map(
          (connector) =>
            `<button class="connect" id="${connector.uid}" type="button">${connector.name}</button>`,
        )
        .join('')}
    </div>
  </div>
`

setupApp(document.querySelector<HTMLDivElement>('#app')!)

function setupApp(element: HTMLDivElement) {
  const connectElement = element.querySelector<HTMLDivElement>('#connect')
  const buttons = element.querySelectorAll<HTMLButtonElement>('.connect')
  for (const button of buttons) {
    const connector = config.connectors.find(
      (connector) => connector.uid === button.id,
    )!
    button.addEventListener('click', async () => {
      try {
        const errorElement = element.querySelector<HTMLDivElement>('#error')
        if (errorElement) errorElement.remove()
        await connect(config, { connector })
      } catch (error) {
        const errorElement = document.createElement('div')
        errorElement.id = 'error'
        errorElement.innerText = (error as Error).message
        connectElement?.appendChild(errorElement)
      }
    })
  }

  watchAccount(config, {
    onChange(account) {
      const accountElement = element.querySelector<HTMLDivElement>('#account')!
      accountElement.innerHTML = `
        <h2>Account</h2>
        <div>
          status: ${account.status}
          <br />
          addresses: ${
            account.addresses ? JSON.stringify(account.addresses) : ''
          }
          <br />
          chainId: ${account.chainId ?? ''}
        </div>
        ${
          account.status === 'connected'
            ? `<button id="disconnect" type="button">Disconnect</button>`
            : ''
        }
      `

      const disconnectButton =
        element.querySelector<HTMLButtonElement>('#disconnect')
      if (disconnectButton)
        disconnectButton.addEventListener('click', () => disconnect(config))
    },
  })

  reconnect(config)
    .then(() => {})
    .catch(() => {})
}

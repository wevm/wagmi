import { connect, disconnect, reconnect, watchConnection } from '@wagmi/core'
import { Buffer } from 'buffer'

import './style.css'
import { config } from './wagmi'

globalThis.Buffer = Buffer

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="connection">
      <h2>Connection</h2>

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

  watchConnection(config, {
    onChange(connection) {
      const connectionElement =
        element.querySelector<HTMLDivElement>('#connection')!
      connectionElement.innerHTML = `
        <h2>Connection</h2>
        <div>
          status: ${connection.status}
          <br />
          addresses: ${
            connection.addresses ? JSON.stringify(connection.addresses) : ''
          }
          <br />
          chainId: ${connection.chainId ?? ''}
        </div>
        ${
          connection.status === 'connected'
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

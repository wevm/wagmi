import { createServer } from 'net'

let portCount = 0

export async function getPort(port: number): Promise<number> {
  portCount++
  return new Promise((resolve) => {
    ;(function exec(port: number) {
      const server = createServer()

      server.listen(port, '127.0.0.1', () => {
        const address = server.address()
        const port_ = typeof address === 'string' ? address : address?.port
        if (port_) server.close(() => resolve(port_ as number))
        else exec(port + 1)
      })

      server.on('error', () => exec(port + 1))
    })(port + portCount)
  })
}

export async function wait(time: number) {
  return new Promise((res) => setTimeout(res, time))
}

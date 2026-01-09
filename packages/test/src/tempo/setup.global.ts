import { createServer, port } from './prool.js'

export default async function () {
  const server = await createServer()
  const stop = await server.start()

  // Arbitrary request to start server to trigger Docker image download.
  console.log('Downloading Docker image & starting Tempo server...')
  await fetch(`http://localhost:${port}/1/start`)
  console.log('Tempo server started.')

  return stop
}

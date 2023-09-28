import pico from 'picocolors'

const log = console.log

export function rpcProviderWarning({
  readMoreUrl = 'https://wagmi.sh/docs/getting-started#configure-chains',
}: {
  readMoreUrl?: string
} = {}) {
  log(
    `${pico.yellow(
      'Important note:',
    )} It is HIGHLY recommended that you add an ${pico.bold(
      pico.underline('alchemyProvider'),
    )}, ${pico.bold(pico.underline('infuraProvider'))}, or alike to ${pico.blue(
      'src/wagmi.ts',
    )} before deploying your project to production to prevent being rate-limited.`,
  )
  log()
  log(`Read more: ${pico.blue(pico.underline(readMoreUrl))}`)
}

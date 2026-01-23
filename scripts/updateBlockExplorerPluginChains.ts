import fs from 'node:fs/promises'

// Fetches supported chains for Etherscan and Sourcify

console.log('Updating block explorer plugins chains.')

let count = 0
{
  console.log('etherscan - https://api.etherscan.io/v2/chainlist')
  const res = (await fetch('https://api.etherscan.io/v2/chainlist').then(
    (res) => res.json(),
  )) as {
    totalcount: number
    result: {
      chainname: string
      chainid: number
      blockexplorer: string
      apiurl: string
      status: 0 | 1
    }[]
  }

  let content = 'type ChainId =\n'
  for (const chain of res.result)
    content += `  | ${chain.chainid} // ${chain.chainname}\n`

  await writeContent('./packages/cli/src/plugins/etherscan.ts', content)
  count += 1
}

{
  console.log('sourcify - https://sourcify.dev/server/chains')
  const res = (await fetch('https://sourcify.dev/server/chains').then((res) =>
    res.json(),
  )) as {
    name: string
    chainId: number
  }[]

  let content = 'type ChainId =\n'
  for (const chain of res) content += `  | ${chain.chainId} // ${chain.name}\n`

  await writeContent('./packages/cli/src/plugins/sourcify.ts', content)
  count += 1
}

{
  console.log(
    'routescan - https://api.routescan.io/v2/network/(mainnet|testnet)/evm/all/blockchains',
  )
  const [res1, res2] = await Promise.all([
    fetch('https://api.routescan.io/v2/network/mainnet/evm/all/blockchains'),
    fetch('https://api.routescan.io/v2/network/testnet/evm/all/blockchains'),
  ]).then(
    async ([res1, res2]) =>
      [await res1.json(), await res2.json()] as [mainnet: Res, testnet: Res],
  )
  type Res = { items: { name: string; chainId: number }[] }
  const res = [...res1.items, ...res2.items]

  let content = 'type ChainId =\n'
  const chains = res.sort((a, b) => a.chainId - b.chainId)
  for (const chain of chains)
    content += `  | ${chain.chainId} // ${chain.name}\n`

  await writeContent('./packages/cli/src/plugins/routescan.ts', content)
  count += 1
}

console.log(`Done. Updated chains for ${count} plugins.`)

async function writeContent(pluginPath: string, content: string) {
  const text = await fs
    .readFile(pluginPath, 'utf8')
    .then((text) => text.replace(/type ChainId =[\s\S]*$/, content))
  await fs.writeFile(pluginPath, text, 'utf8')
}

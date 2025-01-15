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
    chainId: string
  }[]

  let content = 'type ChainId =\n'
  for (const chain of res) content += `  | ${chain.chainId} // ${chain.name}\n`

  await writeContent('./packages/cli/src/plugins/sourcify.ts', content)
  count += 1
}

console.log(`Done. Updated chains for ${count} plugins.`)

async function writeContent(pluginPath: string, content: string) {
  const file = Bun.file(pluginPath)
  const text = await file
    .text()
    .then((text) => text.replace(/type ChainId =[\s\S]*$/, content))
  await Bun.write(pluginPath, text)
}

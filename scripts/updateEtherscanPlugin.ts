// Fetches Etherscan supported chains
// https://docs.etherscan.io/etherscan-v2/getting-started/supported-chains

console.log('Updating Etherscan Plugin supported chains.')

const res = (await fetch('https://api.etherscan.io/v2/chainlist').then((res) =>
  res.json(),
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

const pluginPath = './packages/cli/src/plugins/etherscan.ts'
const file = Bun.file(pluginPath)
const text = await file
  .text()
  .then((text) => text.replace(/type ChainId =[\s\S]*$/, content))

await Bun.write(pluginPath, text)

console.log(
  `Done. Updated Etherscan Plugin supported chains (${res.totalcount} chains).`,
)

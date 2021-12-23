const fs = require('fs-extra')
const glob = require('glob')
const fetch = require('node-fetch')

const path = require('path')
const { execSync } = require('child_process')

const baseDir = path.join(__dirname, '..')

const contracts = [
  {
    name: 'ENSRegistryWithFallback',
    address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  },
  {
    name: 'MirrorWriteToken',
    address: '0x622236bb180256b6ae1a935dae08dc0356141632',
  },
  {
    name: 'NounsDescriptor',
    address: '0x0Cfdb3Ba1694c2bb2CFACB0339ad7b1Ae5932B63',
  },
]

;(async () => {
  try {
    const generatedDir = path.join(baseDir, 'generated')
    await fs.remove(generatedDir)
    await fs.mkdirp(generatedDir)

    console.log('Fetching contracts from Etherscan…')
    for (const contract of contracts) {
      const url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contract.address}&apikey=${process.env.ETHERSCAN_API_KEY}`
      console.log(contract.name)
      const res = await fetch(url)
      if (res.err) throw res.err
      const json = await res.json()
      const abi = JSON.parse(json.result)
      const abiFilePath = path.join(generatedDir, `${contract.name}.json`)
      const data = { ...contract, abi }
      await fs.writeFile(abiFilePath, JSON.stringify(data), 'utf-8')
      execSync(
        `abi-types-generator '${abiFilePath}' --output='${generatedDir}' --name=${contract.name} --provider=ethers_v5`,
      )
    }

    // Generate index file
    const abiFiles = glob.sync(`${generatedDir}/*`, {
      cwd: baseDir,
      absolute: true,
    })
    const abiExports = abiFiles
      .map((x) => {
        const extension = path.extname(x)
        const fileName = path.basename(x, extension)
        if (extension === '.json')
          return `export { default as ${fileName}Contract } from './${fileName}.json'`
        return `export type { ${fileName} } from './${fileName}'`
      })
      .join('\n')
      .concat('\n')
    await fs.writeFile(path.join(generatedDir, 'index.ts'), abiExports, 'utf-8')

    console.log('Generating files…')
    // Copy generated code to examples
    const exampleDirectories = glob.sync('./examples/*/src', {
      cwd: baseDir,
      absolute: true,
    })
    for (const exampleDirectory of exampleDirectories) {
      const exampleGeneratedDir = `${exampleDirectory}/generated`
      await fs.remove(exampleGeneratedDir)
      await fs.mkdirp(exampleGeneratedDir)
      await fs.copy(generatedDir, `${exampleGeneratedDir}/contracts`)
    }

    await fs.remove(generatedDir)
    console.log('Done.')
  } catch (err) {
    console.log('Exited.', err)
  }
})()

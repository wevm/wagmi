const fs = require('fs-extra')
const glob = require('glob')

const path = require('path')
const { execSync } = require('child_process')

const baseDir = path.join(__dirname, '..')
const abiDirectory = './examples/abis'
const typesDirectory = './examples/types'

;(async () => {
  try {
    const abiFilePaths = glob.sync(`${abiDirectory}/*.json`, {
      cwd: baseDir,
      absolute: true,
    })

    await fs.mkdirp(typesDirectory)
    console.log('Generating types…')
    for (const abiFilePath of abiFilePaths) {
      const fileName = path.basename(abiFilePath, '.json')
      execSync(
        `abi-types-generator '${abiFilePath}' --output='${typesDirectory}' --name=${fileName} --provider=ethers_v5`,
      )
    }

    // Remove generated directory from examples
    const generatedPaths = glob.sync('*/src/generated', {
      cwd: `${baseDir}/examples`,
      absolute: true,
    })
    for (const generatedPath of generatedPaths) {
      await fs.remove(generatedPath)
    }

    // Copy generated code to examples
    const exampleDirectories = glob.sync('./examples/!(abis|generated)/src', {
      cwd: baseDir,
      absolute: true,
    })
    for (const exampleDirectory of exampleDirectories) {
      const generatedOutput = `${exampleDirectory}/generated`

      await fs.mkdirp(generatedOutput)
      await fs.copy(abiDirectory, `${generatedOutput}/contracts`)
      await fs.copy(typesDirectory, `${generatedOutput}/contracts`)
    }

    await fs.remove(typesDirectory)

    console.log('Done.')
  } catch (err) {
    console.log('Exited.')
  }
})()

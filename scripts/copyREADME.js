const fs = require('fs-extra')
const glob = require('glob')

const path = require('path')

;(async () => {
  const packages = glob.sync('packages/*', {
    onlyDirectories: true,
    absolute: true,
    ignore: ['packages/private'],
  })

  for (const packageDir of packages) {
    await fs.copyFile(
      path.join(__dirname, '../README.md'),
      path.join(packageDir, 'README.md'),
    )
  }
})()

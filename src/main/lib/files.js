// 文件操作相关

const fs = require('fs-extra')
// const path = require('path')
const { promisify } = require('util')

const readdirPromise = promisify(fs.readdir)

module.exports = {

  readFileFolderPath (event, args) {

    const { dirPath, on } = args

    readdirPromise(dirPath, { withFileTypes: true }).then(files => {

      const result = files.map(v => {
        const { name } = v
        return {
          label: name,
          isDirectory: v.isDirectory(),
          isFile: v.isFile(),
          isLeaf: v.isDirectory(),
          path: `${dirPath}\\${name}`,
          children: []
        }
      })

      event.sender.send(on, result)

    }).catch(err => {

      console.log(err)

      event.sender.send(on, [])

    })

  }

}

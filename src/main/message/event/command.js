// 子进程
const { exec, spawn } = require('child_process')
const { promisify } = require('util')
// 编码转换
const iconv = require('iconv-lite')
// promise化
const promisifyExec = promisify(exec)

// https://blog.csdn.net/liuyaqi1993/article/details/78723797
// https://www.jianshu.com/p/e69a6af02f57

function decodeConsoleText (data, encoding) {

  return encoding === 'utf8' ? data.toString() : iconv.decode(data, 'cp936')

}

module.exports = {

  executeCommand (event, args) {

    const { command, options = {}, on } = args

    promisifyExec(command, options).then(stream => {

      const { encoding } = options

      const { stdout, stderr } = stream

      const outPutText = decodeConsoleText(stdout || stderr, encoding)

      this.emit('successHandler', event, on, { data: outPutText })

    }).catch(error => {

      this.emit('errorHandler', event, on, { error })

    })

  },

  spawnCommand (event, params) {

    const { command, args = [], options = {}, on } = params

    console.log('params', params)

    const terminal = spawn(command, args, options)

    console.log('terminal', terminal)

    const { encoding } = options

    terminal.stdout.on('data', (data) => {

      const outPutText = decodeConsoleText(data, encoding)

      this.emit('successHandler', event, on, { data: outPutText })

      event.sender.send(on + 'success', outPutText)

    })

    terminal.stderr.on('data', (data) => {

      const outPutText = decodeConsoleText(data, encoding)

      event.sender.send(on + 'error', outPutText)

    })

    terminal.on('close', (code) => {

      event.sender.send(on + 'close', `code end with ...:${code}`)

    })

  }

}

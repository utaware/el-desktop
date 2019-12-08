// 子进程
const { exec } = require('child_process')
const { promisify } = require('util')
// 编码转换
const iconv = require('iconv-lite')
// promise化
const promisifyExec = promisify(exec)

module.exports = {

  executeCommand (event, args) {

    const { command, options = {}, on } = args

    promisifyExec(command, options).then(stream => {

      const { stdout, stderr } = stream

      // https://blog.csdn.net/liuyaqi1993/article/details/78723797
      // https://www.jianshu.com/p/e69a6af02f57

      const outPutText = iconv.decode(stdout || stderr, 'cp936').toString()

      event.sender.send(on, outPutText)

      this.emit('successHandler', event, on, { data: outPutText })

    }).catch(error => {

      this.emit('errorHandler', event, on, { error })

    })

  }

}

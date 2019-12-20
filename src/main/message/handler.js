// 消息传递处理
const successCode = 1

const errorCode = 0

function eventEmit (event, on, result, params) {

  const code = result ? successCode : errorCode

  const { data = null, message = '' } = params

  const res = { code, data, message }

  event.sender.send(on, res)

}

module.exports = {

  successHandler (event, on, params) {

    eventEmit(event, on, true, params)

  },

  errorHandler (event, on, params) {

    const { error = null } = params

    if (error) {
      // 向外输出日志
      console.log(on, error)

    }

    eventEmit(event, on, false, params)

  }

}

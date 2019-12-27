const shelljs = require('shelljs')

shelljs.config.execPath = process.env.NODE_PATH

module.exports = shelljs

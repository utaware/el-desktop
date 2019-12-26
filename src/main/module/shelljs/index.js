const shelljs = require('shelljs')

shelljs.config.execPath = process.env.ComSpec

module.exports = shelljs

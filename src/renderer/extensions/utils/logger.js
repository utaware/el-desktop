const chalk = require('chalk')

class Logger {
  constructor (options) {
    this.options = Object.assign({ logLevel: 4 }, options)
  }

  setOptions (options) {
    Object.assign(this.options, options)
  }

  // level: 1
  error (...args) {
    if (this.options.logLevel < 1) {
      return
    }
    process.exitCode = process.exitCode || 1
    console.error(chalk.red('error'), ...args)
  }

  // level: 2
  warn (...args) {
    if (this.options.logLevel < 2) {
      return
    }
    console.warn(chalk.yellow('warning'), ...args)
  }

  // level: 3
  success (...args) {
    if (this.options.logLevel < 3) {
      return
    }
    this.status('green', 'success', ...args)
  }

  // level: 3
  tip (...args) {
    if (this.options.logLevel < 3) {
      return
    }
    this.status('blue', 'tip', ...args)
  }

  // level: 3
  info (...args) {
    if (this.options.logLevel < 3) {
      return
    }
    this.status('cyan', 'info', ...args)
  }

  // level: 4
  debug (...args) {
    if (this.options.logLevel < 4) {
      return
    }

    this.status('magenta', 'debug', ...args)
  }

  wait (...args) {
    if (this.options.logLevel < 3) {
      return
    }
    this.status('cyan', 'wait', ...args)
  }

  // level: 3
  status (color, label, ...args) {
    if (this.options.logLevel < 3) {
      return
    }
    // @ts-ignore
    console.log(chalk[color](label), ...args)
  }

  developer (...args) {
    this.status('cyan', 'developer', ...args)
  }
}

module.exports = new Logger()

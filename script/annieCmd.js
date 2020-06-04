
const { exec } = require('child_process')

// const shelljs = require('shelljs')

exec('test.bat', {
  windowsHide: false
}, (err, data) => {
  if (err) {
    return console.log(err)
  }
  console.log(data)
})
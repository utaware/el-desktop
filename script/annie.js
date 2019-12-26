
const { exec } = require('child_process')

// const shelljs = require('shelljs')

exec('./console.bat', (err, stdout, stderr) => {

  if (err) {
    return console.log(err)
  }
  console.log(stdout.toString())
})

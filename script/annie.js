
const { exec } = require('child_process')

console.log(process.env.ComSpec)

exec('annie av79103230', {
  detached: true
}, (err, stdout, stderr) => {
  if (err) {
    return console.log(err)
  }
  console.log(stdout.toString())
})


const { spawn } = require('child_process')

// const shelljs = require('shelljs')

const ls = spawn('annie', ['av80383952'], {

  windowsHide: false,
  maxBuffer: 1024 ** 3

})

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});
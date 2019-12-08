const fs = require('fs-extra')

const md = require('markdown-it')()

function getLine (path) {
  
  console.time('time')

  const content = fs.readFileSync(path).toString()

  // console.log('lines:', content.split('\n').length)

  // console.log('lines:', content.match(/\n/g).length + 1)

  // console.log('total', content.length)

  // console.log('words', content.replace(/\s/g, '').length)

  // console.log('space', content.match(/\s/g).length)

  const tokens = md.parse(content, {})

  const titleTag = 'heading_open'

  const titleList = tokens.filter(v => v.type === titleTag)

  console.log(titleList)

  console.timeEnd('time')

}

getLine('D:/project/el-desktop/src/renderer/docs/Markdown-it/Public/MarkdownIt.md')

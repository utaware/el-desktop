// node
const path = require('path')
// markdown-it 加载配置后的实例
const markdownIt = require('../../markdown')
// fs
const { readFileContent } = require('../fs')

module.exports = {

  // 解析md文件
  markdownRenderWithMd (event, args) {

    const { filePath, on } = args

    readFileContent(filePath).then(buffer => {

      const mdContent = buffer.toString()

      const htmlContent = markdownIt.render(mdContent, { filePath })

      this.emit('successHandler', event, on, { data: htmlContent })

    }).catch(error => {

      this.emit('errorHandler', event, on, error)

    })

  },
  // 解析代码
  markdownRenderWithCode (event, args) {

    const { currentFilePath, codeRelativePath, params, on } = args

    const [ language = 'js' ] = params

    const { sep } = path

    const folderPath = currentFilePath.split(sep)

    const dirPath = folderPath.slice(0, -1).join(sep)

    const filePath = path.resolve(dirPath, codeRelativePath).trim()

    readFileContent(filePath).then(buffer => {

      const fileContent = buffer.toString()

      const markup = '```'

      const mdContent = `${markup} ${language} ${params}\n${fileContent}\n${markup}`

      const htmlContent = markdownIt.render(mdContent, { filePath })

      this.emit('successHandler', event, on, {
        data: {
          text: fileContent,
          html: htmlContent
        }
      })

    }).catch(error => {

      this.emit('errorHandler', event, on, { error })

    })

  },
  // 解析标题
  markdownParseWithTile (event, args) {

    const { content, on, include = [] } = args

    const titleTag = 'heading_open'

    const tokens = markdownIt.parse(content, {})

    const titleList = tokens.filter(v => v.type === titleTag && include.includes(v.tag)).map((v, i) => {
      
      const { attrs, tag } = v
      
      return {
        id: attrs.find(([name]) => name === 'id')[1],
        level: Number(tag.slice(1)),
        index: i,
        children: [],
        tag
      }

    }).reduce((total, current) => {

      const level = current.level - 1

      total[level] = total[level] || []

      total[level].push(current)

      return total

    }, []).filter(v => v)

    titleList.forEach((current, order, arr) => {

      const nextGourp = arr[order + 1]

      if (!nextGourp) {
        return false
      }

      current.forEach((v, i, a) => {

        const { index } = v

        const nextItem = a[i + 1]

        const list = nextGourp.filter(m => {

          const pre = m.index > index
          
          const next = !nextItem || nextItem.index > m.index

          return pre && next
        
        })

        v.children.push(...list)
        
      })

    })

    const [ parentNodes = [] ] = titleList

    this.emit('successHandler', event, on, { data: parentNodes })

  }

}

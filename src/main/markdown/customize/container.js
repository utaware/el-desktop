// Process block-level custom containers
//
module.exports = function containerPlugin (md, options = {}) {

  const {
    minMarkers = 3,
    markerStr = ':',
    name,
    componentsName = 'MarkdownComponents',
    staticRender = false,
    validate = validateDefault,
    render = renderDefault
  } = options
  
  let markerChar = markerStr.charCodeAt(0)
  let markerLen = markerStr.length

  function validateDefault (params) {
    const nameReg = new RegExp(name, 'i')
    return params.match(nameReg)
  }

  function renderDefault (tokens, idx, _options, env, slf) {
    // 默认渲染函数
    const nesting = tokens[idx].nesting
    // add a class to the opening tag
    switch (nesting) {
      case 1:
        const { content } = staticRender ? tokens[idx + 1] : ''
        const params = tokens[idx].info
        return `<${componentsName} content="${content}" params="${params}">`
      case -1:
        return `</${componentsName}>`
      default:
        return ''
    }
  }

  function container (state, startLine, endLine, silent) {
    let pos
    let nextLine
    let markerCount
    let markup
    let params
    let token
    let oldParent
    let oldLineMax
    let autoClosed = false
    let start = state.bMarks[startLine] + state.tShift[startLine]
    let max = state.eMarks[startLine]

    // Check out the first character quickly,
    // this should filter out most of non-containers
    //
    if (markerChar !== state.src.charCodeAt(start)) { return false }

    // Check out the rest of the marker string
    //
    for (pos = start + 1; pos <= max; pos++) {
      if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
        break
      }
    }

    markerCount = Math.floor((pos - start) / markerLen)
    if (markerCount < minMarkers) { return false }
    pos -= (pos - start) % markerLen

    markup = state.src.slice(start, pos)
    params = state.src.slice(pos, max).trim()
    if (!validate(params)) { return false }

    // Since start is found, we can report success here in validation mode
    //
    if (silent) { return true }

    // Search for the end of the block
    //
    nextLine = startLine

    for (;;) {
      nextLine++
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break
      }

      start = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break
      }

      if (markerChar !== state.src.charCodeAt(start)) { continue }

      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue
      }

      for (pos = start + 1; pos <= max; pos++) {
        if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
          break
        }
      }

      // closing code fence must be at least as long as the opening one
      if (Math.floor((pos - start) / markerLen) < markerCount) { continue }

      // make sure tail has spaces only
      pos -= (pos - start) % markerLen
      pos = state.skipSpaces(pos)

      if (pos < max) { continue }

      // found!
      autoClosed = true
      break
    }

    oldParent = state.parentType
    oldLineMax = state.lineMax
    state.parentType = 'container'

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine

    token = state.push('container_' + name + '_open', 'div', 1)
    token.markup = markup
    token.block = true
    token.info = params
    token.map = [ startLine, startLine + 1 ]

    if (staticRender) {
      token = state.push('container_' + name + '_inline', '', 0)
      token.markup = markup
      token.content = state.getLines(startLine + 1, nextLine, 0, true)
      token.map = [ startLine + 1, nextLine ]
    } else {
      state.md.block.tokenize(state, startLine + 1, nextLine)
    }

    token = state.push('container_' + name + '_close', 'div', -1)
    token.markup = state.src.slice(start, pos)
    token.block = true
    token.map = [ nextLine, nextLine + 1 ]

    state.parentType = oldParent
    state.lineMax = oldLineMax
    state.line = nextLine + (autoClosed ? 1 : 0)

    return true
  }

  md.block.ruler.before('fence', 'container_' + name, container, {
    alt: [ 'paragraph', 'reference', 'blockquote', 'list' ]
  })
  md.renderer.rules['container_' + name + '_open'] = render
  md.renderer.rules['container_' + name + '_close'] = render
  if (staticRender) {
    md.renderer.rules['container_' + name + '_inline'] = render
  }
}

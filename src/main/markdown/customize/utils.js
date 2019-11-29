// 工具函数
exports.lineStartMatch = function (src, start, sign, count, strict = true) {

  const markup = sign.repeat(count)

  const len = markup.length

  const pos = start + len

  const next = pos + 1

  const content = src.slice(start, next)

  const last = content[content.length - 1]

  if (!content.startsWith(markup)) { return false }

  if (strict && last === sign) { return false }

  return true

}

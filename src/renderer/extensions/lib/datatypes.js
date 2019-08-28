const chalk = require('chalk')

exports.isObject = (obj) => obj !== null && typeof obj === 'object'

/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString

const getObjectType = (x) => _toString.call(x).slice(8, -1)
const isOfType = (type) => (x) => typeof x === type // eslint-disable-line valid-typeof
const isObjectOfType = (type) => (x) => getObjectType(x) === type

exports.isFunction = isOfType('function')
exports.isString = isOfType('string')
exports.isBoolean = isOfType('boolean')
exports.isPlainObject = isObjectOfType('Object')
exports.isUndefined = isOfType('undefined')
exports.isNull = (x) => x === null
exports.isNullOrUndefined = (x) => isUndefined(x) || isNull(x)

const toRawType = (value) => _toString.call(value).slice(8, -1)
const getType = function (fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

exports.toRawType = toRawType
exports.getType = getType

/**
 * Transform multi-types to natural language. e.g.
 *   ['Function']                     => 'Function'
 *   ['Function', 'Object']           => 'Function or Object'
 *   ['Function', 'Object', 'Number'] => 'Function, Object or Number'
 */

function toNaturalMultiTypesLanguage (types) {
  const len = types.length
  if (len === 1) {
    return types.join('')
  }
  const rest = types.slice(0, len - 1)
  const last = types[len - 1]
  return rest.join(', ') + ' or ' + last
}

exports.assertTypes = function (value, types) {
  let valid
  let warnMsg
  let actualType = toRawType(value)
  const expectedTypes = []
  if (actualType === 'AsyncFunction') {
    actualType = 'Function'
  }

  for (const type of types) {
    const expectedType = getType(type)
    expectedTypes.push(expectedType)
    valid = actualType === expectedType
    if (valid) break
  }

  if (!valid) {
    warnMsg =
      `expected a ${chalk.green(toNaturalMultiTypesLanguage(expectedTypes))} ` +
      `but got ${chalk.yellow(actualType)}.`
  }

  return { valid, warnMsg }
}

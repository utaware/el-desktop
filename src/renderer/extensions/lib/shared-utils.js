const slugify = require('../utils/slugify')
const logger = require('../utils/logger')

const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const globby = require('globby')
const hash = require('hash-sum')
const escapeHtml = require('escape-html')
const semver = require('semver')

const unescapeHtml = require('./unescapeHtml')
const parseFrontmatter = require('./parseFrontmatter')
const inferTitle = require('./inferTitle')
const extractHeaders = require('./extractHeaders')
const moduleResolver = require('./moduleResolver')
const normalizeConfig = require('./normalizeConfig')

module.exports = {
  slugify,
  logger,
  chalk,
  fs,
  path,
  globby,
  hash,
  escapeHtml,
  semver,
  unescapeHtml,
  parseFrontmatter,
  inferTitle,
  extractHeaders,
  moduleResolver,
  normalizeConfig
}
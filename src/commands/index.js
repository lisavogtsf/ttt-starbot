
'use strict'

const _ = require('lodash')
const fs = require('fs')

const commands = _.reduce(fs.readdirSync(__dirname), (accumulator, file) => {
  if (file !== 'index.js') accumulator.push(require(`./${file}`))

  return accumulator
}, [])

module.exports = commands

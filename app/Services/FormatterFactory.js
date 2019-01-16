'use strict'

const Cropper = require('./Cropper')
const Ignorer = require('./Ignorer')
const Assigner = require('./Assigner')

class FormatterFactory {
  static make(action) {
    if (action.action === 'crop') {
      return new Cropper(action)
    }

    if (action.action === 'ignore') {
      return new Ignorer(action)
    }

    if (action.action === 'assign') {
      return new Assigner(action)
    }
  }
}

module.exports = FormatterFactory

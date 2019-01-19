'use strict'

const Action = require('./Action')
const escapeStringRegexp = require('escape-string-regexp')

class Cropper extends Action {
  performAction() {
    if (this.satisfiesMatchCondition()) {
      this._transaction.formatted_title = this._transaction[this._attribute]
        .replace(new RegExp(escapeStringRegexp(this._action.match), 'gi'), '')
        .trim()
    }

    return this._transaction
  }
}

module.exports = Cropper

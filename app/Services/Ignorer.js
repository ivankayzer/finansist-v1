'use strict'

const Action = require('./Action')

class Ignorer extends Action {
  performAction() {
    if (this.satisfiesMatchCondition()) {
      this._transaction.is_ignored = true
    }

    return this._transaction
  }
}

module.exports = Ignorer

'use strict'

const Action = require('./Action')

class Ignorer extends Action {
  performAction(transaction) {
    this._transaction = transaction

    if (this.satisfiesMatchCondition()) {
      this._transaction.is_ignored = true
    }

    return this._transaction
  }
}

module.exports = Ignorer;

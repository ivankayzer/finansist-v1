'use strict'

const Action = require('./Action')

class Cropper extends Action {
  performAction(transaction) {
    this._transaction = transaction

    if (this.satisfiesMatchCondition()) {
      this._transaction.formatted_title = this._transaction.original_title.replace(this._action.match, '')
    }

    return this._transaction
  }
}

module.exports = Cropper;

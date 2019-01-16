'use strict'

const Action = require('./Action')

class Assigner extends Action {
  performAction(transaction) {
    this._transaction = transaction

    if (this.satisfiesMatchCondition()) {
      this._transaction.category_id = this._action.additional_data.category_id
    }

    return this._transaction
  }
}

module.exports = Assigner;

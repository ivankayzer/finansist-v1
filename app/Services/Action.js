'use strict'

class Action {
  constructor(action) {
    this._action = action
  }

  performAction(transaction) {
    this._transaction = transaction

    if (this.satisfiesMatchCondition()) {
      this._transaction.formatted_title = this._transaction.original_title
    }

    return this._transaction
  }

  satisfiesMatchCondition() {
    return this._transaction.original_title.includes(this._action.match)
  }
}

module.exports = Action

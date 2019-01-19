'use strict'

class Action {
  constructor(action) {
    this._action = action
  }

  prepare(transaction) {
    this._transaction = transaction
    this._attribute =
      transaction.formatted_title === null
        ? 'original_title'
        : 'formatted_title'
    return this
  }

  performAction() {
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

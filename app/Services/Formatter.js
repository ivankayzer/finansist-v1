'use strict'

const ActionFactory = require('./ActionFactory')

class Formatter {
  constructor(transaction, actions = []) {
    this._transaction = transaction
    this._actions = actions.map(action => ActionFactory.make(action))
  }

  apply() {
    if (!this.isElegibleForFormat()) {
      return null
    }

    this._actions.forEach(
      action => (this._transaction = action.performAction(this._transaction))
    )

    return this._transaction
  }

  isElegibleForFormat() {
    return (
      !this._transaction.is_ignored &&
      this._transaction.formatted_title === null
    )
  }
}

module.exports = Formatter

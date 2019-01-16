'use strict'

const FormatterFactory = require('./FormatterFactory')

class Formatter {
  constructor(transaction, actions = []) {
    this._transaction = transaction
    this._actions = actions.map(action => FormatterFactory.make(action))
  }

  apply() {
    if (!this.isElegibleForFormat()) {
      return null
    }

    this._actions.forEach(action => this._transaction = action.performAction(this._transaction))

    this._transaction.save()
  }

  isElegibleForFormat() {
    return !this._transaction.is_ignored && this._transaction.formatted_title === null
  }
}

module.exports = Formatter

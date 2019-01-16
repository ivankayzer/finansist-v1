'use strict'

const Cropper = require('./Cropper')
const Ignorer = require('./Ignorer')
const Assigner = require('./Assigner')

class Formatter {
  constructor(transaction) {
    this._transaction = transaction;
    this._actions = [
      new Cropper,
      new Ignorer,
      new Assigner
    ];
  }

  apply() {
    if (!this.isElegibleForFormat()) {
      return null;
    }

    let title = this._transaction.original_title;

    this._actions.forEach(action => title = action.performAction(title))

    this._transaction.formatted_title = title;
    this._transaction.save();
  }

  isElegibleForFormat() {
    return !this._transaction.is_ignored && this._transaction.formatted_title === null;
  }
}

module.exports = Formatter;

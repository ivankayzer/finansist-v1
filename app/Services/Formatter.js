const ActionFactory = require('./ActionFactory');

class Formatter {
  constructor(transaction, actions = []) {
    this._transaction = transaction;
    this._actions = actions.map(action => ActionFactory.make(action));
  }

  apply() {
    if (!this.isElegibleForFormat()) {
      return this._transaction;
    }

    this._actions.forEach(
      action =>
        (this._transaction = action.prepare(this._transaction).performAction())
    );

    return this._transaction;
  }

  isElegibleForFormat() {
    return !this._transaction.is_ignored && !this._transaction.category_id;
  }
}

module.exports = Formatter;

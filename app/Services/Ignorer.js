const Action = require("./Action");

class Ignorer extends Action {
  performAction() {
    if (this.satisfiesMatchCondition()) {
      this._transaction.is_ignored = true;
      this._transaction.keyword = this._action.match;
    }

    return this._transaction;
  }
}

module.exports = Ignorer;

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Decimal = require("decimal.js");

class BudgetLimit extends Model {
  static get table() {
    return "budget_limit";
  }

  setLimit(value) {
    if (value) {
      return Decimal(value.replace(",", "."))
        .mul(100)
        .toNumber();
    }
  }

  getLimit(value) {
    return value / 100;
  }

  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  static get primaryKey() {
    return null;
  }

  static get incrementing() {
    return false;
  }
}

module.exports = BudgetLimit;

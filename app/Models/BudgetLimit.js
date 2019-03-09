/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class BudgetLimit extends Model {
  static get table() {
    return 'budget_limit';
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

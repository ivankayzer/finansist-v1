/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AlterBudgetSchema extends Schema {
  up() {
    this.table('budgets', table => {
      table.dropColumn('category_id');
      table.dropColumn('limit');
    });

    this.create('budget_limit', table => {
      table.integer('budget_id');
      table.integer('category_id');
      table.float('limit');
    });
  }

  down() {
    this.drop('budget_limit');
  }
}

module.exports = AlterBudgetSchema;

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class BudgetSchema extends Schema {
  up() {
    this.create('budgets', table => {
      table.increments();
      table.integer('user_id');
      table.date('start_date');
      table.date('end_date');
      table.integer('category_id');
      table.float('limit');
      table.timestamps();
    });
  }

  down() {
    this.drop('budgets');
  }
}

module.exports = BudgetSchema;

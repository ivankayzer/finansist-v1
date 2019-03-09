/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddNoResetColumnToTransactionsSchema extends Schema {
  up() {
    this.table('transactions', table => {
      table.boolean('immutable').defaultTo(false);
    });
  }

  down() {
    this.table('transactions', table => {
      table.dropColumn('immutable');
    });
  }
}

module.exports = AddNoResetColumnToTransactionsSchema;

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddTransactionUidToTransactionsSchema extends Schema {
  up() {
    this.table('transactions', table => {
      table.string('uid');
    });
  }

  down() {}
}

module.exports = AddTransactionUidToTransactionsSchema;

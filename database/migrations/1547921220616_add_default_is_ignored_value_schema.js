/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddDefaultIsIgnoredValueSchema extends Schema {
  up() {
    this.table('transactions', table => {
      table
        .boolean('is_ignored')
        .defaultTo(0)
        .alter();
    });
  }

  down() {
    this.table('transactions', table => {});
  }
}

module.exports = AddDefaultIsIgnoredValueSchema;

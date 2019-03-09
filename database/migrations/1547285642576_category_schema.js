/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CategorySchema extends Schema {
  up() {
    this.create('categories', table => {
      table.increments();
      table.integer('user_id');
      table.string('name');
      table.timestamps();
    });
  }

  down() {
    this.drop('categories');
  }
}

module.exports = CategorySchema;

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ActionsSchema extends Schema {
  up() {
    this.create('actions', table => {
      table.increments();
      table.integer('user_id');
      table.string('action');
      table.string('match');
      table.json('additional_data');
      table.timestamps();
    });
  }

  down() {
    this.drop('actions');
  }
}

module.exports = ActionsSchema;

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddLangColumnToUsersSchema extends Schema {
  up() {
    this.table("users", table => {
      table.string("language").defaultTo("en");
    });
  }

  down() {
    this.table("users", table => {
      table.dropColumn("language");
    });
  }
}

module.exports = AddLangColumnToUsersSchema

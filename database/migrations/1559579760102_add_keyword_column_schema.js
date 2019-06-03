"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddKeywordColumnSchema extends Schema {
  up() {
    this.table("transactions", table => {
      table.string("keyword");
    });
  }

  down() {
    this.table("transactions", table => {
      table.dropColumn("keyword");
    });
  }
}

module.exports = AddKeywordColumnSchema;

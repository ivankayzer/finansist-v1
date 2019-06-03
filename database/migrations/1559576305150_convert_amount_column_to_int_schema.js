"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ConvertAmountColumnToIntSchema extends Schema {
  up() {
    this.table("transactions", table => {
      table.dropColumn("amount");
    });

    this.table("transactions", table => {
      table.integer("amount");
    });
  }

  down() {
    this.table("transactions", table => {
      table.dropColumn("amount");
    });

    this.table("transactions", table => {
      table.float("amount");
    });
  }
}

module.exports = ConvertAmountColumnToIntSchema;

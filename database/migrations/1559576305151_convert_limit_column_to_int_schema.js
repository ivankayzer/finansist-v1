"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ConvertAmountColumnToIntSchema extends Schema {
  up() {
    this.table("budget_limit", table => {
      table.dropColumn("limit");
    });

    this.table("budget_limit", table => {
      table.integer("limit");
    });
  }

  down() {
    this.table("budget_limit", table => {
      table.dropColumn("limit");
    });

    this.table("budget_limit", table => {
      table.float("limit");
    });
  }
}

module.exports = ConvertAmountColumnToIntSchema;
